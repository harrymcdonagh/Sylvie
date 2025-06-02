import { Cat } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  message?: string;
}

export const LoadingSpinner = ({
  size = 40,
  className,
  message = "Loading...",
}: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative">
        <Cat
          size={size}
          className="text-orange-400 animate-bounce"
          strokeWidth={2}
        />
        <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-t-2 border-b-2 border-orange-500 opacity-20"></div>
      </div>
      {message && (
        <p className="mt-4 text-sm font-medium text-muted-foreground">{message}</p>
      )}
    </div>
  );
};
