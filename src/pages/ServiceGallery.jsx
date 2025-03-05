import { useLocation, useNavigate } from "react-router-dom";
import "../styles/services/serviceGallery.css";
import arrowLeft from "../images/arrow-left.png";

const ServiceGallery = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { images } = location.state;

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="mainContainer">
			<div className="gallery-container">
				<button onClick={handleGoBack} className="back-button">
					<img src={arrowLeft} alt="Go back" />
				</button>

				<div className="gallery-grid">
					{images.map((image, index) => (
						<div key={index} className="gallery-item">
							<img src={image} alt={`Pet ${index + 1}`} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServiceGallery;
