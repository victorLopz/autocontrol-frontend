import { errorSlice } from "@//store/slices/errors";
import { useRouter } from "next/navigation";
import { errorHandler } from "@//utils/error/error-handler";
import { AlertType } from "@//types/alert";
import { FormActionValueType, LoginType } from "@//types/form-action";

const useFormActions = () => {
  const submitStartedData = useSubmitStartedData();
  const router = useRouter();

  const execute = async <T>({
    action,
    values,
    onAlert,
    onGetErrorCode,
    onSuccess
  }: {
    action: keyof typeof onboarding_form_actions;
    values?: FormActionValueType;
    onAlert?: (alert: AlertType) => void;
    onGetErrorCode?: (errorCode: string, errorData?: any) => void;
    onSuccess?: () => void;
  }) => {
    try {
      switch (action) {
        case "LOGIN":
          await submitStartedData.execute(values as LoginType);
          break;
        default:
          throw new Error(`Unhandled action type: ${action}`);
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      await handleExecutionError(
        {
          errorData: error,
          action: action
        },
        onAlert,
        onGetErrorCode
      );
    }
  };

  const handleExecutionError = async (
    error: any,
    onAlert?: (alert: AlertType) => void,
    onGetErrorCode?: (errorCode: string, errorData?: any) => void
  ) => {
    let { errorData = {}, action } = error ?? {};
    if (Object.keys(errorData).length) {
      const alertError = errorHandler.getAlertError(errorData);
      const errorCode = errorHandler.getErrorCode(errorData);

      if (alertError && onAlert) {
        onAlert(alertError);
        return;
      }

      if (errorCode && onGetErrorCode) {
        onGetErrorCode(errorCode, errorData.extraData);
        return;
      }

      if (process.env.NEXT_PUBLIC_USE_ERROR_PAGE === "true") {
        // If error is unknown, save error and redirect to error page
        dispatch(
          errorSlice.actions.save({
            message: errorData.message,
            code: errorData.code ?? errorData.name,
            detail: errorData.detail ?? errorData.stack
          })
        );
        router.push("error-page");
      } else {
        if (errorData instanceof Error) {
          errorData = {
            message: error.error.message
          };
        }
      }
    }
  };

  return { execute };
};

export default useFormActions;
