import React from "react";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active: boolean;
  onClickIngredient: () => void;
  className?: string;
}

export const Ingredients: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  active,
  onClickIngredient,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white",
        active && "border border-primary",
        className
      )}
      onClick={onClickIngredient}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img width={100} height={100} src={imageUrl} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} $</span>
    </div>
  );
};
