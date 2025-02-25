import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 500px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  
`;

export const ImageContainer = styled.div`
    width: 50%;
    padding:0px;
    margin:0px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0px;
  padding-bottom:0px;
`;

export const InfoContainer = styled.div`
    width: 50%;
    padding: 10px 10px;
    & h4.serviceType {
        color: #685044;
        font-size: 16px; 
        font-weight: 700;
    }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & p{
    color: #000000;
    font-weight: 600;
    font-size: 14px
  }

  @media (max-width: 767px) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
`;

export const ExcerptContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
  text-align: center;

  & p{
    color: #000000;
    font-weight: 400;
    font-size: 14px;
  }

  @media (max-width: 767px) {
      align-items: flex-start;
      text-align: left;
    }
  `;

  export const CTAContainer = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px
  `;

  export const ButtonContainer = styled.button`
    background-color: #314549;
    padding: 10px;
    border-radius: 16px;
    color: #ffffff;
    width: 90px;
    border: none;
    cursor: pointer;
    margin: 0 auto;
  `;
