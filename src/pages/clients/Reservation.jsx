import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Reservation.css";
import { AuthContext } from "../../auth/AuthContext";
import { Icon } from "../../components/shared/styled-components/TitleComponents.styles";
import pawprint from "../../assets/icons/pawprint.svg";
import sent from "../../images/sent.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Reservation() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showModal, setShowModal] = useState(false); // <-- Modal visible o no
  const { auth } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const API_URL = `${BASE_URL}/api/reservas/${id}`;
  const navigate = useNavigate();

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
        console.error("Error al cargar la reserva:", err);
        setLoading(false);
      });
  }, [API_URL, auth.token]);

  const cancelarReserva = async () => {
    try {
      await axios.delete(
        `${API_URL}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("Reserva cancelada con éxito.");
      setShowModal(false);
      navigate("/mis-reservas");
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
      alert("Ocurrió un error al cancelar la reserva.");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando reserva...</p>;
  if (!reserva)
    return <p style={{ textAlign: "center" }}>Reserva no encontrada</p>;

  const {
    nombreServicio,
    imagenServicio,
    estado,
    fechaInicio,
    fechaFin,
    nombreCategoria,
    fechas,
    idReserva,
    codigoConfirmacion: codigoReserva,
  } = reserva;

  const codigoConfirmacion =
    codigoReserva ||
    (() => {
      const fecha = new Date(fechaInicio);
      const fechaFormateada = `${fecha.getDate()}${(fecha.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${fecha.getFullYear().toString().slice(2)}`;
      return `RSV-${nombreCategoria
        ?.substring(0, 3)
        .toUpperCase()}-${fechaFormateada}-${idReserva}`;
    })();

  const requerimientos = "No hay requerimientos especiales";

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredValue) => {
    setHoveredRating(hoveredValue);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((starValue) => (
      <span
        key={starValue}
        className={`estrella ${
          (hoveredRating || rating) >= starValue ? "active" : ""
        }`}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => handleStarHover(starValue)}
        onMouseLeave={handleStarLeave}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="card-container">
      {estado === "CONFIRMADA" && (
        <h2 className="titulo">
          ¡Confirmado! Servicio de {nombreCategoria} con {nombreServicio}
        </h2>
      )}

      {estado === "ELIMINADO" && (
        <h2 className="titulo">
          <span className="text-red">¡Cancelado!</span> Servicio de {nombreCategoria} con {nombreServicio}
        </h2>
      )}

      {estado == "FINALIZADA" && (
        <h2 className="titulo">
          Servicio de {nombreCategoria} con {nombreServicio}
        </h2>
      )}
      <img
        src={imagenServicio || "/mascotas.jpg"}
        alt="Cuidador de mascotas"
        className="imagen-principal"
      />
      <div className="fechas">
        <div className="fecha">
          <p className="emoji">
            <Icon src={pawprint} alt="Pawprint icon" />
          </p>
          <p className="etiqueta">Fecha inicial</p>
          <p className="valor">{fechaInicio}</p>
        </div>
        <div className="fecha">
          <p className="emoji">
            <Icon src={pawprint} alt="Pawprint icon" />
          </p>
          <p className="etiqueta">Fecha final</p>
          <p className="valor">{fechaFin}</p>
        </div>
      </div>
      <h3 className="subtitulo">Detalles de la reserva:</h3>
      <p className="texto">
        <strong>Tipo de servicio:</strong> {nombreCategoria}, cuidador:{" "}
        {nombreServicio}.<br />
        Número de días: {fechas.length}
      </p>
      <p className="texto">
        <strong>Código de confirmación:</strong> {codigoConfirmacion}
      </p>
      <p className="texto">
        <strong>Requerimientos especiales:</strong> {requerimientos}
      </p>

      {estado === "FINALIZADA" && (
        <div className="seccion-valoracion">
          <div className="valoracion">
            <p className="texto-valoracion">
              Valora El Servicio de {nombreServicio}, de 1 a 5, siendo 1 muy
              insatisfecho y 5 muy satisfecho
            </p>
            <div className="estrellas">{renderStars()}</div>
          </div>
          <div className="comentario">
            <textarea
              className="input-textarea"
              placeholder="Agrega un comentario sobre el servicio (opcional)"
            ></textarea>
            <div className="enviar-container">
              <span className="texto-enviar">Enviar</span>
              <img src={sent} alt="Enviar" className="icono-enviar" />
            </div>
          </div>
        </div>
      )}

      {estado === "CONFIRMADA" && (
        <div className="acciones">
          <button className="boton azul">Edita Tu Reserva</button>
          <button className="boton rojo" onClick={() => setShowModal(true)}>
            Cancela Tu Reserva
          </button>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Cancelar reserva?</h3>
            <p>¿Estás seguro de que deseas cancelar esta reserva?</p>
            <div className="modal-buttons">
              <button className="boton gris" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="boton rojo" onClick={cancelarReserva}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
