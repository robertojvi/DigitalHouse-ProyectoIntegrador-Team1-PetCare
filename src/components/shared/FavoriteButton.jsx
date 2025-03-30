import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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

export const FavoriteButton = ({ serviceId, onToggle }) => {
  const [favorited, setFavorited] = useState(false);

  // Cargar estado desde localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorited(storedFavorites.includes(serviceId));
  }, [serviceId]);

  const handleClick = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (favorited) {
      updatedFavorites = storedFavorites.filter((id) => id !== serviceId);
    } else {
      updatedFavorites = [...storedFavorites, serviceId];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorited(!favorited);

    if (onToggle) onToggle(!favorited);
  };

  return (
    <HeartIcon $favorited={favorited} onClick={handleClick}>
      {favorited ? <FaHeart /> : <FaRegHeart />}
    </HeartIcon>
  );
};
