import React from "react";
import { X } from "lucide-react";

interface Props {
  clearInput?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ clearInput }) => {
  return (
    <button
      onClick={clearInput}
      className="absolute top-1/2 right-4 -translate-y-1/2 opacity-30 hover:opacity-100"
    >
      <X className="w-4 h-4" />
    </button>
  );
};
