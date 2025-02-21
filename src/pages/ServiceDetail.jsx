import ServiceDetailImagesGrid from "../components/services/ServiceDetailImagesGrid";

const images = [
	"https://images.unsplash.com/photo-1601758228041-f3b2795255f1",
	"https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
	"https://images.unsplash.com/photo-1552053831-71594a27632d",
	"https://images.unsplash.com/photo-1556866261-8763a7662333",
	"https://images.unsplash.com/photo-1604848698030-c434ba08ece1",
];

const ServiceDetail = () => {
	return (
		<div className="mainContainer">
			{/* <h2><PiPawPrintLight /> Servicio</h2> */}
			<ServiceDetailImagesGrid images={images} />
		</div>
	);
};

export default ServiceDetail;
