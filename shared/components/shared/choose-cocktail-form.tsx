import React from "react";
import { useSet } from "react-use";
import { cn } from "@/shared/lib/utils";
import { GroupVariants, CocktailImage, Title, IngredientItem } from ".";
import { Button } from "../ui";
import {
  CocktailSizes,
  CocktailStrengths,
  cocktailSizes,
  cocktailStrengths,
} from "@/shared/constants/cocktail";
import { Ingredient, ProductItem } from "@prisma/client";

interface Props {
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: () => VoidFunction;
  className?: string;
}

export const ChooseCocktailForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
  className,
}) => {
  const [size, setSize] = React.useState<CocktailSizes>(25);
  const [strength, setStrength] = React.useState<CocktailStrengths>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const textDetails = "something more information about product";
  const totalPrice = "100$";

  console.log(items);

  return (
    <div className={cn("flex flex-1", className)}>
      <CocktailImage
        className={cn("relative w-[450px] h-[450px] m-auto", className)}
        imageUrl={imageUrl}
        size={size}
      />

      <div className="bg-[#F5F5F5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="my-4">
          <Title
            text="Choose size and strength"
            size="xs"
            className="font-bold"
          />
          <GroupVariants
            items={cocktailSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as CocktailSizes)}
          />

          <GroupVariants
            items={cocktailStrengths}
            selectedValue={String(strength)}
            onClick={(value) => setStrength(Number(value) as CocktailStrengths)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[250px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
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

        <Button className="h-[55px] px-10 mt-8 text-base rounded-[18px] w-full">
          Add to basket for {totalPrice}
        </Button>
      </div>
    </div>
  );
};
