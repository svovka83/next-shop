import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return (
    <div className={cn("text-red-500 text-sm mt-2", className)}>{text}</div>
  );
};
