import React, { useState } from "react";
import Calendar from "react-calendar";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarReservas/calendarReservas.css";
import "../../styles/search/search.css";

const DateTimeButton = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (value) => {
    setDateRange(value);
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="calendar-wrapper">
      <button className="calendar-button" onClick={handleCalendarClick}>
        {!dateRange ? (
          <>
            <FaRegCalendarAlt />
            ¿Cuándo quieres agendar?
          </>
        ) : (
          <div className="date-range-container">
            <div className="date-block">
              <div className="date-label">Fecha inicial</div>
              <div className="date-value">{formatDate(dateRange[0])}</div>
            </div>
            <div className="date-block">
              <div className="date-label">Fecha final</div>
              <div className="date-value">{formatDate(dateRange[1])}</div>
            </div>
          </div>
        )}
      </button>

      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={dateRange}
            selectRange={true}
            minDate={new Date()}
            className="custom-calendar"
            locale="es-ES"
          />
        </div>
      )}
    </div>
  );
};

export default DateTimeButton;
