import React, { useContext, useEffect, useState } from "react";
import ReservationCard from "../../components/reservation/ReservationCard";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import "../../styles/pages/reservationHistory.css";

const ReservationHistory = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const API_URL = `${BASE_URL}/api/reservas`;
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setReservas(response.data);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [API_URL, auth.token]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando reservas...</p>;
  }

  return (
    <div className="reservation-history-container">
      <h2 className="reservation-history-title">Historial de Reservas</h2>
      {reservas.length === 0 ? (
        <p>No tienes reservas aún.</p>
      ) : (
        reservas.map((reserva) => (
          <ReservationCard key={reserva.idReserva} reserva={reserva} />
        ))
      )}
    </div>
  );
};

export default ReservationHistory;
