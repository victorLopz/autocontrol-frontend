import { HTMLAttributes } from "react";
import { cn } from "@//shared/utils/classnames";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
