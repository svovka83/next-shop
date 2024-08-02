"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[]; // readonly означає, що цей масив не можна змінювати
  onClick?: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({
  items,
  onClick,
  selectedValue,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-around bg-[#e0e0ff] mt-4 rounded-3xl select-none",
        className
      )}
    >
      {items.map((item) => (
        <button 
        key={item.value} 
        onClick={() => onClick?.(item.value)}
        className={cn(
          "flex items-center justify-center h-[30px] px-5 rounded-3xl transition-all duration-500 text-sm",
          {
            "bg-white shadow": selectedValue === item.value,
            "text-gray-500 opacity-50 pointer-events-none": item.disabled,
          }
        )
        }>
          {item.name}
        </button>
      ))}
    </div>
  );
};
