// React
import { useState } from "react";
import DatePicker from "react-datepicker";

// Styles
import "../../styles/searchBox.css";
import "react-datepicker/dist/react-datepicker.css";
import { SearchInputsContainer } from "./styled-components/SearchComponent.styles";

// Components
import DateTimeButton from "./DateTimeButton";
import SelectService from "./SelectService";
import ButtonSearch from "./ButtonSearch";
import SearchBarComponent from "./SearchBarComponent";

export const SearchComponent = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <SearchInputsContainer>
      <div className="search-component-ss">
        <SearchBarComponent /> {/**COMPONENTE DE BÚSQUEDA */}
        <DateTimeButton onClick={() => setShowPicker(!showPicker)} />
        {showPicker && (
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            withPortal
          />
        )}
        <SelectService />
        <ButtonSearch />
      </div>
    </SearchInputsContainer>
  );
};
