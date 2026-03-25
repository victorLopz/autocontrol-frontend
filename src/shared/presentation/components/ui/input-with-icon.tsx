import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/shared/utils/classnames";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon ? (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        ) : null}

        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-500",
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            className
          )}
          {...props}
        />

        {rightIcon ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        ) : null}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
