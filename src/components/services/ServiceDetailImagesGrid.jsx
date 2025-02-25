import { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/services/serviceDetailImagesGrid.css";

const ServiceDetailImagesGrid = ({ images }) => {
	const [showGallery, setShowGallery] = useState(false);

	const handleViewMore = () => {
		setShowGallery(true);
	};

	return (
		<>
			<div className="images-grid-container">
				{/* Main image */}
				<div className="main-image">
					<img src={images[0]} alt="Main service view" />
				</div>

				{/* Grid of 4 smaller images */}
				<div className="secondary-images">
					{images.slice(1, 5).map((image, index) => (
						<div key={index} className="grid-image">
							<img
								src={image}
								alt={`Service view ${index + 2}`}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="button-container">
				<button className="view-more-button" onClick={handleViewMore}>
					Ver más
				</button>
			</div>

			{/* Gallery Modal - To be implemented */}
			{showGallery && (
				<div className="gallery-modal">
					{/* Gallery implementation */}
				</div>
			)}
		</>
	);
};

ServiceDetailImagesGrid.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ServiceDetailImagesGrid;
