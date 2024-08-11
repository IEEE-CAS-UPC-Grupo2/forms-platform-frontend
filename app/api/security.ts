import axios from "axios";
import environment from "../environments/environments.prod";

const BASE_URL = environment.apiBaseUrl + "/Security";

interface Response<T> {
  result: boolean;
  idAdministrator: number;
  refreshToken: string;
  token: string;
  msg?: string;
}

interface AuthorizationRequest {
  email: string;
  password: string;
}

interface RefreshTokenRequest {
  expiredToken: string;
  refreshToken: string;
}

interface AuthorizationResponse {
  idAdministrator: number;
  token: string;
  refreshToken: string;
  result: boolean;
  msg?: string;
}

export const authenticate = async (
  authorizationRequest: AuthorizationRequest,
): Promise<AuthorizationResponse> => {
  try {
    const response = await axios.post<Response<AuthorizationResponse>>(
      `${BASE_URL}/Authenticate`,
      authorizationRequest,
    );

    if (response.data.msg) {
      return response.data;
    } else {
      throw new Error(response.data.msg || "Failed to authenticate");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

export const obtainRefreshToken = async (
  refreshTokenRequest: RefreshTokenRequest,
): Promise<AuthorizationResponse> => {
  try {
    const response = await axios.post<Response<AuthorizationResponse>>(
      `${BASE_URL}/ObtainRefreshToken`,
      refreshTokenRequest,
    );

    if (response.data.result) {
      return response.data;
    } else {
      throw new Error(response.data.msg || "Failed to obtain refresh token");
    }
  } catch (error) {
    console.error("Error obtaining refresh token:", error);
    throw error;
  }
};
