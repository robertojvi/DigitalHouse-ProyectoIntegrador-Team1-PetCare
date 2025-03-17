import styled from 'styled-components';

export const ServiceDetailInfoContainer = styled.div`
    width: 50%;
`;

export const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid #000000;
  border-radius: 10px;
  width: 100%;
  
  & p{
    font-size:12px;
    font-weight: 600;
  }
`;

export const ReviewsStarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & p{
    font-size:12px;
    font-weight: 600;
  }
`;


export const DetailInfoContainer = styled.div`

  & p.name{
    color: #685044;
    font-size:24px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  & p.details{
    color: #685044;
    font-size:14px;
    font-weight: 400;
    margin-bottom: 15px;
  }
`;
