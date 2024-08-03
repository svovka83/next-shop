import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  imageUrl: string;
  size: number;
  className?: string;
}

export const CocktailImage: React.FC<Props> = ({
  imageUrl,
  size,
  className,
}) => {
  return (
    <div className={cn("relative w-[450px] h-[450px] m-auto", className)}>
      <img
        src={imageUrl}
        alt="Product image"
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -transition-all duration-300 z-10",
          {
            "w-[150px] h-[150px]": size === 25,
            "w-[250px] h-[250px]": size === 50,
            "w-[350px] h-[350px]": size === 75,
            "w-[450px] h-[450px]": size === 100,
          }
        )}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[440px] h-[440px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[340px] h-[340px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[240px] h-[240px]" />
    </div>
  );
};
