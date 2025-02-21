
import React from 'react'
import { StarsComponent } from '../shared/StarsComponent'
import ImageTest from "../../assets/images/dummyImages/Alejandro.jpg";
import { CardContainer, ImageContainer, Image, InfoContainer, NameContainer, ExcerptContainer, ButtonContainer, CTAContainer } from './styled-components/ServiceCard.styles';

export const ServiceCard = ({ name, serviceType, image, rating, excerpt }) => {
  return (
    <CardContainer>
        <ImageContainer>
            <Image src={ImageTest} alt={name} />
        </ImageContainer>
        <InfoContainer>
            <h3 className='serviceType'>{serviceType}</h3>
            <NameContainer>
            <p>{name}</p>
            <StarsComponent rating={rating} />
            </NameContainer>
            <ExcerptContainer>
                <p>{excerpt}</p>
            </ExcerptContainer>
            <CTAContainer><ButtonContainer>Agenda</ButtonContainer></CTAContainer>
        </InfoContainer>
    </CardContainer>
  )
}
