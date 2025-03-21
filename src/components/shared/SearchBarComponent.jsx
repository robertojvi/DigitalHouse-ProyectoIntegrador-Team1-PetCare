import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { getAppUrl } from "../../services/getAppUrl";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4b55a;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 16px;
  color: #2d2d2d;
  font-weight: 500;
  width: 250px;
  transition: background 0.3s ease;
  position: relative;

  &:hover {
    background-color: #e0a54e;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

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

const IconRight = styled(FaSearch)`
  font-size: 18px;
  color: #2d2d2d;
`;

const SuggestionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  background: white;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 150px;
  overflow-y: auto;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  color: #2d2d2d;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SearchBarComponent = ({ searchTerm, setSearchTerm }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetch(`${getAppUrl}/api/servicios/suggestions?query=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          setShowSuggestions(true);
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconRight />
      </SearchInputWrapper>
      {showSuggestions && (
        <SuggestionsList>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => setSearchTerm(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))
          ) : (
            <SuggestionItem>No hay sugerencias</SuggestionItem>
          )}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default SearchBarComponent;
