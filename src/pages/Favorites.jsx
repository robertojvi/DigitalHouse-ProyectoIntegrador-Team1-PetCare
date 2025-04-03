import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ServiceCard } from "../components/cards/ServiceCard";
import pawprint from "../assets/icons/pawprint.svg";
import { useNavigate } from "react-router-dom";
import "../styles/pages/favorites.css";

const Favorites = () => {
  const { favoritos } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  // Escucha cambios en favoritos del contexto
  useEffect(() => {
    setFavorites(favoritos || []);
  }, [favoritos]);

  const handleImageClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="favorites-container">
      <div className="favorites-title">
        <img src={pawprint} alt="Huella" className="pawprint" />
        <h1>Mis Favoritos</h1>
        <img src={pawprint} alt="Huella" className="pawprint" />
      </div>

      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((service) => (
            <ServiceCard
              key={service.idServicio}
              id={service.idServicio}
              name={service.nombre}
              serviceType={service.categoria.nombre}
              image={service.imagenUrls[0]?.imagenUrl}
              rating={service.rating}
              excerpt={service.descripcion}
              onImageClick={() => handleImageClick(service.idServicio)}
              isFavorito={true}
            />
          ))}
        </div>
      ) : (
        <p className="no-favorites">No tienes servicios favoritos guardados.</p>
      )}
    </div>
  );
};

export default Favorites;
