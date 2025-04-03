import React from 'react'
import { useContext } from "react";
import { FilterCategoryContainer, FilterCategoryLink } from './styled-components/FilterCategory.styles'
import { AuthContext } from "../../auth/AuthContext.jsx";

export const FilterCategory = ({ name, icon, id }) => {
    const { setIdCategoria } = useContext(AuthContext);

    const handleClick = async () => {
        console.log("Categoria id: " + (id))
        try {
           
            // const servicesFiltered = await getServices(id)
            const storedServices = JSON.parse(sessionStorage.getItem("services"));
            
            if(id !== 99){
                const servicesFiltered = storedServices.filter(service => service.categoria.id_categoria === id);
                sessionStorage.setItem(
                    "servicesFiltered",
                    JSON.stringify(servicesFiltered)
                );
            }else{
                sessionStorage.setItem("servicesFiltered", sessionStorage.getItem("services"))
            }
            

            setIdCategoria(id)
        } catch (error) {
            console.error("Error al obtener servicios filtrados:", error.message);
        }
    };
    return (
        <FilterCategoryContainer>
            <FilterCategoryLink onClick={handleClick}>
                {id === 99 ? (
                    <img src={icon} alt={`${name} icon`} height={25} />
                ): (
                    <img src={icon} alt={`${name} icon`} />
                )}
            
            <p>{name}</p>
            </FilterCategoryLink>
        </FilterCategoryContainer>
    )
}