import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { StarsComponent } from "../shared/StarsComponent";
import "../../styles/services/ReviewsPopup.css";
import cerrar from "../../images/cerrar.png";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "";

const ReviewsPopup = ({ isOpen, onClose, serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (isOpen && serviceId) {
        try {
          setLoading(true);
          console.log("Fetching reviews for service:", serviceId);

          // Obtener el token del localStorage y verificar si está presente
          const token = localStorage.getItem("token");
          console.log("Token found:", token ? "Yes" : "No");

          if (!token) {
            setError("Por favor inicia sesión para ver las reseñas");
            setLoading(false);
            return;
          }

          // Verificar si el token ha expirado
          try {
            const tokenData = JSON.parse(atob(token.split(".")[1]));
            if (tokenData.exp * 1000 < Date.now()) {
              setError(
                "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión."
              );
              localStorage.removeItem("token");
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error("Error al verificar el token:", e);
          }

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };

          console.log("Making request with config:", config);

          const response = await axios.get(
            `${BASE_URL}/api/reviews/servicio/${serviceId}`,
            config
          );

          console.log("Full API Response:", response);
          console.log("Reviews received:", response.data);

          // Asegurarse de que data sea un array
          const reviewsArray = Array.isArray(response.data)
            ? response.data
            : response.data.content || [];

          console.log("Processed reviews array:", reviewsArray);

          setReviews(reviewsArray);
        } catch (err) {
          console.error("Error details:", {
            message: err.message,
            response: err.response,
            status: err.response?.status,
            data: err.response?.data,
          });

          if (err.response?.status === 403) {
            setError(
              "No tienes permisos para ver las reseñas. Por favor, inicia sesión."
            );
          } else {
            setError(
              err.response?.data?.message || "Error al cargar las reseñas"
            );
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReviews();
  }, [isOpen, serviceId]);

  if (!isOpen) return null;

  const getInitials = (fullName) => {
    return fullName
      ? fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
      : "";
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      console.log("No se recibió fecha");
      return "";
    }

    console.log("Fecha recibida:", dateString);
    try {
      const date = new Date(dateString);
      console.log("Fecha parseada:", date);

      if (isNaN(date.getTime())) {
        console.log("Fecha inválida");
        return "";
      }

      const formattedDate = date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      console.log("Fecha formateada:", formattedDate);
      return formattedDate;
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "";
    }
  };

  console.log("Current reviews state:", reviews);

  return (
    <div className="reviews-popup-overlay">
      <div className="reviews-popup-content">
        <div className="reviews-popup-header">
          <h2>Reseñas del Servicio</h2>
          <button className="close-button" onClick={onClose}>
            <img src={cerrar} alt="Cerrar" />
          </button>
        </div>
        <div className="reviews-grid">
          {loading ? (
            <p className="loading-message">Cargando reseñas...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : reviews && reviews.length > 0 ? (
            reviews.map((review, index) => {
              console.log("Review data:", review);
              return (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-initials">
                      {getInitials(review.usuario?.nombre || "Usuario")}
                    </div>
                    <div className="reviewer-info">
                      <h3>{review.usuario?.nombre || "Usuario"}</h3>
                      <div className="stars-container">
                        <StarsComponent rating={review.puntuacion} />
                      </div>
                      <p className="review-comment">{review.comentario}</p>
                    </div>
                  </div>
                  <p className="review-date">
                    {formatDate(review.fechaCreacion)}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="no-reviews">
              No hay reseñas disponibles para este servicio.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

ReviewsPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  serviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ReviewsPopup;
