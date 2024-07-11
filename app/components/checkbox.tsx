import React from "react";
import { Option } from "./dropdown";

interface CheckboxProps {
  options: Option[];
  selectedValues: string[];
  onSelectOption: (selected: string[]) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  options,
  selectedValues,
  onSelectOption,
}) => {
  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onSelectOption(newSelectedValues);
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
