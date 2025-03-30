import React, { useEffect, useState } from 'react'
import { TitleComponent } from './shared/TitleComponent'
import { GridComponent } from './GridComponent'
import { obtenerCategoria } from '../services/categoryService'
import { ServiceCard } from './cards/ServiceCard'
import { useNavigate } from 'react-router-dom';


export const CategoriesGrid = (id) => {
    const [categoria, setCategoria] = useState([]);
    const [isLoadingCategorias, setIsLoadingCategorias] = useState(true);
    const navigate = useNavigate();

    const handleServiceClick = (service) => {
        navigate(`/service/${service.idServicio}`, {
          state: { selectedService: service },
        });
        window.scrollTo(0, 0);
      };

 useEffect(() => {
        const fetchCategorias = async () => {
            try {
                setIsLoadingCategorias(true);
                console.log("Fetching categories...");
                const token = localStorage.getItem("token");
                console.log("Using token:", token);
 
                const data = await obtenerCategoria(id);
                console.log("Categories received:", data);
                setCategoria(data);
            } catch (error) {
                console.error("Error details:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                });
                setErrors((prev) => ({
                    ...prev,
                    category: `Error al cargar las categorías: ${error.message}`,
                }));
            } finally {
                setIsLoadingCategorias(false);
            }
        };
 
        fetchCategorias();
    }, []);

  return (
    <div>
        <div>
        <TitleComponent title={categoria.nombre} />
        {/* <GridComponent type="category" services={categoria.servicios} /> */}
        
            
        {(categoria.servicios != undefined) && (
            <div className="grid-container">
            {categoria.servicios.map((profile) => (
                <ServiceCard
                    key={profile.idServicio}
                    name={profile.nombre}
                    serviceType=""
                    image={profile?.imagenUrls[0]?.imagenUrl}
                    rating={profile.rating}
                    excerpt={profile.descripcion}
                    onImageClick={() => handleServiceClick(profile)}
                />
            ))}
        </div>
        )}
        

    </div>
    </div>
  )
}
