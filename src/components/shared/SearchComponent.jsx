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

  const handleSearch = async () => {
    const queryParams = new URLSearchParams({
      name: searchTerm,
      feature: "",
      petsQty: "",
      singleDate: "",
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
    });

    try {
      const response = await fetch(`http://localhost:8080/api/servicios/filters?${queryParams}`);
      const data = await response.json();
      onSearch(data); // Pasamos los resultados a Home
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <SearchInputsContainer>
      <div className="search-component-ss">
        <SearchBarComponent value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <DateTimeButton onClick={() => setShowPicker(!showPicker)} />
        {showPicker && (
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            withPortal
          />
        )}
        <SelectService value={selectedService} onChange={(e) => setSelectedService(e.target.value)} />
        <ButtonSearch onClick={handleSearch} />
      </div>
    </SearchInputsContainer>
  );
};
