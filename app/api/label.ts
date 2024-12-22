import axios from "axios";
import toast from "react-hot-toast";
import environment from "../environments/environments.prod";

import { getCookieValue } from "../utils/cookies/getCookie";
import { MESSAGES } from "../admin/constants";
import { handleApiError } from "../utils/handleApiError";
import { CreateLabel, Label } from "../models";

const BASE_URL = environment.apiBaseUrlWebsite + "/labels";
const jwtCookie = getCookieValue("jwt");

interface Response<T> {
  status: boolean;
  data: T;
  message?: string;
}

export const getLabels = async (): Promise<Label[]> => {
  try {
    const response = await axios.get<Response<Label[]>>(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${jwtCookie}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch labels");
    }
  } catch (error) {
    console.error("Error fetching label", error);
    throw error;
  }
};

export const createLabel = async (data: CreateLabel): Promise<Label> => {
  try {
    const { data: responseData } = await axios.post<Response<Label>>(
      `${BASE_URL}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!responseData.status) {
      throw new Error(
        responseData.message || MESSAGES.ERROR.LABEL_CREATE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.LABEL_CREATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.LABEL_CREATE_FAILED);
    throw error;
  }
};

export const deleteLabel = async (id: string): Promise<Label> => {
  try {
    const { data: responseData } = await axios.delete<Response<Label>>(
      `${BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!responseData.status) {
      throw new Error(
        responseData.message || MESSAGES.ERROR.LABEL_DELETE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.LABEL_DELETED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.LABEL_DELETE_FAILED);
    throw error;
  }
};
