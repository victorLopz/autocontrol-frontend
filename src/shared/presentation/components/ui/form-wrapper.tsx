"use client";

import { cn } from "@//shared/utils/classnames";

type FormWrapperType = {
  children: React.ReactNode;
  className?: string;
};

const FormWrapper = ({ children, className }: FormWrapperType) => {
  return (
    <div className={cn(" w-full items-center sm:px-4 md:px-2", className)}>
      {children}
    </div>
  );
};

export default FormWrapper;
