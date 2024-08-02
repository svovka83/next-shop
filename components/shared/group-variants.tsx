import React from "react";
import { cn } from "@/lib/utils";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  defaultValue?: string;
  onClick?: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#F3F3F7&] rounded-3xl select-none",
        className
      )}
    >
      123
    </div>
  );
};
