import { createGlobalStyle } from 'styled-components';


export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif; 
    background-color: #f8f8f8;
  }

  h2{
    color: #314549;
    font-size: 24px;
  }

  h4{
    font-size: 16px;
  }
`;