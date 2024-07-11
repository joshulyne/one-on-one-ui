import React from "react";
import ChevronDown from "./icons/chevronDown";

export interface Option {
  value: string;
  label: string;
}
interface DropdownProps {
  options: Option[];
  selectedOptionValue: string;
  onSelectOption: (optionValue: string | null) => void;
  selectNoneLabel?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  paddingOverride?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Dropdown = ({
  options,
  selectedOptionValue,
  onSelectOption,
  selectNoneLabel,
  fullWidth = false,
  fullHeight = false,
  paddingOverride,
  disabled = false,
  onClick,
}: DropdownProps): JSX.Element => {
  return (
    <div
      className={`relative rounded-lg border border-gray-400 bg-white text-gray-700 shadow-sm ${
        fullHeight ? "h-full" : ""
      }`}
    >
      <select
        className={`${
          paddingOverride ?? "py-2 pl-4 pr-12"
        } h5 relative z-10 cursor-pointer appearance-none bg-transparent ${
          fullWidth ? "w-full" : ""
        } ${fullHeight ? "h-full" : ""}`}
        value={selectedOptionValue}
        onChange={(ev) => {
          const { value } = ev.target;
          if (value === "") onSelectOption(null);
          onSelectOption(value);
        }}
        disabled={disabled}
        onClick={onClick}
      >
        {selectNoneLabel && options.length > 1 && (
          <option value="">{selectNoneLabel}</option>
        )}
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-0 bottom-0 flex items-center">
        <ChevronDown className="text-gray-700" />
      </div>
    </div>
  );
};

export default Dropdown;
