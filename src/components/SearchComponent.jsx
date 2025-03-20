import React from "react";
import DateTimeButton from "./shared/DateTimeButton";
import SelectService from "./shared/SelectService";
import "../styles/search/search.css";

const SearchComponent = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar servicio"
        className="search-input"
      />
      <DateTimeButton />
      <SelectService />
      <button className="search-button">Buscar</button>
    </div>
  );
};

export default SearchComponent;
