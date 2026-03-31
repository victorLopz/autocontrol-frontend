import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '@//shared/application/interfaces/api-response.interface';
import { ACCESS_TOKEN_KEY, AUTH_SESSION_KEY } from '@//shared/constants/auth.constants';
import { httpClient } from '@//shared/infrastructure/http/http-client';
import { serializeAuthSession } from '@//shared/infrastructure/lib/auth-session';
import { cookie } from '@//shared/infrastructure/lib/cookie';
import { normalizeNavigationModules } from '@//shared/utils/navigation';
import ApiResponseError, { type ApiResponseErrorType } from '@//shared/utils/error/api-response-errors';
import { authSlice } from '@//store/slices/auth';
import type { AuthUser } from '@//types/auth-session';
import type { LoginType } from '@//types/form-action';

type LoginResponseData = {
  user: AuthUser & {
    modules?: unknown;
    menu?: unknown;
  };
  token: string;
  modules?: unknown;
  menu?: unknown;
};

function formatLoginError(error: unknown): ApiResponseErrorType {
  if (error instanceof ApiResponseError) {
    return {
      message: error.message,
      detail: error.detail,
      errors: error.errors,
      status: error.status,
      extraData: error.extraData,
    };
  }

  if (error instanceof Error) {
    try {
      const parsedError = JSON.parse(error.message) as {
        status?: number;
        body?: {
          message?: string;
          status?: string;
        };
      };

      return {
        message: parsedError.body?.message ?? error.message,
        status: parsedError.status,
        detail: parsedError.body?.status,
      };
    } catch {
      return {
        message: error.message,
      };
    }
  }

  return {
    message: 'Unexpected login error',
  };
}

function normalizeLoginResponse(response: ApiResponse<LoginResponseData> | LoginResponseData) {
  const payload = 'data' in response ? response.data : response;

  if (!payload?.user || !payload?.token) {
    throw new ApiResponseError({
      message: 'Invalid login response',
    });
  }

  const modules = normalizeNavigationModules(payload.modules ?? payload.menu ?? payload.user.modules ?? payload.user.menu);

  return {
    user: {
      id: payload.user.id,
      name: payload.user.name,
      email: payload.user.email,
    },
    token: payload.token,
    modules,
  };
}

export const sendLogin = createAsyncThunk<
  ReturnType<typeof normalizeLoginResponse>,
  LoginType,
  { rejectValue: ApiResponseErrorType }
>(
  'auth/send-login',
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(authSlice.actions.isLoading(true));

    try {
      const response = await httpClient.post<ApiResponse<LoginResponseData> | LoginResponseData, LoginType>('/auth/login', params);

      const loginData = normalizeLoginResponse(response);

      cookie.set(ACCESS_TOKEN_KEY, loginData.token);

      dispatch(
        authSlice.actions.loginSuccess({
          user: loginData.user,
          token: loginData.token,
          modules: loginData.modules,
        }),
      );

      cookie.set(AUTH_SESSION_KEY, serializeAuthSession(loginData));

      return loginData;
    } catch (error) {
      const formattedError = formatLoginError(error);

      dispatch(authSlice.actions.loginFailure(formattedError.message));

      return rejectWithValue(formattedError);
    } finally {
      dispatch(authSlice.actions.isLoading(false));
    }
  },
);
