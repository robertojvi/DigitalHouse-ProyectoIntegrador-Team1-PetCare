import { useEffect, useState } from "react";
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { ServiceCard } from "./cards/ServiceCard";
import "../styles/GridComponent.css";
import { getServices } from "../services/serviciosService";

export const GridComponent = ({ onServiceClick, type, services = [] }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    if (services.length > 0) {
      setProfiles(services); // Usar los servicios filtrados
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        setProfiles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading profiles:", error);
        setProfiles([]);
        setLoading(false);
      }
    };

    fetchServices();
  }, [services]);

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
            key={profile.idServicio}
            id={profile.idServicio}
            name={profile.nombre}
            serviceType={profile.categoria}
            image={profile?.imagenUrls[0]?.imagenUrl}
            rating={profile.rating}
            excerpt={profile.descripcion}
			      caracteristicas={profile.caracteristicas}
            onImageClick={() => onServiceClick(profile)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            <MdFirstPage size={20} />
          </button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <MdNavigateBefore size={20} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <MdNavigateNext size={20} />
          </button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
            <MdLastPage size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
