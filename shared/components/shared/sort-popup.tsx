import React from "react";
import { cn } from "@/shared/lib/utils";

import { ArrowDownUp } from "lucide-react";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 px-5 h-10 rounded-2xl cursor-pointer",
        className
      )}
    >
      <ArrowDownUp size={16} />
      <b>Sorting:</b>
      <b className="text-primary">popularity</b>
    </div>
  );
};
