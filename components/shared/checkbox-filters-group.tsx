import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  items: Items[];
  defaultItems?: Items[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({ className }) => {
  return <div className={cn("", className)}></div>;
};
