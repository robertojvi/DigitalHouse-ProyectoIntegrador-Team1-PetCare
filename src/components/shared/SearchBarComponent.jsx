import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

// Contenedor de la barra de búsqueda
const SearchContainer = styled.div`
  position: relative;
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

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
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
  padding-right: 40px; /* Espacio para el icono */

  &::placeholder {
    color: #2d2d2d;
  }
`;

// Icono de búsqueda
const IconRight = styled(FaSearch)`
  font-size: 18px;
  color: #2d2d2d;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

// Contenedor de sugerencias
const SuggestionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
`;

const SuggestionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: #2d2d2d;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f4b55a;
    color: white;
  }
`;

const SearchBarComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Lista de ejemplo - Esto debería venir de tu API
  const serviceSuggestions = [
    "Paseo de perros",
    "Peluquería canina",
    "Cuidado de gatos",
    "Pensión para mascotas",
    "Adiestramiento canino",
    "Veterinaria a domicilio",
    "Cuidado de aves",
    "Baño y limpieza",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value.trim()) {
      const filtered = serviceSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={handleSearch}
        onFocus={() => searchText && setShowSuggestions(true)}
      />
      <IconRight />
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsContainer>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
};

export default SearchBarComponent;
