import React, { forwardRef } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

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
        {isLoading && <Loader2 className="animate-spin h-4 w-4 text-white" />}
        {children}
      </Button>
    );
  },
);

BrandButton.displayName = "BrandButton";
