import styled from "styled-components";

export const SuggestionsContainer = styled.div`
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

export const SuggestionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: #2d2d2d;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f4b55a;
    color: white;
  }
`;
