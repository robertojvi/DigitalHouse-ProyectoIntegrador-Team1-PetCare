import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif; /* Cambia por la fuente que prefieras */
    background-color: #f8f8f8;
  }

  h2{
    color: #685044;
    font-size: 24px;
  }

  h4{
    font-size: 16px;
  }

 
`;