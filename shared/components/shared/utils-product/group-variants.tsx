"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";

export type Variant = {
  value: string; // значення варіанту
  name: string; // назва варіанту
  disabled?: boolean; // відключення варіанту
};

interface Props {
  itemVariants: readonly Variant[]; // readonly означає, що цей масив не можна змінювати
  onClick?: (value: Variant["value"]) => void; // функція, яка буде вибирати варіант по його значенню
  selectedValue?: Variant["value"]; // вибраний варіант
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({
  itemVariants,
  onClick,
  selectedValue,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between my-2 bg-[#e0e0ff] rounded-3xl select-none",
        className
      )}
    >
      {itemVariants.map((variant) => (
        <button
          key={variant.value}
          onClick={() => onClick?.(variant.value)}
          className={cn(
            "flex flex-1 items-center justify-center h-[30px] px-5 rounded-3xl transition-all duration-500 text-sm",
            {
              "bg-white shadow": selectedValue === variant.value,
              "text-gray-500 opacity-50 pointer-events-none": variant.disabled,
              "bg-black/0": Boolean(selectedValue) === variant.disabled,
            }
          )}
        >
          {variant.name}
        </button>
      ))}
    </div>
  );
};
