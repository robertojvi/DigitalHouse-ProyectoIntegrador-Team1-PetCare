import React from 'react'
import { TitleContainer, Icon, Title } from './styled-components/TitleComponents.styles'
import pawprint from '../../assets/icons/pawprint.svg'

export const TitleComponent = ({title}) => {
  return (
    <TitleContainer>
        <Icon src={pawprint} alt="Pawprint icon" />
        <Title>{title}</Title>
    </TitleContainer>
  )
}
