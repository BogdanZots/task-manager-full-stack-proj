import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function CustomDatePicker({ setDueDate }) {
  const [initDate, setDate] = useState(new Date());
  const currentDate = new Date();
  useEffect(() => {
    setDueDate(currentDate);
  }, []);
  return (
    <>
      <div class='col-12 ml-2 d-flex flex-column justify-content-start align-items-start'>
        <h3>Выберите дату</h3>
        <DatePicker
          selected={initDate}
          onChange={(date) => {
            if (date.getDay() < currentDate.getDay()) {
              return;
            }
            setDueDate(date);
            setDate(date);
          }}
        />
      </div>
    </>
  );
}

export default CustomDatePicker;
