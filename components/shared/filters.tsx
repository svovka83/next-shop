"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { CheckboxFiltersGroup, RangeSlider, Title } from ".";
import { useFilters, useQueryFilters, useIngredients } from "@/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
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

      {/* checkbox filters group - Cocktail strength */}
      <CheckboxFiltersGroup
        title="Cocktail strength"
        name="strength"
        className="mb-5"
        onClickCheckbox={filters.setStrengths}
        selected={filters.strengths}
        items={[
          { text: "light", value: "1" },
          { text: "medium", value: "2" },
          { text: "strong", value: "3" },
        ]}
      />

      {/* checkbox filters group - Cocktail size */}
      <CheckboxFiltersGroup
        title="Cocktail size"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "small", value: "1" },
          { text: "medium", value: "2" },
          { text: "big", value: "3" },
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
        limit={4}
        defaultItems={items.slice(0, 4)}
        items={items.map((item) => ({
          text: item.text,
          value: String(item.value),
        }))}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients} // функція для додавання елемента до множини selectedIngredients
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
