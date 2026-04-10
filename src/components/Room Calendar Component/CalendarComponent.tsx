import { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addMonths } from "date-fns";
import "./calendar.css";

const today = new Date();
const twoMonthsLater = addMonths(today, 2);

interface BookingRange {
  check_in_date: string;
  check_out_date: string;
}

interface Props {
  bookings: BookingRange[];
  onRangeSelect?: (range: BookingRange) => void;
  onSelectionError?: (message: string) => void;
}

function CalendarComponent({ bookings, onRangeSelect, onSelectionError }: Props) {
  const [range, setRange] = useState<DateRange | undefined>();

  const disabledRanges = bookings.map((booking) => ({
    from: new Date(booking.check_in_date),
    to: new Date(booking.check_out_date),
  }));

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);

    if (!selectedRange?.from || !selectedRange?.to) {
      onRangeSelect?.({ check_in_date: "", check_out_date: "" });
      return;
    }

    const selectedFrom = selectedRange.from;
    const selectedTo = selectedRange.to;

    const overlaps = bookings.some(
      (booking) =>
        new Date(booking.check_in_date) < selectedTo &&
        new Date(booking.check_out_date) > selectedFrom,
    );

    if (overlaps) {
      setRange(undefined);
      onRangeSelect?.({ check_in_date: "", check_out_date: "" });
      onSelectionError?.("This date range overlaps with an existing reservation.");
      return;
    }

    onSelectionError?.("");
    onRangeSelect?.({
      check_in_date: formatLocalDate(selectedFrom),
      check_out_date: formatLocalDate(selectedTo),
    });
  };

  return (
    <div className="booking-calendar">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        disabled={[...disabledRanges, { before: today }, { after: twoMonthsLater }]}
        fromMonth={today}
        toMonth={twoMonthsLater}
        numberOfMonths={1}
        pagedNavigation
      />
    </div>
  );
}

export default CalendarComponent;
