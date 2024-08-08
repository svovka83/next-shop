import React from "react";
import { cn } from "@/lib/utils";
import { CountIconButton } from "..";

export interface CountButtonProps {
  quantity?: number;
  size?: "sm" | "lg";
  onClick?: (operator: "plus" | "minus") => void;
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
  quantity = 1,
  size = "sm",
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      <CountIconButton
        onClick={() => onClick?.("minus")}
        disabled={quantity === 1}
        size={size}
        operator="minus"
      />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{quantity}</b>

      <CountIconButton
        onClick={() => onClick?.("plus")}
        size={size}
        operator="plus"
      />
    </div>
  );
};
