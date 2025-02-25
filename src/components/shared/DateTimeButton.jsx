import React from "react";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";

// Estilos para el botón
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f4b55a;
  border: none;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 16px;
  color: #2d2d2d;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e0a54e;
  }

  @media (max-width: 767px){
    display: none;
  }
`;

// Estilos para el icono
const Icon = styled(FaCalendarAlt)`
  font-size: 20px;
`;

const DateTimeButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon />
      ¿Cuándo quieres agendar?
    </Button>
  );
};

export default DateTimeButton;