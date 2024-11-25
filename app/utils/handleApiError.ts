import { toast } from "react-hot-toast";

export const handleApiError = (error: unknown, customMessage: string): void => {
  const message = error instanceof Error ? error.message : customMessage;
  toast.error(message);
};
