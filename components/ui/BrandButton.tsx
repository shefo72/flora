import React, { forwardRef } from "react";
import { Button } from "./button";

interface BrandButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ children, isLoading, className, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading || disabled}
        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-[#4A5D4A] hover:bg-[#5A7A5A] py-3 text-sm font-medium text-white transition-colors duration-200 lg:py-3.5 h-auto ${
          isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""
        } ${className || ""}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        {children}
      </Button>
    );
  },
);

BrandButton.displayName = "BrandButton";
