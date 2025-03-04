import React, { useEffect, useState } from 'react'
import { FilterCategory } from './shared/FilterCategory'
import { ServicesFilterContainer, SelectContainer, SelectGroupContainer } from './styled-components/ServicesFilter.styles'

export const ServicesFilter = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/data/categories.json')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error al obtener categorías:', error))
    }, [])

    return (
        <div>
            <div>
                <p style={{
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#333",
                    "margin-bottom": "5px"
                }}>Estoy buscando</p>
                <ServicesFilterContainer>
                    {categories.map((category, index) => (
                        <FilterCategory key={index} name={category.name} icon={category.icon} />
                    ))}
                </ServicesFilterContainer>
            </div>

            <SelectGroupContainer>
                <div className='firstSelect'>
                    <SelectContainer>
                        <p>Mi tipo de mascota</p>
                        <div>
                            <select>
                                <option value="gato">Gato</option>
                                <option value="perro">Perro</option>
                                <option value="pez">Pez</option>
                            </select>
                        </div>
                    </SelectContainer>
                </div>
                <div style={{ width: "100%" }}>
                    <SelectContainer>
                        <p>Ubicación</p>
                        <div>
                            <select>
                                <option value="medellin">Medellín, Antioquia, Colombia</option>
                                <option value="bogota">Bogotá, Colombia</option>
                                <option value="cali">Cali, Colombia</option>
                            </select>
                        </div>
                    </SelectContainer>
                </div>
            </SelectGroupContainer>
        </div >
    )
}
