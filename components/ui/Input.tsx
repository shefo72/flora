import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | { message?: string };
  containerClassName?: string;
  labelClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className, containerClassName, labelClassName, ...props },
    ref,
  ) => {
    return (
      <div className={containerClassName}>
        <label
          className={`mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#4A4A4A] lg:mb-2 lg:text-xs ${
            labelClassName || ""
          }`}
          htmlFor={props.id}
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`w-full border-b border-[#D4D4D4] bg-transparent pb-2 text-sm text-[#2D2D2D] placeholder-[#A0A0A0] outline-none transition-colors focus:border-[#4A5D4A] ${
              error ? "border-red-400 focus:border-red-500" : ""
            } ${className || ""}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-0.5 text-[10px] text-red-500/90 lg:text-xs">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
