import { useState } from "react";
import DatePicker from "react-datepicker";
import "../../styles/searchBox.css";
import "react-datepicker/dist/react-datepicker.css";
import { SearchInputsContainer } from "./styled-components/SearchComponent.styles";
import DateTimeButton from "./DateTimeButton";
import SelectService from "./SelectService";
import ButtonSearch from "./ButtonSearch";
import SearchBarComponent from "./SearchBarComponent";
import { getAppUrl } from "../../services/getAppUrl";

export const SearchComponent = ({ onSearch }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Función para formatear fecha en YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();

    if (searchTerm) queryParams.append("name", searchTerm);
    if (startDate) queryParams.append("startDate", formatDate(startDate));
    if (endDate) queryParams.append("endDate", formatDate(endDate));
    if (selectedService) queryParams.append("petsQty", selectedService);

    const BASE_URL = import.meta.env.VITE_API_URL || "";

    const url = `${BASE_URL}/api/servicios/filters?${queryParams.toString()}`;
    console.log("URL generada:", url);

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
        <SearchBarComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <DateTimeButton dateRange={dateRange} setDateRange={setDateRange} />
        <SelectService
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
        <ButtonSearch onClick={handleSearch} />
      </div>
    </SearchInputsContainer>
  );
};
