"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChangeValue?: (value?: string) => void;
}
// "b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
export const AddressInput: React.FC<Props> = ({ onChangeValue }) => {
  return (
    <AddressSuggestions
      token=""
      onChange={(data) => onChangeValue?.(data?.value)}
    />
  );
};
