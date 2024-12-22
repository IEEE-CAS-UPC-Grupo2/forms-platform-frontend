import axios from "axios";
import toast from "react-hot-toast";
import environment from "../environments/environments.prod";

import { getCookieValue } from "../utils/cookies/getCookie";
import { MESSAGES } from "../admin/constants";
import { handleApiError } from "../utils/handleApiError";
import {
  CreateProject,
  Project,
  ProjectPagination,
  UpdateProject,
} from "../models";

const BASE_URL = environment.apiBaseUrlWebsite + "/projects";
const jwtCookie = getCookieValue("jwt");

interface Response<T> {
  status: boolean;
  data: T;
  message?: string;
}

export const getProjects = async (
  page: number,
  limit: number
): Promise<ProjectPagination> => {
  try {
    const response = await axios.get<Response<ProjectPagination>>(
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
      throw new Error(response.data.message || "Failed to fetch projects");
    }
  } catch (error) {
    console.error("Error fetching project", error);
    throw error;
  }
};

export const toggleFeatured = async (id: string): Promise<Project> => {
  try {
    const { data: responseData } = await axios.put<Response<Project>>(
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
        responseData.message || MESSAGES.ERROR.PROJECT_TOGGLE_FEATURED_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.TOGGLE_FEATURED_UPDATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.PROJECT_TOGGLE_FEATURED_FAILED);
    throw error;
  }
};

export const createProject = async (data: CreateProject): Promise<Project> => {
  try {
    const { data: responseData } = await axios.post<Response<Project>>(
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
        responseData.message || MESSAGES.ERROR.PROJECT_CREATE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.PROJECT_CREATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.PROJECT_CREATE_FAILED);
    throw error;
  }
};

export const updateProject = async (
  id: string,
  data: UpdateProject
): Promise<Project> => {
  try {
    const { data: responseData } = await axios.patch<Response<Project>>(
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
        responseData.message || MESSAGES.ERROR.PROJECT_UPDATE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.PROJECT_UPDATED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.PROJECT_UPDATE_FAILED);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<Project> => {
  try {
    const { data: responseData } = await axios.delete<Response<Project>>(
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
        responseData.message || MESSAGES.ERROR.PROJECT_DELETE_FAILED
      );
    }

    toast.success(MESSAGES.SUCCESS.PROJECT_DELETED);
    return responseData.data;
  } catch (error) {
    handleApiError(error, MESSAGES.ERROR.PROJECT_DELETE_FAILED);
    throw error;
  }
};
