import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(40%, 2fr));
  gap: 20px;
  column-gap: 50px;
  margin-top: 20px;

   @media (max-width: 1024px) {
    column-gap: 20px;
    
    }

    @media (max-width: 768px) {
        column-gap: 20px;
        grid-template-columns: none;
    }
`;