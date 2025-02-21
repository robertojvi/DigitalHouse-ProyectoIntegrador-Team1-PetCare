
import React from 'react'
import { TitleComponent } from './shared/TitleComponent'
import { GridComponent } from './GridComponent'

export const RecommendedServices = () => {
  return (
    <div>
        <TitleComponent title={"Categorías"}/>
        <TitleComponent title={"Recomendados"}/>
        <GridComponent/>
    </div>
  )
}
