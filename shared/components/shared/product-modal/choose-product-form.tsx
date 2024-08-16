import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "..";
import { Button } from "../../ui";
import { ProductItem } from "@prisma/client";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onSubmit: VoidFunction;
  loading?: boolean;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  onSubmit,
  loading,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <div className={cn("relative w-[450px] h-[450px] m-auto", className)}>
        <img
          src={imageUrl}
          alt={name}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -transition-all duration-300 z-10 w-[300px] h-[300px]"
        />
      </div>

      <div className="w-[450px] bg-[#F5F5F5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <Button
          loading={loading}
          onClick={onSubmit}
          className="h-[55px] px-10 mt-8 text-base rounded-[18px] w-full"
        >
          Add to basket for {price} ₴
        </Button>
      </div>
    </div>
  );
};
