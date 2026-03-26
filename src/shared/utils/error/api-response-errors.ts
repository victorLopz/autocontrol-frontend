export type ApiResponseErrorType = {
  message: string;
  detail?: string;
  errors?: string;
  status?: number | string;
  extraData?: object;
};

class ApiResponseError extends Error {
  public detail: string | undefined;
  public errors: string | undefined;
  public status: number | string | undefined;
  public extraData: object | undefined;

  constructor(error: ApiResponseErrorType) {
    super();
    this.detail = error.detail;
    this.errors = error.errors;
    this.status = error.status;
    this.message = error.message;
    this.extraData = error.extraData;
  }
}

export default ApiResponseError;
