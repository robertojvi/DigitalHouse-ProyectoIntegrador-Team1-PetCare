import React from "react";
import "../styles/pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faAngleRight,
	faAnglesLeft,
	faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return (
		<div className="centrado">
			<div className="inline-flex items-center gap-6 bg-white px-8 py-4 rounded-lg shadow">
				<button
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
					className="p-3 hover:bg-gray-100 rounded disabled:opacity-50 separado"
					title="Primera página"
				>
					<FontAwesomeIcon icon={faAnglesLeft} />
				</button>
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="p-3 hover:bg-gray-100 rounded disabled:opacity-50 separado"
					title="Página anterior"
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<span className="px-6 py-2 font-medium separado">
					{currentPage} 
				</span>
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="p-3 hover:bg-gray-100 rounded disabled:opacity-50 separado"
					title="Página siguiente"
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
				<button
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
					className="p-3 hover:bg-gray-100 rounded disabled:opacity-50 separado"
					title="Última página"
				>
					<FontAwesomeIcon icon={faAnglesRight} />
				</button>
			</div>
		</div>
	);
};
