import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../../ui";

interface Props {
  titleInfo: React.ReactNode;
  price: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutLineInfo: React.FC<Props> = ({
  titleInfo,
  price,
  loading,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      <div className="flex my-4">
        <span className="flex flex-1 text-xl text-neutral-500">
          {titleInfo}
          <div className="flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2" />
        </span>
        {loading ? (
          <Skeleton className="w-[75px] h-[28px]" />
        ) : (
          <span className="text-lg font-bold">{price} $</span>
        )}
      </div>
    </div>
  );
};
