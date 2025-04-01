
import pawprint from '../../assets/icons/pawprint.svg'
import { Icon } from '../shared/styled-components/TitleComponents.styles';


const cardStyle = {
    display: "flex",
    flexDirection: "row",
    marginBottom: "24px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  };
  
  const imageStyle = {
    width: "33.33%",
    height: "auto",
    objectFit: "cover",
  };
  
  const contentStyle = {
    padding: "20px",
    flex: 1,
    fontSize: "14px",
  };
  
  const sectionStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    color: "#555",
  };
  
  const labelStyle = {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };
  
  const ReservationCard = ({ reserva }) => {
    return (
      <div style={cardStyle}>
        <img
          src={reserva.imagenServicio}
          alt="Imagen reserva"
          style={imageStyle}
        />
        <div style={contentStyle}>
          <div style={sectionStyle}>
            <div>
              <div style={labelStyle}>
                <Icon src={pawprint} alt="Pawprint icon" /> Fecha Inicial
              </div>
              <div>{reserva.fechaInicio}</div>
            </div>
            <div>
              <div style={labelStyle}>
                <Icon src={pawprint} alt="Pawprint icon" /> Fecha Final
              </div>
              <div>{reserva.fechaFin}</div>
            </div>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Detalles de la reserva: </strong><br />
            {reserva.nombreCategoria}
          </div>
          <div>
            <strong>Estado:</strong><br />
            {reserva.estado}
          </div>
        </div>
      </div>
    );
  };

  export default ReservationCard;