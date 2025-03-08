import PropTypes from "prop-types";
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

// eslint-disable-next-line react/prop-types
ServiceCard.propTypes = {
	name: PropTypes.string.isRequired,
	serviceType: PropTypes.shape({
		name: PropTypes.string.isRequired,
	}).isRequired,
	image: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	excerpt: PropTypes.string.isRequired,
	onImageClick: PropTypes.func.isRequired,
};
export const ServiceCard = ({
	name,
	serviceType,
	image,
	rating,
	excerpt,
	onImageClick,
}) => {
	return (
		<CardContainer>
			<ImageContainer onClick={() => onImageClick()}>
				<Image src={image} alt={name} style={{ cursor: "pointer" }} />
			</ImageContainer>
			<InfoContainer>
				<h3 className="serviceType">{serviceType.name}</h3>
				<NameContainer>
					<p>{name}</p>
					<StarsComponent rating={rating} />
				</NameContainer>
				<ExcerptContainer>
					<p>{excerpt}</p>
				</ExcerptContainer>
				<CTAContainer>
					<ButtonContainer>Agenda</ButtonContainer>
				</CTAContainer>
			</InfoContainer>
		</CardContainer>
	);
};
