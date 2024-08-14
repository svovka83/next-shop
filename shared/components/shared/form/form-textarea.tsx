import React from "react";
import { ClearButton, ErrorText, RequiredSymbol } from "..";
import { Textarea } from "../../ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // наслідуємо властивості HTMLTextAreaElement - базовий інтерфейс HTML текстерія
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<Props> = ({
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
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton clearInput={onClickClear} className="top-6" />}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
