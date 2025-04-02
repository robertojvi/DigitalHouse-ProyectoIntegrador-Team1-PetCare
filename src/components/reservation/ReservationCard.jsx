import pawprint from "../../assets/icons/pawprint.svg";
import { Icon } from "../shared/styled-components/TitleComponents.styles";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/reservationHistory.css";

const ReservationCard = ({ reserva }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mi-reserva/${reserva.idReserva}`);
  };

  const codigoConfirmacion = `RSV-${reserva.idReserva}`;

  return (
    <div
      className="reservation-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={reserva.imagenServicio}
        alt="Imagen reserva"
        className="reservation-image"
      />
      <div className="reservation-content">
        <div className="reservation-dates">
          <div>
            <div className="date-label">
              <Icon src={pawprint} alt="Pawprint icon" /> Fecha Inicial
            </div>
            <div className="date-value">{reserva.fechaInicio}</div>
          </div>
          <div>
            <div className="date-label">
              <Icon src={pawprint} alt="Pawprint icon" /> Fecha Final
            </div>
            <div className="date-value">{reserva.fechaFin}</div>
          </div>
        </div>
        <div className="reservation-details">
          <div className="reservation-details-label">
            Detalles de la Reserva:
          </div>
          <div className="reservation-details-value">
            {reserva.nombreCategoria}
          </div>
        </div>
        <div>
          <div className="confirmation-code-label">Código de confirmación</div>
          <div className="confirmation-code-value">{codigoConfirmacion}</div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;