import React from "react";
import { Input, Skeleton } from "../../ui";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";

interface Props {
  title: string; // назва групи чекбоксів
  items: FilterCheckboxProps[]; // типізацію беремо з ./filter-checkbox компонента для чекбоксів
  defaultItems?: FilterCheckboxProps[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = "search...",
  className,
  onClickCheckbox,
  selected,
  defaultValue,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <h3 className="font-bold pt-3 mb-3">{title}</h3>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}
        <Skeleton className="w-24 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold pt-3 mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            value={searchValue}
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-[28vh] pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value} // значення чекбоксу
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)} // чи у множині selected присутнє значення item.value
            onCheckedChange={() => onClickCheckbox?.(item.value)} // функція для додавання елемента до множини selected
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div
          className={
            showAll
              ? "border-t border-t-neutral-100 text-primary cursor-pointer pt-4 mt-2"
              : " text-primary cursor-pointer pt-4"
          }
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {showAll ? "show less" : "show all..."}
        </div>
      )}
    </div>
  );
};
