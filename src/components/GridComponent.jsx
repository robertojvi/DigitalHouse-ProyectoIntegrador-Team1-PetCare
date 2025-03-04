import { useEffect, useState } from "react";
import { ServiceCard } from "./cards/ServiceCard";
import "../styles/GridComponent.css";

export const GridComponent = () => {
	const [profiles, setProfiles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 10;

	useEffect(() => {
		setLoading(true);
		fetch("/data/profiles.json")
			.then((response) => response.json())
			.then((data) => {
				setProfiles(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error loading profiles:", error);
				setLoading(false);
			});
	}, []);

	// Pagination calculations
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = profiles.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(profiles.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (loading) return <div className="loading">Cargando...</div>;

	return (
		<div className="grid-wrapper">
			<div className="grid-container">
				{currentItems.map((profile) => (
					<ServiceCard
						key={profile.id}
						name={profile.name}
						serviceType={profile.serviceType}
						image={profile.image}
						rating={profile.rating}
						excerpt={profile.excerpt}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<div className="pagination">
					<button
						onClick={() => handlePageChange(1)}
						disabled={currentPage === 1}
					>
						Inicio
					</button>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Anterior
					</button>
					<span>
						Página {currentPage} de {totalPages}
					</span>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Siguiente
					</button>
					<button
						onClick={() => handlePageChange(totalPages)}
						disabled={currentPage === totalPages}
					>
						Último
					</button>
				</div>
			)}
		</div>
	);
};
