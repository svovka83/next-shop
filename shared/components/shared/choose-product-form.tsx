import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from ".";
import { Button } from "../ui";

interface Props {
  name: string;
  imageUrl: string;
  onClickAdd?: () => VoidFunction;
  className?: string;
}

const textDetails = "something more information about product";

const totalPrice = "100$";

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <div className={cn("relative w-[450px] h-[450px] m-auto", className)}>
        <img
          src={imageUrl}
          alt="Product image"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -transition-all duration-300 z-10 w-[300px] h-[300px]"
        />
      </div>

      <div className="w-[450px] bg-[#F5F5F5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">{textDetails}</p>

        <Button className="h-[55px] px-10 mt-8 text-base rounded-[18px] w-full">
          Add to basket for {totalPrice}
        </Button>
      </div>
    </div>
  );
};
