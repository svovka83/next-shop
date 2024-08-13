import React from "react";
import { ClearButton, ErrorText, RequiredSymbol } from "..";
import { Input } from "../../ui";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { // наслідуємо властивості HTMLInputElement - базовий інтерфейс HTML інпута 
  name: string;
  label?: string;
  required?: boolean;
  clearInput?: VoidFunction;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  clearInput,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
        <ClearButton clearInput={clearInput} />
      </div>

      <ErrorText text="Error field" className="mt-2" />
    </div>
  );
};
