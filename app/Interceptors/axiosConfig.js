import axios from 'axios';
import environment from '../environments/environments.prod';

const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const getTokenExpirationDate = (token) => {
  const payloadBase64 = token.split('.')[1];
  const decodedJson = atob(payloadBase64);
  const decoded = JSON.parse(decodedJson);
  return decoded.exp ? new Date(decoded.exp * 1000) : null;
};

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

api.interceptors.request.use(
  async (config) => {
    if (config.url === '/Security/Autenticar') {
      console.log("Request to login endpoint, skipping token check.");
      return config;
    }

    const jwt = getCookie('jwt');
    console.log("JWT found in cookies:", jwt);

    if (jwt) {
      config.headers['Authorization'] = `Bearer ${jwt}`;
      console.log("JWT added to request headers.");

      const tokenExpDate = getTokenExpirationDate(jwt);
      const now = new Date();
      console.log("Token expiration date:", tokenExpDate);
      console.log("Current date:", now);

      if (tokenExpDate && tokenExpDate - now < 1000) { 
        console.log("Token is about to expire.");

        if (!isRefreshing) {
          isRefreshing = true;

          const refreshToken = getCookie('refreshToken');
          console.log("Refresh token found in cookies:", refreshToken);

          if (refreshToken) {
            try {
              const response = await axios.post(`${environment.apiBaseUrl}/Security/ObtenerRefreshToken`, {
                tokenExpirado: jwt,
                refreshToken: refreshToken,
              });
              console.log("Refresh token response:", response);

              if (response.status === 200) {
                const { token: newToken, refreshToken: newRefreshToken } = response.data;
                setCookie('jwt', newToken, 1);
                setCookie('refreshToken', newRefreshToken, 7);
                console.log("New JWT set in cookies:", newToken);
                config.headers['Authorization'] = `Bearer ${newToken}`;
                processQueue(null, newToken);
              } else if (response.status === 400 && response.data.msg === "Token no ha expirado" && response.data.resultado === false) {
                console.log('Token is still valid, continuing with original request.');
                processQueue(null, jwt);
              } else {
                console.error('Failed to refresh token:', response.statusText);
                processQueue(new Error('Failed to refresh token'));
              }
            } catch (error) {
              console.error('Error refreshing token:', error);
              processQueue(error, null);
            } finally {
              isRefreshing = false;
            }
          }
        }

        const retryOriginalRequest = new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        return retryOriginalRequest.then(token => {
          config.headers['Authorization'] = `Bearer ${token}`;
          return config;
        }).catch(err => {
          return Promise.reject(err);
        });
      }
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log("Response received:", response);
    return response;
  },
  async (error) => {
    console.error("Response error:", error);
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie('refreshToken');
      console.log("Refresh token found in cookies for response error handling:", refreshToken);

      if (refreshToken && !isRefreshing) {
        isRefreshing = true;

        try {
          const jwt = getCookie('jwt');
          console.log("JWT found in cookies for response error handling:", jwt);

          const response = await axios.post(`${environment.apiBaseUrl}/Security/ObtenerRefreshToken`, {
            tokenExpirado: jwt,
            refreshToken: refreshToken,
          });
          console.log("Refresh token response for response error handling:", response);

          if (response.status === 200) {
            const { token: newToken, refreshToken: newRefreshToken } = response.data;
            setCookie('jwt', newToken, 1);
            setCookie('refreshToken', newRefreshToken, 7); // Asumiendo 7 días de validez para el refresh token
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return api(originalRequest);
          } else if (response.status === 400 && response.data.msg === "Token no ha expirado" && response.data.resultado === false) {
            console.log('Token is still valid, continuing with original request.');
            processQueue(null, jwt);
            return api(originalRequest);
          } else {
            console.error('Failed to refresh token:', response.statusText);
            processQueue(new Error('Failed to refresh token'));
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          processQueue(error, null);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Handle scenario where refreshToken is not available or has expired
      }
    }

    return Promise.reject(error);
  }
);

export default api;
