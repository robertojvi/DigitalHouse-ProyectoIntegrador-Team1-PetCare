import "react";
import { StarsComponent } from "../shared/StarsComponent";

import {
  CardContainer,
  ImageContainer,
  Image,
  InfoContainer,
  NameContainer,
  ExcerptContainer,
  ButtonContainer,
  CTAContainer,
} from "./styled-components/ServiceCard.styles";
import { FavoriteButton } from "../shared/FavoriteButton";

// eslint-disable-next-line react/prop-types
export const ServiceCard = ({
  id,
  name,
  serviceType,
  image,
  rating,
  excerpt,
  onImageClick,
  isFavorito
}) => {
  // console.log(image?.imagenUrl);
  return (
    <CardContainer>
      <ImageContainer onClick={() => onImageClick()}>
        <Image alt={name} src={image || "https://images-s3-test.s3.us-east-1.amazonaws.com/Home-Pics/pets.jpg"} />
      </ImageContainer>
      <InfoContainer>
        <h4 className="serviceType">{serviceType?.nombre}</h4>
        <FavoriteButton serviceId={id} initialFavorite={isFavorito} onToggle={(fav) => console.log("Favorito:", fav)} />
        <NameContainer>
          <p>{name}</p>
          <StarsComponent rating={rating} key={name} />
        </NameContainer>
        <ExcerptContainer>
          <p>{excerpt}</p>
        </ExcerptContainer>
        <CTAContainer>
          <ButtonContainer onClick={() => onImageClick()}>
            Ver más
          </ButtonContainer>
        </CTAContainer>
      </InfoContainer>
    </CardContainer>
  );
};
