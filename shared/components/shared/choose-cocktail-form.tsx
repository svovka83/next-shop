import React from "react";
import { cn } from "@/shared/lib/utils";
import { GroupVariants, ProductImage, Title } from ".";
import { Button } from "../ui";
import { cocktailSizes } from "@/shared/constants/cocktail";

interface Props {
  name: string;
  imageUrl: string;
  ingredients: any[];
  items: any[];
  onClickAdd?: () => VoidFunction;
  className?: string;
}

const textDetails = "something more information about product";

const totalPrice = "100$";

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <ProductImage
        className={cn("relative w-[450px] h-[450px] m-auto", className)}
        imageUrl={imageUrl}
        size={30}
      />

      <div className="w-[450px] bg-[#F5F5F5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants items={cocktailSizes} />

        <Button className="h-[55px] px-10 mt-8 text-base rounded-[18px] w-full">
          Add to basket for {totalPrice}
        </Button>
      </div>
    </div>
  );
};
