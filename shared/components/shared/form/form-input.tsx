"use client";

import React from "react";
import { ClearButton, ErrorText, RequiredSymbol } from "..";
import { Input } from "../../ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // наслідуємо властивості HTMLInputElement - базовий інтерфейс HTML інпута
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name); // слідкуємо за змінами властивості name
  const errorText = errors[name]?.message as string; // перевіряємо чи є помилка властивості name

  const onClickClear = () => setValue(name, "", { shouldValidate: true }); // shouldValidate: true - при очистці поля виклиє валідацію

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />
        {value && <ClearButton clearInput={onClickClear} className="top-1/2" />}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
