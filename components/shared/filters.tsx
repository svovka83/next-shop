"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Input } from "../ui";

import { CheckboxFiltersGroup, FilterCheckbox, RangeSlider, Title } from ".";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients(); // хук для фільтрування інгредієнтів
  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 100,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...price, [name]: value });
  };

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={cn("pl-4", className)}>
      <Title text="Filtration" size="sm" className="mb-5 font-bold" />

      {/* checkbox filters group - Cocktail strength */}
      <div className="flex flex-col gap-4">
        <Title text="Cocktail strength" size="sm" className="mt-5 font-bold" />
        <FilterCheckbox text="light" value="1" name="cocktail strength" />
        <FilterCheckbox text="medium" value="2" name="cocktail strength" />
        <FilterCheckbox text="strong" value="3" name="cocktail strength" />
      </div>

      {/* checkbox filters group - Cocktail size */}
      <div className="flex flex-col gap-4">
        <Title text="Cocktail size" size="sm" className="mt-5 font-bold" />
        <FilterCheckbox text="small" value="1" name="Cocktail size" />
        <FilterCheckbox text="medium" value="2" name="Cocktail size" />
        <FilterCheckbox text="big" value="3" name="Cocktail size" />
      </div>

      {/* filter price */}
      <div className="mt-5 border-y border-y-neutral-100 py-5 pb-7">
        <p className="mb-3 font-bold">Price from to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            value={String(price.priceFrom)}
            onChange={(event) =>
              updatePrice("priceFrom", Number(event.target.value))
            }
          />
          <Input
            type="number"
            placeholder="100"
            min={10}
            max={100}
            value={String(price.priceTo)}
            onChange={(event) =>
              updatePrice("priceTo", Number(event.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={[price.priceFrom, price.priceTo]}
          onValueChange={([from, to]) =>
            setPrice({ priceFrom: from, priceTo: to })
          }
        />
      </div>

      {/* filter characteristic */}
      <CheckboxFiltersGroup
        title="Ingedients"
        name="ingredients"
        className="mt-5"
        limit={4}
        defaultItems={items.slice(0, 4)}
        items={items.map((item) => ({
          text: item.text,
          value: String(item.value),
        }))}
        loading={loading}
        onClickCheckbox={onAddId} // функція для додавання елемента до множини
        selectedIds={selectedIds}
      />
    </div>
  );
};
