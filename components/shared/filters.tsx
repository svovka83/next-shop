import React from "react";
import { cn } from "@/lib/utils";

import { FilterCheckbox, RangeSlider, Title } from ".";

import { Input } from "../ui";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("pl-4", className)}>
      <Title text="Filtration" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="new" value="1" />
        <FilterCheckbox text="old" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-5 pb-7">
        <p className="mb-3 font-bold">Price from to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input type="number" placeholder="100" min={10} max={100} />
        </div>

        <RangeSlider min={0} max={200} step={5} value={[0, 100]} />
      </div>
    </div>
  );
};
