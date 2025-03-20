import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/calendarReservas/calendarReservas.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CalendarReservasServicio({ reservedDates, setCuidadoInicial, setCuidadoFinal, setRangoFechas }) {
  
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      setCuidadoInicial(date.toISOString().split("T")[0]);
      setCuidadoFinal("");
      setRangoFechas([]);
    } else if (startDate && !endDate) {
      if (date < startDate) {        
        toast.error("La fecha final no puede ser anterior a la fecha inicial.", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setTimeout(() => {
                  toast.error("Por favor selecciona una fecha válida.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });  
                }, 3500);
                setStartDate(null);
                setEndDate(null);
                
        return;
      }

      const datesInRange = getDatesInRange(startDate, date);
      const hasReservedDates = datesInRange.some((selectedDate) =>
        reservedDates.includes(selectedDate.fecha)
      );

      if (hasReservedDates) {
        toast.error("El rango seleccionado contiene fechas ya reservadas.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          toast.error("Por favor elige otras fechas.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });  
        }, 3500);
        setStartDate(null);
        return; 
        
      }

      // Si todo está bien, actualiza los estados
      setEndDate(date);
      setCuidadoFinal(date.toISOString().split("T")[0]);
      setRangoFechas(datesInRange);      
    }
  };

  // Función para calcular todas las fechas entre dos fechas
  const getDatesInRange = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push({fecha: new Date(currentDate).toISOString().split("T")[0]});
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };


   // Función para determinar las clases de las fechas (pintar el rango)
   const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const classes = [];

      // Fechas pasadas
      if (date < today) {
        classes.push('past-date');
      }

      // Día actual
      if (date.toDateString() === today.toDateString()) {
        classes.push('current-date');
      }

      // Fechas reservadas
      if (reservedDates.includes(formattedDate)) {
        classes.push("highlight");
      }

      // Fechas seleccionadas
      if (startDate && endDate && date >= startDate && date <= endDate) {
        classes.push("selected-range");
      }

      if (startDate && date.getTime() === startDate.getTime()) {
        classes.push("start-date");
      }

      if (endDate && date.getTime() === endDate.getTime()) {
        classes.push("end-date");
      }

      return classes.join(' ');
    }
    return null;
  };

  const isDateDisabled = ({ date, view }) => {
    const today = new Date();
  
    // Asegura que solo comparamos fechas, no horas.
    today.setHours(0, 0, 0, 0); 
    if (view === "month") {
      // Verificar si la fecha está reservada
      if (reservedDates.some((reservedDate) => new Date(reservedDate).toDateString() === date.toDateString().split(4))) return true;
        
      // Verificar si la fecha es anterior al día actual
      if (date < today) return true; 
    }
  
    return false;
  };
  


  return (
    <div className="calendarReservasContainer">
      <ToastContainer />
      <p>Selecciona las fechas en que deseas </p>
      <p>programar tu cuidado</p>
      <Calendar
        onClickDay={handleDateClick} 
        tileClassName={tileClassName}
        tileDisabled={isDateDisabled}
      />
      <style>
      {`
          .highlight {
            text-decoration: line-through;
            color: gray;
            pointer-events: none;
          }
          .selected-range {
            background-color: rgba(98, 168, 243, 0.5);
            color: white;
            border-radius: 10px;
          }
          .start-date {
            background-color: #007bff;
            color: white;
            border-radius: 10px;
          }
          .end-date {
            background-color: #28a745;
            color: white;
            border-radius: 50%;
          }
          .past-date {
            position: relative;
            color: #999;
          }
          .past-date::after {
            content: '';
            position: absolute;
            left: 20%;
            right: 20%;
            top: 50%;
            border-top: 2px solid #ff0000;
          }
          .current-date {
            font-weight: 900 !important;
            color: #314549 !important;
            background-color: #f4b55a !important;
          }
        `}
      </style>
    </div>
  );
}

export default CalendarReservasServicio;
