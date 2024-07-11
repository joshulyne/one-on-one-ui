import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  selected: Date | null;
  onChange: (
    date: Date | null,
    event?: React.SyntheticEvent<any, Event>
  ) => void;
  onCalendarClose?: () => void;
  autoComplete?: string;
  subtext?: JSX.Element;
  maxDate?: Date;
  minDate?: Date;
  showTimeSelect?: boolean;
  customInput?: JSX.Element;
}

export const DateTimeInput = ({
  selected,
  onChange,
  onCalendarClose,
  autoComplete = "off",
  maxDate,
  minDate,
  subtext = <></>,
  showTimeSelect = true,
  customInput,
}: DateTimePickerProps): JSX.Element => {
  const ref = React.useRef<DatePicker>(null);

  const handleCustomInputCloseOnClick = () => {
    // When using a custom input, we need to manually close React Datepicker
    if (!customInput) return;

    if (ref.current && ref.current.isCalendarOpen()) {
      ref.current.setOpen(false);
    }
  };

  return (
    <div className="flex flex-col text-black">
      <DatePicker
        ref={ref}
        autoComplete={autoComplete}
        selected={selected}
        maxDate={maxDate}
        minDate={minDate}
        onChange={onChange}
        onCalendarClose={onCalendarClose}
        customInput={customInput}
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MM/dd/yyyy"
        onInputClick={handleCustomInputCloseOnClick}
      />
      {subtext}
    </div>
  );
};

export default DateTimeInput;
