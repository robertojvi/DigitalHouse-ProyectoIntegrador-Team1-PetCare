import React, { useState } from 'react';
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

// Contenedor de la barra de búsqueda
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4b55a;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 16px;
  color: #2d2d2d;
  font-weight: 500;
  width: 250px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e0a54e;
  }
`;

// Input de búsqueda
const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #2d2d2d;
  padding: 5px;

  &::placeholder {
    color: #2d2d2d;
  }
`;

// Icono de búsqueda
const IconRight = styled(FaSearch)`
  font-size: 18px;
  color: #2d2d2d;
`;

const SearchBarComponent = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput 
        type="text" 
        placeholder="Buscar..." 
        value={searchText} 
        onChange={handleSearch}
      />
      <IconRight />
    </SearchContainer>
  );
};

export default SearchBarComponent;

