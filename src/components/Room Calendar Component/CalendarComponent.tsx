  import { useState } from "react";
  import { DayPicker } from "react-day-picker";
  import type { DateRange } from "react-day-picker";
  import "react-day-picker/dist/style.css";
  import { addMonths } from "date-fns";
  import './calendar.css'

  const today = new Date();
  const twoMonthsLater = addMonths(today, 2);

  interface BookingRange {
    check_in_date: string;
    check_out_date: string;
  }

  interface Props {
    bookings: BookingRange[];
    onRangeSelect?: (range: BookingRange) => void;
  }

 function CalendarComponent({ bookings, onRangeSelect }: Props) {
    const [range, setRange] = useState<DateRange | undefined>();


    
    // Hotel logic: checkout date should be selectable
    const disabledRanges = bookings.map(b => ({
      from: new Date(b.check_in_date),
      to: new Date(new Date(b.check_out_date).setDate(
        new Date(b.check_out_date).getDate()
      )),
    }));

    const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

    const handleSelect = (selectedRange: DateRange | undefined) => {
      if (!selectedRange?.from || !selectedRange?.to) {
        setRange(selectedRange);
        return;
      }

      // Prevent crossing multiple bookings
      const overlaps = bookings.some(b =>
        new Date(b.check_in_date) < selectedRange.to! &&
        new Date(b.check_out_date) > selectedRange.from!
      );

      if (overlaps) {
        alert("Selected range overlaps with an existing booking");
        return;
      }

      setRange(selectedRange);

      if (onRangeSelect) {
        onRangeSelect({
          check_in_date: formatLocalDate(selectedRange.from),
          check_out_date: formatLocalDate(selectedRange.to),
        });
      }
    };

    return (
        <div className="calendar-section">
          <DayPicker
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={[
              ...disabledRanges,       // keep your custom disabled ranges
              { before: today },
              { after: twoMonthsLater }
          ]}
          fromMonth={today}           // locks scroll start
          toMonth={twoMonthsLater}    // locks scroll end
          numberOfMonths={1}          // optional: show 2 months at a time
          pagedNavigation             // prevents navigation past fromMonth/toMonth
          />

        
        </div>

    );
  }


  export default CalendarComponent;