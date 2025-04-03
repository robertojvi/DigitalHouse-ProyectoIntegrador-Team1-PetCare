import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ServiceCard } from "../components/cards/ServiceCard";
import pawprint from "../assets/icons/pawprint.svg";
import mockFavorites from "../mocks/favoritesData.json";
import "../styles/pages/favorites.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const API_URL_GET_USER = `${BASE_URL}/api/usuarios`;

  useEffect(() => {
    // Simulamos una llamada a la API con un pequeño retraso
    // const fetchFavorites = async () => {
    //   try {
    //     // Simulamos un delay para que parezca una llamada real
    //     await new Promise((resolve) => setTimeout(resolve, 500));
    //     JSON.parse(localStorage.getItem("favorites"))
    //     setFavorites(mockFavorites.favorites);
    //   } catch (error) {
    //     console.error("Error fetching favorites:", error);
    //   }
    // };

    // fetchFavorites();

    // Comentamos la llamada real a la API por ahora
    if (auth.token) {
      const fetchFromAPI = async () => {
        try {
          const responseUsuario = await axios.get(
            `${API_URL_GET_USER}/${auth.idUsuario}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );

          console.log(responseUsuario);
          setFavorites(responseUsuario.data.favoritos);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFromAPI();
    }
  }, []);

  const handleImageClick = (serviceId) => {
    const selectedService = favorites.find(
      (service) => service.idServicio === serviceId
    );
    navigate(`/service/${serviceId}`, {
      state: { selectedService },
    });
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
