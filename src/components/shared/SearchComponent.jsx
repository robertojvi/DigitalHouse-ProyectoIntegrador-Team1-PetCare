import { useState } from "react";
import DatePicker from "react-datepicker";
import "../../styles/searchBox.css";
import "react-datepicker/dist/react-datepicker.css";
import { SearchInputsContainer } from "./styled-components/SearchComponent.styles";
import DateTimeButton from "./DateTimeButton";
import SelectService from "./SelectService";
import ButtonSearch from "./ButtonSearch";
import SearchBarComponent from "./SearchBarComponent";

export const SearchComponent = ({ onSearch }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedService, setSelectedService] = useState("");

  // Función para formatear fecha en YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0]; // Obtiene solo la parte de la fecha
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();

    if (searchTerm) queryParams.append("name", searchTerm);
    if (startDate) queryParams.append("startDate", formatDate(startDate));
    if (endDate) queryParams.append("endDate", formatDate(endDate));

    const url = `http://localhost:8080/api/servicios/filters?${queryParams.toString()}`;
    console.log("URL generada:", url); // 🔍 Verificar URL generada

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("DATAAA: ", data);
      onSearch(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <SearchInputsContainer>
      <div className="search-component-ss">
        <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <DateTimeButton dateRange={dateRange} setDateRange={setDateRange} />
        <SelectService value={selectedService} onChange={(e) => setSelectedService(e.target.value)} />
        <ButtonSearch onClick={handleSearch} />
      </div>
    </SearchInputsContainer>
  );
};
