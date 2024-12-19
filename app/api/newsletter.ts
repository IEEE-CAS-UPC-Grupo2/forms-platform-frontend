import axios from "axios";
import toast from "react-hot-toast";
import environment from "../environments/environments.prod";

import { getCookieValue } from "../utils/cookies/getCookie";
import { MESSAGES } from "../admin/constants";
import { handleApiError } from "../utils/handleApiError";
import {
  CreateNewsletter,
  Newsletter,
  NewslettersPagination,
  UpdateNewsletter,
} from "../models/newsletter";

const BASE_URL = environment.apiBaseUrlWebsite + "/newsletters";
const jwtCookie = getCookieValue("jwt");

interface Response<T> {
  status: boolean;
  data: T;
  message?: string;
}

export const getNewsletters = async (
  page: number,
  limit: number
): Promise<NewslettersPagination> => {
  try {
    const response = await axios.get<Response<NewslettersPagination>>(
      `${BASE_URL}?page=${page}&limit=${limit}`,
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
      throw new Error(response.data.message || "Failed to fetch newsletters");
    }
  } catch (error) {
    console.error("Error fetching newsletter", error);
    throw error;
  }
};

export const toggleFeatured = async (id: string): Promise<Newsletter> => {
  try {
    const { data: responseData } = await axios.put<Response<Newsletter>>(
      `${BASE_URL}/${id}/toggle-featured`,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwtCookie}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!responseData.status) {
      throw new Error(
        responseData.message || MESSAGES.ERROR.NEWSLETTER_TOGGLE_FEATURED_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.TOGGLE_FEATURED_UPDATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.NEWSLETTER_TOGGLE_FEATURED_FAILED);
    throw error;
  }
};

export const createNewsletter = async (
  data: CreateNewsletter
): Promise<Newsletter> => {
  try {
    const { data: responseData } = await axios.post<Response<Newsletter>>(
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
        responseData.message || MESSAGES.ERROR.NEWSLETTER_CREATE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.NEWSLETTER_CREATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.NEWSLETTER_CREATE_FAILED);
    throw error;
  }
};

export const updateNewsletter = async (
  id: string,
  data: UpdateNewsletter
): Promise<Newsletter> => {
  try {
    const { data: responseData } = await axios.patch<Response<Newsletter>>(
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
        responseData.message || MESSAGES.ERROR.NEWSLETTER_UPDATE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.NEWSLETTER_UPDATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.NEWSLETTER_UPDATE_FAILED);
    throw error;
  }
};

export const deleteNewsletter = async (id: string): Promise<Newsletter> => {
  try {
    const { data: responseData } = await axios.delete<Response<Newsletter>>(
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
        responseData.message || MESSAGES.ERROR.NEWSLETTER_DELETE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.NEWSLETTER_DELETED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.NEWSLETTER_DELETE_FAILED);
    throw error;
  }
};
