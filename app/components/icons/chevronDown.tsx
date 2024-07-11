import React from "react";

const CURRENT_COLOR = "currentColor";

interface IconProps {
  className?: string;
  stroke?: string;
}

const ChevronDown = ({
  className,
  stroke = CURRENT_COLOR,
}: IconProps): JSX.Element => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 6L8 11L3 6"
      stroke={stroke}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ChevronDown;
