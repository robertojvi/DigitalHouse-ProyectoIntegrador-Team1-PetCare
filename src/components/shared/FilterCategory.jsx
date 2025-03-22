import React from 'react'
import { FilterCategoryContainer, FilterCategoryLink } from './styled-components/FilterCategory.styles'
import { getAppUrl } from '../../services/getAppUrl'

const BASE_URL = import.meta.env.VITE_API_URL || "";


export const FilterCategory = ({ name, icon, id }) => {

    return (
        <FilterCategoryContainer>
            <FilterCategoryLink href={`${BASE_URL}/categories/${id+1}`}>
            <img src={icon} alt={`${name} icon`} />
            <p>{name}</p>
            </FilterCategoryLink>
        </FilterCategoryContainer>
    )
}