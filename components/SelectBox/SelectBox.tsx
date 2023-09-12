import React from "react";

interface SelectBoxProps {
  defaultValue: string;
  placeholder: string;
  options: string[];
  handleChangeOptions: (event: React.ChangeEvent) => void;
}

export default function SelectBox({
  defaultValue,
  placeholder,
  options = [],
  handleChangeOptions,
}: SelectBoxProps) {
  return <select defaultValue={defaultValue ? defaultValue : 'placeholder'} onChange={handleChangeOptions}>
    {!defaultValue && <option value='placeholder' key={'placeholder'} disabled hidden>{placeholder}</option>}
    {options.map(option => <option key={option} value={option}>{option}</option>)}
  </select>
}
