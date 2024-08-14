import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-between mb-2", className)}>
      <div className="flex items-center gap-6">
        <div className="w-[60px] h-[60px] bg-gray-200 rounded-full animate-pulse" />
        <h2 className="w-[348px] h-10 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-5 w-10 bg-gray-200 rounded animate-pulse" />
      <div className="h-8 w-[133px] bg-gray-200 rounded animate-pulse" />
    </div>
  );
};
