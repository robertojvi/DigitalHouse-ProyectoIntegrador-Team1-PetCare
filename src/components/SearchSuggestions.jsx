import React, { useState, useEffect, useRef } from "react";
import DateTimeButton from "./shared/DateTimeButton";
import SelectService from "./shared/SelectService";
import "../styles/search/search.css";

const SearchSuggestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("Valor del input:", value);

    if (value.trim()) {
      const filtered = serviceSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      console.log("Sugerencias filtradas:", filtered);
      console.log("Estado showSuggestions:", true);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      console.log("No hay valor, limpiando sugerencias");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <div className="search-component-ss">
        {/* Input de búsqueda siempre visible */}
        <div
          className="sc-kfeOyU hgkRwz"
          ref={searchRef}
          style={{ position: "relative" }}
        >
          <input
            placeholder="Buscar..."
            className="sc-hRDKVd diQIVz"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
          />
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="sc-jBIHhB kEFzhK"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Otros componentes solo visibles en desktop */}
      {!isMobile && (
        <>
          <DateTimeButton />
          <SelectService />
          <button className="search-button">Buscar</button>
        </>
      )}
    </div>
  );
};

export default SearchSuggestions;
