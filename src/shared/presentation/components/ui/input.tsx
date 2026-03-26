import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@//shared/utils/classnames";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-500 text-black, ",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
