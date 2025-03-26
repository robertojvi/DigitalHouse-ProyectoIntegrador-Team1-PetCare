import React from 'react'
import { FilterCategoryContainer, FilterCategoryLink } from './styled-components/FilterCategory.styles'
import { getAppUrl } from '../../services/getAppUrl'

const BASE_APP_URL = import.meta.env.VITE_APP_URL || "";


export const FilterCategory = ({ name, icon, id }) => {

    return (
        <FilterCategoryContainer>
            <FilterCategoryLink href={`${BASE_APP_URL}/categories/${id+1}`}>
            <img src={icon} alt={`${name} icon`} />
            <p>{name}</p>
            </FilterCategoryLink>
        </FilterCategoryContainer>
    )
}