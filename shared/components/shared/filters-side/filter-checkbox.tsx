import React from "react";
import { Checkbox } from "../../ui";

export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange} // функція для зміни стану чекбоксу
        checked={checked} // стан чекбоксу
        value={value} // значення чекбоксу
        className="rounded-[8px] w-6 h-6"
        id={`checkbox-${String(name)}-${String(value)}`} // id чекбоксу
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`} // посилання id на чекбоксу
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
