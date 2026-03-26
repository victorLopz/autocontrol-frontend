import { useRouter } from 'next/navigation';
import { ROUTES } from '@//shared/constants/routes.constants';
import { statusErrorHandled } from '@//shared/constants/status-error';
import { useAppDispatch } from '@//store/hooks';
import { sendLogin } from '@//store/actions/send-login';
import type { AlertType } from '@//types/alert';
import type { FormActionValueType, LoginType } from '@//types/form-action';
import type { ApiResponseErrorType } from '@//shared/utils/error/api-response-errors';

export const FORM_ACTIONS = {
  LOGIN: 'LOGIN',
} as const;

type FormActionType = keyof typeof FORM_ACTIONS;

type ExecuteParams = {
  action: FormActionType;
  values?: FormActionValueType;
  onAlert?: (alert: AlertType) => void;
  onGetErrorCode?: (errorCode: string, errorData?: ApiResponseErrorType) => void;
  onSuccess?: () => void;
};

function getErrorCode(error: ApiResponseErrorType) {
  if (error.status === 401) {
    return statusErrorHandled.LoginInvalidCredentials;
  }

  return undefined;
}

const useFormActions = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleExecutionError = (
    error: ApiResponseErrorType,
    onAlert?: (alert: AlertType) => void,
    onGetErrorCode?: (errorCode: string, errorData?: ApiResponseErrorType) => void,
  ) => {
    const errorCode = getErrorCode(error);

    if (errorCode && onGetErrorCode) {
      onGetErrorCode(errorCode, error);
      return;
    }

    if (onAlert) {
      onAlert({
        title: 'No fue posible continuar',
        description: error.message,
        buttonText: 'Entendido',
        className: 'bg-red-600 text-white',
        isInput: false,
      });
    }
  };

  const execute = async ({ action, values, onAlert, onGetErrorCode, onSuccess }: ExecuteParams) => {
    try {
      switch (action) {
        case FORM_ACTIONS.LOGIN:
          await dispatch(sendLogin(values as LoginType)).unwrap();
          router.push(ROUTES.DASHBOARD);
          break;
        default:
          throw new Error(`Unhandled action type: ${action}`);
      }

      onSuccess?.();
    } catch (error) {
      handleExecutionError(
        (error as ApiResponseErrorType) ?? {
          message: 'Unexpected form action error',
        },
        onAlert,
        onGetErrorCode,
      );
    }
  };

  return { execute };
};

export default useFormActions;
