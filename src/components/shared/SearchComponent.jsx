// React
import { useState } from "react";
import DatePicker from "react-datepicker";

// Styles
import "../../styles/searchBox.css";
import "react-datepicker/dist/react-datepicker.css";
import { SearchInputsContainer } from "./styled-components/SearchComponent.styles";
import styled from "styled-components";

// Components
import DateTimeButton from "./DateTimeButton";
import SelectService from "./SelectService";
import ButtonSearch from "./ButtonSearch";
import SearchBarComponent from "./SearchBarComponent";

const SearchWrapper = styled(SearchInputsContainer)`
  width: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
    margin-bottom: 20px;
  }
`;

const ComponentsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 0;

    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4),
    & > :nth-child(5) {
      display: none !important;
    }

    & > :first-child {
      width: 100% !important;
      display: block !important;
    }
  }
`;

export const SearchComponent = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <SearchWrapper>
      <ComponentsContainer className="search-component-ss">
        <SearchBarComponent />
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
      </ComponentsContainer>
    </SearchWrapper>
  );
};
