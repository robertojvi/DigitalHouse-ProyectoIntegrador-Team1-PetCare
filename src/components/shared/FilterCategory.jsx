import React from 'react'
import { FilterCategoryContainer } from './styled-components/FilterCategory.styles'

export const FilterCategory = ({ name, icon }) => {
    return (
        <FilterCategoryContainer>
            <img src={icon} alt={`${name} icon`} />
            <p>{name}</p>
        </FilterCategoryContainer>
    )
}