import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";

const HeartIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2;
  font-size: 20px;
  color: ${(props) => (props.$favorited ? "#f5a623" : "#aaa")};

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`;

export const FavoriteButton = ({ serviceId, initialFavorite, onToggle }) => {
  const [favorited, setFavorited] = useState(initialFavorite);
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const API_URL = `${BASE_URL}/api/favoritos`;
  const API_URL_GET_USER = `${BASE_URL}/api/usuarios`;
  const { auth, setFavoritos } = useContext(AuthContext);

  const handleClick = async () => {
       
      try {
        let response = [];
        if(!localStorage.getItem("token")){
          alert("Tienes que iniciar sesion para poder actualizar tus favoritos");
        }else{
          response = await axios.post(`${API_URL}/${serviceId}`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }); 
          setFavorited(!favorited);
        }
      
      } catch (err) {
        const errorMessage =
          err.response?.status === 403
            ? "No tienes permisos para acceder a esta información"
            : "Error al marcar favorito";
        console.error("Error fetching favoritos:", err);
      };

      const responseUsuario = await axios.get(`${API_URL_GET_USER}/${auth.idUsuario}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			});

			setFavoritos(responseUsuario.data.favoritos);

    if (onToggle) onToggle(!favorited);
  };

  return (
    <HeartIcon $favorited={favorited} onClick={handleClick}>
      {favorited ? <FaHeart /> : <FaRegHeart />}
    </HeartIcon>
  );
};
