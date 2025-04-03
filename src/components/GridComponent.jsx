import { useContext, useEffect, useState } from "react";
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { ServiceCard } from "./cards/ServiceCard";
import "../styles/GridComponent.css";
import { getServices } from "../services/serviciosService";
import { AuthContext } from "../auth/AuthContext";

export const GridComponent = ({ onServiceClick, type, services = [] }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { favoritos } = useContext(AuthContext);
  const itemsPerPage = 10;

  useEffect(() => {
    if (services.length > 0) {
      setProfiles(services); // Usar los servicios filtrados
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        const storedServices = sessionStorage.getItem("services");
        const randomizedServices = sessionStorage.getItem("randomizedServices");
       
        console.log("Servicios almacenados en sessionStorage:", storedServices);
    
        if (randomizedServices && randomizedServices !== undefined && randomizedServices.length > 0) {
          const data = JSON.parse(randomizedServices);
          console.log("entra a random")
          setProfiles(data);
          setLoading(false);
          return;
        } else if(storedServices && storedServices !== undefined && storedServices !== null && storedServices.length > 0){
          console.log("entra a stored")
          const data = JSON.parse(storedServices);
          setProfiles(data);
          setLoading(false);
          return;
        }
    
        setLoading(true);        
        const data = await getServices();
        sessionStorage.setItem("services", JSON.stringify(data));
        setProfiles(data);        
        setLoading(false);
      } catch (error) {
        console.error("Error loading profiles:", error);
        setProfiles([]);
        setLoading(false);
      }
    };

    fetchServices();
  }, [services, favoritos]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <div className="loading">Cargando...</div>;
  const favoritosIds = favoritos.map(favorito => favorito.idServicio);

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
            isFavorito={favoritosIds.includes(profile.idServicio)}
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
