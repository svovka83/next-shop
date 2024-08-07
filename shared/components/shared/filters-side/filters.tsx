"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Input } from "../../ui";
import { CheckboxFiltersGroup, RangeSlider, Title } from "..";
import {
  useFilters,
  useQueryFilters,
  useFilterIngredients,
} from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useFilterIngredients();
  const filters = useFilters();

  useQueryFilters(filters); // для отримання рядкової строки зі значеннями фільтрів

  const ingredientItems = ingredients.map((item) => ({
    // перетворюємо список інгредіїнтів в формат {value, text} замість отриманих з сервера {id, name, ...other}
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={cn("pl-4", className)}>
      <Title text="Filtration" size="sm" className="mb-5 font-bold" />

      {/* checkbox filters group - Cocktail size */}
      <CheckboxFiltersGroup
        title="Pizza size"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "small", value: "10" },
          { text: "medium", value: "20" },
          { text: "big", value: "30" },
          { text: "extra big", value: "40" },
        ]}
      />

      {/* checkbox filters group - Cocktail strength */}
      <CheckboxFiltersGroup
        title="Pizza type"
        name="types"
        className="mb-5"
        onClickCheckbox={filters.setTypes}
        selected={filters.types}
        items={[
          { text: "thin", value: "1" },
          { text: "normal", value: "2" },
          { text: "massive", value: "3" },
        ]}
      />

      {/* filter price */}
      <div className="mt-5 border-y border-y-neutral-100 py-5 pb-7">
        <p className="mb-3 font-bold">Price from to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            value={String(filters.prices.priceFrom)}
            onChange={(event) =>
              filters.setPrices("priceFrom", Number(event.target.value))
            }
          />
          <Input
            type="number"
            placeholder="100"
            min={10}
            max={100}
            value={String(filters.prices.priceTo)}
            onChange={(event) =>
              filters.setPrices("priceTo", Number(event.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100]}
          onValueChange={updatePrices}
        />
      </div>

      {/* filter ingredients */}
      <CheckboxFiltersGroup
        title="Ingedients"
        name="ingredients"
        className="mt-5"
        defaultItems={ingredientItems.slice(0, 5)}
        items={ingredientItems.map((item) => ({
          value: String(item.value),
          text: item.text,
        }))}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients} // функція для додавання елемента до множини selectedIngredients
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
