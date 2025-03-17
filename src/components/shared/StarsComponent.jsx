import React from 'react'
import Star from "../../assets/icons/Star.svg"

export const StarsComponent = ({rating}) => {
  return (
    <div style={{ display: 'flex', gap: '0px' }}>
        {Array.from({ length: rating }, (_, index) => (
        <img key={index} src={Star} alt="Star" height={40} />
      ))}
    </div>
  )
}
