import React from "react";
import { cn } from "@/lib/utils";
import { GroupVariants, PizzaImage, Title, Ingredients } from "..";
import { Button } from "../../ui";
import {
  PizzaSizes,
  PizzaTypes,
  pizzaTypes,
} from "@/shared/constants/pizzaTypes";
import { Ingredient, ProductItem } from "@prisma/client";
import { getPizzaDetails } from "../../../functions";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  variants: ProductItem[];
  ingredients: Ingredient[];
  onSubmit: (variantId: number, ingredients: number[]) => void;
  loading?: boolean;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  variants,
  ingredients,
  onSubmit,
  loading,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    currentVariantId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(variants);

  const { totalPrice, textDetails } = getPizzaDetails(
    size,
    type,
    variants,
    ingredients,
    selectedIngredients
  );

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage
        className={cn("relative w-[450px] h-[450px] m-auto", className)}
        imageUrl={imageUrl}
        size={size}
      />

      <div className="bg-[#F5F5F5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="my-4">
          <Title
            text="Choose size and type of pizza"
            size="xs"
            className="font-bold"
          />
          <GroupVariants
            variants={availablePizzaSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSizes)}
          />

          <GroupVariants
            variants={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaTypes)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[250px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <Ingredients
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClickIngredient={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={() => {
            if (currentVariantId) {
              onSubmit(currentVariantId, Array.from(selectedIngredients));
            }
          }}
          className="h-[55px] px-10 mt-8 text-base rounded-[18px] w-full"
        >
          Add to basket for {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
