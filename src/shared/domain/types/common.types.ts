export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export type AsyncOrSync<T> = Promise<T> | T;
