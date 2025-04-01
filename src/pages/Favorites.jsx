import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ServiceCard } from "../components/cards/ServiceCard";
import pawprint from "../assets/icons/pawprint.svg";
import mockFavorites from "../mocks/favoritesData.json";
import "../styles/pages/favorites.css";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulamos una llamada a la API con un pequeño retraso
    const fetchFavorites = async () => {
      try {
        // Simulamos un delay para que parezca una llamada real
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFavorites(mockFavorites.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();

    // Comentamos la llamada real a la API por ahora
    /* if (auth.token) {
      const fetchFromAPI = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/favorites/${auth.id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          const data = await response.json();
          setFavorites(data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFromAPI();
    } */
  }, []);

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
              key={service.id}
              id={service.id}
              name={service.name}
              serviceType={service.serviceType}
              image={service.image}
              rating={service.rating}
              excerpt={service.description}
              onImageClick={() => handleImageClick(service.id)}
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
