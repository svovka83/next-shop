import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Props {
  clearInput: VoidFunction;
  className?: string;
}

export const ClearButton: React.FC<Props> = ({ clearInput, className }) => {
  return (
    <button
      onClick={clearInput}
      className={cn(
        "absolute right-4 -translate-y-1/2 opacity-30 hover:opacity-100",
        className
      )}
    >
      <X className="w-4 h-4" />
    </button>
  );
};
