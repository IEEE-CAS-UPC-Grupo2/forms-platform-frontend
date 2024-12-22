import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface AxiosErrorData {
  error: string;
  message: string;
  status: number;
}

const extractAxiosErrorMessage = (error: AxiosError): string => {
  const errorData = error.response?.data as AxiosErrorData;
  return errorData.error;
};

export const handleApiError = (error: unknown, customMessage: string): void => {
  const message =
    error instanceof AxiosError
      ? extractAxiosErrorMessage(error)
      : customMessage;
  toast.error(message);
};
