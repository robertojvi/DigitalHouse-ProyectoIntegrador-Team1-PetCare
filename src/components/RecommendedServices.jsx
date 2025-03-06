import "react";
import { TitleComponent } from "./shared/TitleComponent";
import { GridComponent } from "./GridComponent";

// Datos de ejemplo - Idealmente vendrían de una API
const services = [
	{ id: 1, title: "Servicio 1", description: "Descripción 1", price: 100 },
	{ id: 2, title: "Servicio 2", description: "Descripción 2", price: 200 },
	// ... más servicios de ejemplo
];

export const RecommendedServices = ({ currentPage, itemsPerPage }) => {
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<div>
			<TitleComponent title={"Recomendados"} />
			<GridComponent services={currentServices} />
		</div>
	);
};
