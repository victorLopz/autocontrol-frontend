import { statusErrorHandled } from "@//shared/constants/status-error";

export const errorHandler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getErrorCode: (error: any) => {
    const statusKey = Object.keys(statusErrorHandled).find(
      (key) =>
        statusErrorHandled[key as keyof typeof statusErrorHandled] ===
        error?.status
    ) as keyof typeof statusErrorHandled;

    return statusKey ? statusErrorHandled[statusKey] : undefined;
  }
};
