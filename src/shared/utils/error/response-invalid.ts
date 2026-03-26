import { ErrorObject } from "ajv";

class InvalidResponseException extends Error {
  public code: string;
  public detail: string;

  constructor(error: ErrorObject) {
    super();
    this.code = "invalid-response";
    this.message = error.message ?? "";
    this.detail = JSON.stringify(error);
  }
}

export default InvalidResponseException;
