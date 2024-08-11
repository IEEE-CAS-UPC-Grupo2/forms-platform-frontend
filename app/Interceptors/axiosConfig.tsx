import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import environment from "../environments/environments.prod";



interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });

  failedQueue = [];
};

const getTokenExpirationDate = (token: string): Date | null => {
  const payloadBase64 = token.split(".")[1];
  const decodedJson = atob(payloadBase64);
  const decoded = JSON.parse(decodedJson);
  return decoded.exp ? new Date(decoded.exp * 1000) : null;
};

const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${
    encodeURIComponent(value) || ""
  }${expires}; path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    if (config.url === "/Security/Autenticar") {
      return config;
    }

    const jwt = getCookie("jwt");

    if (jwt) {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders; // Asegúrate de inicializar como AxiosHeaders
      }
      (config.headers as AxiosHeaders)["Authorization"] = `Bearer ${jwt}`;

      const tokenExpDate = getTokenExpirationDate(jwt);
      const now = new Date();

      if (tokenExpDate && tokenExpDate.getTime() - now.getTime() < 1000) {
        if (!isRefreshing) {
          isRefreshing = true;

          const refreshToken = getCookie("refreshToken");

          if (refreshToken) {
           

            try {
              const response = await axios.post(
                `${environment.apiBaseUrl}/Security/ObtainRefreshToken`,
                {
                  expiredToken: jwt,
                  refreshToken: refreshToken,
                },
              );

              if (response.status === 200) {
                const { token: newToken, refreshToken: newRefreshToken } =
                  response.data;
                setCookie("jwt", newToken, 1);
                setCookie("refreshToken", newRefreshToken, 7);
                if (config.headers) {
                  (config.headers as AxiosHeaders)[
                    "Authorization"
                  ] = `Bearer ${newToken}`;
                }
                processQueue(null, newToken);
              } else if (
                response.status === 400 &&
                response.data.msg === "Token no ha expirado" &&
                response.data.resultado === false
              ) {
                processQueue(null, jwt);
              } else {
                processQueue(new Error("Failed to refresh token"));
              }
            } catch (error) {
              console.error("Error refreshing token:", error);
              processQueue(error, null);
            } finally {
              isRefreshing = false;
            }
          }
        }

        const retryOriginalRequest = new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        return retryOriginalRequest
          .then((token) => {
            if (config.headers) {
              (config.headers as AxiosHeaders)[
                "Authorization"
              ] = `Bearer ${token}`;
            }
            return config;
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    console.error("Response error:", error);
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refreshToken");

      if (refreshToken && !isRefreshing) {
        isRefreshing = true;

        try {
          const jwt = getCookie("jwt");

          const response = await axios.post(
            `${environment.apiBaseUrl}/Security/ObtainRefreshToken`,
            {
              expiredToken: jwt,
              refreshToken: refreshToken,
            },
          );

          if (response.status === 200) {
            const { token: newToken, refreshToken: newRefreshToken } =
              response.data;
            setCookie("jwt", newToken, 1);
            setCookie("refreshToken", newRefreshToken, 7); // Asumiendo 7 días de validez para el refresh token
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return api(originalRequest);
          } else if (
            response.status === 400 &&
            response.data.msg === "Token no ha expirado" &&
            response.data.resultado === false
          ) {
            processQueue(null, jwt);
            return api(originalRequest);
          } else {
            console.error("Failed to refresh token:", response.statusText);
            processQueue(new Error("Failed to refresh token"));
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          processQueue(error, null);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Handle scenario where refreshToken is not available or has expired
      }
    }

    return Promise.reject(error);
  },
);


export default api;
