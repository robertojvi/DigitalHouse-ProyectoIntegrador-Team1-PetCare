import { useEffect, useState } from "react";
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { ServiceCard } from "./cards/ServiceCard";
import "../styles/GridComponent.css";
import { getServices } from "../services/serviciosService";

export const GridComponent = () => {
	const [profiles, setProfiles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 10;

	useEffect(() => {
		const fetchServices = async () => {
			try {
				setLoading(true);
				const data = await getServices();
				console.log("DATA: ",data);
				setProfiles(data);
			} catch (error) {
				console.error("Error loading profiles:", error);
				setProfiles([]); // En caso de error, establecer un array vacío
			} finally {
				setLoading(false);
			}
		};
	
		fetchServices();
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

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={currentPage === i ? 'active' : ''}
					title={`Ir a página ${i}`}
				>
					{i}
				</button>
			);
		}
		return pageNumbers;
	};

	if (loading) return <div className="loading">Cargando...</div>;

	return (
		<div className="grid-wrapper">
			<div className="grid-container">
				{currentItems.map((profile) => (
					<ServiceCard
						key={profile.idServicio}
						name={profile.nombre}
						serviceType={profile.categoria}
						image={profile.imagenUrls[0]}
						rating={profile.rating}
						excerpt={profile.descripcion}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<div className="pagination">
					<button
						onClick={() => handlePageChange(1)}
						disabled={currentPage === 1}
						title="Primera página"
					>
						<MdFirstPage size={20} />
					</button>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						title="Página anterior"
					>
						<MdNavigateBefore size={20} />
					</button>
					{renderPageNumbers()}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						title="Página siguiente"
					>
						<MdNavigateNext size={20} />
					</button>
					<button
						onClick={() => handlePageChange(totalPages)}
						disabled={currentPage === totalPages}
						title="Última página"
					>
						<MdLastPage size={20} />
					</button>
				</div>
			)}
		</div>
	);
};
