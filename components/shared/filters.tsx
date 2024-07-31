"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSet } from "react-use";
import qs from "qs";

import { Input } from "../ui";

import { CheckboxFiltersGroup, RangeSlider, Title } from ".";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const { ingredients, loading, onAddId, selectedIngredients } =
    useFilterIngredients(); // хук для фільтрування інгредієнтів

  const [strengths, { toggle: toggleStrength }] = useSet(new Set<string>([]));
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));

  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 100,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...price, [name]: value });
  };

  React.useEffect(() => {
    const filters = {
      ...price,
      strengths: Array.from(strengths),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = qs.stringify(filters, { // формуємо query params для url-адреси
      arrayFormat: "comma",
    });
  }, [price, strengths, sizes, selectedIngredients]);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={cn("pl-4", className)}>
      <Title text="Filtration" size="sm" className="mb-5 font-bold" />

      {/* checkbox filters group - Cocktail strength */}
      <CheckboxFiltersGroup
        title="Cocktail strength"
        name="strength"
        className="mb-5"
        onClickCheckbox={toggleStrength}
        selected={strengths}
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
        onClickCheckbox={toggleSizes}
        selected={sizes}
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
        onClickCheckbox={onAddId} // функція для додавання елемента до множини selectedIngredients
        selected={selectedIngredients}
      />
    </div>
  );
};
