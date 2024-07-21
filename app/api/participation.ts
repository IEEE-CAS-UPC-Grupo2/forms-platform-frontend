import axios from "axios";
import { Participation } from "../models/participation";
import { Attendance } from "../models/attendance";
import environment from "../environments/environments.prod";

const BASE_URL = environment.apiBaseUrl + "/Participation";

interface Response<T> {
  status: boolean;
  value: T;
  msg?: string;
}

export const saveParticipation = async (
  participation: Participation,
): Promise<Participation> => {
  try {
    const response = await axios.post<Response<Participation>>(
      `${BASE_URL}/Save`,
      participation,
    );
    if (response.data.status) {
      return response.data.value;
    } else {
      throw new Error(response.data.msg || "Failed to create participation");
    }
  } catch (error) {
    console.error("Error creating participation:", error);
    throw error;
  }
};

export const updateAttendance = async (
  attendance: Attendance,
): Promise<boolean> => {
  try {
    const response = await axios.patch<Response<boolean>>(
      `${BASE_URL}/Attendance`,
      attendance,
    );
    if (response.data.status) {
      return response.data.value;
    } else {
      throw new Error(response.data.msg || "Failed to update attendance");
    }
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error;
  }
};
