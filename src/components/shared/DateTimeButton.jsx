import React, { useState } from "react";
import Calendar from "react-calendar";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarReservas/calendarReservas.css";
import "../../styles/search/search.css";

const DateTimeButton = ({ dateRange, setDateRange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (value) => {
    setDateRange(value);
    setShowCalendar(false);
  };

  // Función para formatear fecha en YYYY-MM-DD
  const formatDate = (date) => {
    return date ? date.toISOString().split("T")[0] : "No seleccionada";
  };

  return (
    <div className="calendar-wrapper">
      <button className="calendar-button" onClick={handleCalendarClick}>
        {!dateRange || !dateRange[0] ? (
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

