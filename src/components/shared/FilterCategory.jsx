import React from 'react'
import { FilterCategoryContainer, FilterCategoryLink } from './styled-components/FilterCategory.styles'
import { getAppUrl } from '../../services/getAppUrl'

export const FilterCategory = ({ name, icon, id }) => {

    return (
        <FilterCategoryContainer>
            <FilterCategoryLink href={`${getAppUrl}/categories/${id+1}`}>
            <img src={icon} alt={`${name} icon`} />
            <p>{name}</p>
            </FilterCategoryLink>
        </FilterCategoryContainer>
    )
}