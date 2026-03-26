import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse } from '@//shared/application/interfaces/api-response.interface';
import { httpClient } from '@//shared/infrastructure/http/http-client';
import { cookie } from '@//shared/infrastructure/lib/cookie';
import ApiResponseError, { type ApiResponseErrorType } from '@//shared/utils/error/api-response-errors';
import { authSlice } from '@//store/slices/auth';
import type { LoginType } from '@//types/form-action';

type LoginUser = {
  id: string;
  name: string;
  email: string;
};

type LoginResponseData = {
  user: LoginUser;
  token: string;
};

const ACCESS_TOKEN_KEY = 'access_token';

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

function normalizeLoginResponse(response: ApiResponse<LoginResponseData> | LoginResponseData): LoginResponseData {
  const payload = 'data' in response ? response.data : response;

  if (!payload?.user || !payload?.token) {
    throw new ApiResponseError({
      message: 'Invalid login response',
    });
  }

  return payload;
}

export const sendLogin = createAsyncThunk<LoginResponseData, LoginType, { rejectValue: ApiResponseErrorType }>(
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
        }),
      );

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
