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
  mapCocktailStrength,
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
  const [strength, setStrength] = React.useState<CocktailStrengths>(2);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const textDetails = `size: ${size} ml, strength: ${mapCocktailStrength[strength]} ( ${strength} % )`;

  const cocktailPrice = items.find(
    (item) => item.size === size && item.strength === strength
  )?.price;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = cocktailPrice ? cocktailPrice + totalIngredientsPrice : 0; // якщо присутній cocktailPrice, то totalPrice = cocktailPrice + totalIngredientsPrice, інакше totalPrice = 0 !!!

  const handleClickAddCart = () => {
    onClickAddCart?.();
  };

  const availableCocktailsBySize = items.filter((item) => item.size === size); // отримуємо доступні коктеєли за наявним розміром
  const availableCocktailStrength = cocktailStrengths.map((item) => ({
    // створюємо новий масив з доступними варіантами strength
    value: item.value,
    name: item.name,
    disabled: !availableCocktailsBySize.some(
      // перевіряємо, чи є доступний варіант strength у доступних коктеєлях за наявним розміром
      (cocktail) => Number(cocktail.strength) === Number(item.value)
    ),
  }));

  React.useEffect(() => {
    const isAvailableStrength = availableCocktailStrength?.find(
      (item) => Number(item.value) === strength && !item.disabled
    ); // шукаємо current strength іперевіряємо, чи він незадізейблений
    const firstAvailableStrength = availableCocktailStrength?.find(
      (item) => !item.disabled
    ); // шукаємо перший незадізейблений strength

    if (!isAvailableStrength && firstAvailableStrength) {
      setStrength(Number(firstAvailableStrength.value) as CocktailStrengths);
    }
  }, [size]);

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
            items={availableCocktailStrength} // доступні варіанти strength
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

        <Button
          onClick={handleClickAddCart}
          className="h-[55px] px-10 mt-8 text-base rounded-[18px] w-full"
        >
          Add to basket for {totalPrice}
        </Button>
      </div>
    </div>
  );
};
