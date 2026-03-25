export class Result<T, E = Error> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: E
  ) {}

  public static ok<T>(value: T): Result<T, never> {
    return new Result<T, never>(true, value);
  }

  public static fail<E>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }

  public getValue(): T {
    if (!this.isSuccess || this.value === undefined) {
      throw new Error("Cannot get the value of a failed result");
    }

    return this.value;
  }

  public getError(): E {
    if (this.isSuccess || this.error === undefined) {
      throw new Error("Cannot get the error of a successful result");
    }

    return this.error;
  }
}
