import axios from "axios";
import toast from "react-hot-toast";
import environment from "../environments/environments.prod";

import { Subsection, UpdateSubsection } from "../models";
import { getCookieValue } from "../utils/cookies/getCookie";
import { MESSAGES } from "../admin/constants";
import { handleApiError } from "../utils/handleApiError";

const BASE_URL = environment.apiBaseUrlWebsite + "/subsections";
const jwtCookie = getCookieValue("jwt");

interface Response<T> {
  status: boolean;
  data: T;
  message?: string;
}

export const getSubsectionById = async (id: string): Promise<Subsection> => {
  try {
    const response = await axios.get<Response<Subsection>>(
      `${BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch subsection");
    }
  } catch (error) {
    console.error("Error fetching subsection", error);
    throw error;
  }
};

export const updateSubsectionById = async (
  id: string,
  data: UpdateSubsection
): Promise<Subsection> => {
  try {
    const { data: responseData } = await axios.patch<Response<Subsection>>(
      `${BASE_URL}/${id}`,
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
        responseData.message || MESSAGES.ERROR.SUBSECTION_UPDATE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.SUBSECTION_UPDATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.SUBSECTION_UPDATE_FAILED);
    throw error;
  }
};
