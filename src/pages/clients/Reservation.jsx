import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Reservation.css';
import { AuthContext } from '../../auth/AuthContext';
import {Icon } from '../../components/shared/styled-components/TitleComponents.styles'
import pawprint from '../../assets/icons/pawprint.svg'

export default function Reservation() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_API_URL || '';
  const API_URL = `${BASE_URL}/api/reservas/${id}`;

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setReserva(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar la reserva:', err);
        setLoading(false);
      });
  }, [API_URL, auth.token]);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando reserva...</p>;
  if (!reserva) return <p style={{ textAlign: 'center' }}>Reserva no encontrada</p>;

  // Estructura desde la respuesta
  const {
    nombreServicio,
    imagenServicio,
    estado,
    fechaInicio,
    fechaFin,
    nombreCategoria,
    fechas,
    idReserva,
  } = reserva;

  const codigoConfirmacion = `RSV-${idReserva}`;
  const requerimientos = "No hay requerimientos especiales"; // placeholder

  return (
    <div className="card-container">
      {estado === 'CONFIRMADA' && (
        <h2 className="titulo">¡Confirmado! Servicio de {nombreCategoria} con {nombreServicio}</h2>
      )}
      <img
        src={imagenServicio || '/mascotas.jpg'}
        alt="Cuidador de mascotas"
        className="imagen-principal"
      />
      <div className="fechas">
        <div className="fecha">
          <p className="emoji"><Icon src={pawprint} alt="Pawprint icon" /></p>
          <p className="etiqueta">Fecha inicial</p>
          <p className="valor">{fechaInicio}</p>
        </div>
        <div className="fecha">
          <p className="emoji"><Icon src={pawprint} alt="Pawprint icon" /></p>
          <p className="etiqueta">Fecha final</p>
          <p className="valor">{fechaFin}</p>
        </div>
      </div>
      <h3 className="subtitulo">Detalles de la reserva:</h3>
      <p className="texto">
        Tipo de servicio: {nombreCategoria}, cuidador: {nombreServicio}.<br />
        Número de días: {fechas.length}
      </p>
      <p className="texto">Código de confirmación: <strong>{codigoConfirmacion}</strong></p>
      <p className="texto">Requerimientos especiales: {requerimientos}</p>

      <div className="seccion-valoracion">
        <div className="valoracion">
          <p className="texto">Valora el servicio de {nombreServicio}, de 1 a 5</p>
          <div className="estrellas">★★★★★</div>
        </div>
        <div className="comentario">
          <textarea
            className="input-textarea"
            placeholder="Agrega un comentario sobre el servicio (opcional)"
          ></textarea>
          <button className="boton gris">Enviar</button>
        </div>
      </div>

      {estado === 'CONFIRMADA' && (
        <div className="acciones">
          <button className="boton azul">Edita Tu Reserva</button>
          <button className="boton rojo">Cancela Tu Reserva</button>
        </div>
      )}
    </div>
  );
}
