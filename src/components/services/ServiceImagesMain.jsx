// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


// Pages

// Components
import ServiceInfo from "./ServiceInfo"; //para traer la información del servicio

// Styles
import "../../styles/services/serviceImagesMain.css";

// Images
import arrowLeft from "../../images/arrow-left.png";
//Icon
import { GoShare } from "react-icons/go";
import closeIcon from "../../images/cerrar.png";
import { IoCopy } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";


//States

const ServiceImagesMain = ({ images, onGoBack }) => {
	const [showShareModal, setShowShareModal] = useState(false);
	const navigate = useNavigate();

	const handleViewMore = () => {
		navigate("/gallery", { state: { images } });
		window.scrollTo(0, 0); // Add scroll to top
	};

	const handleBackClick = () => {
		if (onGoBack) {
			onGoBack();
		} else {
			navigate("/");
		}
	};

	// Share modal component
		const ShareModal = () => (
			<div className="modal-overlay">
				<div className="share-modal">
					<button
						className="share-close-icon"
						onClick={() => setShowShareModal(false)}
					>
						<img src={closeIcon} alt="Cerrar" />
					</button>
					{/* aquí va la tarjeta con la info */}

					{/* Botones */}
					<div className="general-share-container">
						<div className="right-container">
							<button className="share-btn-modal" onClick={""}>
								<IoCopy className="share-icon"/>
								Copiar enlace
							</button>
							<button className="share-btn-modal" onClick={""}>
								<IoLogoWhatsapp className="share-icon"/>
								WhatsApp
							</button>
							<button className="share-btn-modal" onClick={""}>
								<FaSquareXTwitter className="share-icon"/>
								Twitter
							</button>
						</div>
						<div className="left-container">
							<button className="share-btn-modal" onClick={""}>
								<MdMail className="share-icon"/>
								Correo Electrónico
							</button>
							<button className="share-btn-modal" onClick={""}>
								<FaFacebook className="share-icon"/>
								Facebook
							</button>
							<button className="share-btn-modal" onClick={""}>
								<FaFacebookMessenger className="share-icon"/>
								Messenger
							</button>
						</div>
					</div>
					
					

					
				</div>
			</div>
		);


	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					padding: "10px 20px",
				}}
			>
				<button onClick={()=>setShowShareModal(true)} className="share-button">
					<GoShare style={{height:"22px", width:"22px", color:"orange"}}/>
					Compartir
				</button>
				<button onClick={handleBackClick} className="back-button">
					<img src={arrowLeft} alt="Go back" />
				</button>
			</div>
			<div className="images-grid-container">
				{/* Main image */}
				<div className="main-image">
					<img src={images[0]?.imagenUrl || '/images/default-placeholder.jpg'} alt="Main service view" />
				</div>

				{/* Grid of 4 smaller images */}
				<div className="secondary-images">
					{images.slice(1, 5).map((image, index) => (
						<div key={index} className="grid-image">
							<img
								src={image?.imagenUrl || '/images/default-placeholder.jpg'}
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
			{showShareModal && <ShareModal/>}
		</div>
	);
};

ServiceImagesMain.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	onGoBack: PropTypes.func,
};

export default ServiceImagesMain;
