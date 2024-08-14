import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountButtonProps } from "./count-button";
import { Button } from "../../ui/button";

interface IconButtonProps {
  size?: CountButtonProps["size"];
  operator?: "plus" | "minus";
  disabled?: boolean;
  onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  size = "sm",
  operator,
  disabled,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        size === "sm"
          ? "w-[30px] h-[30px] rounded-[10px]"
          : "w-[38px] h-[38px] rounded-md"
      )}
    >
      {operator === "plus" && (
        <Plus className={size === "sm" ? "h-4" : "h-5"} />
      )}
      {operator === "minus" && (
        <Minus className={size === "sm" ? "h-4" : "h-5"} />
      )}
    </Button>
  );
};
