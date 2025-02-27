import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #2d3e42; 
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1f2c2f;
  }
`;

const ButtonSearch = ({ onClick }) => {
  return <Button onClick={onClick}>Buscar</Button>;
};

export default ButtonSearch;