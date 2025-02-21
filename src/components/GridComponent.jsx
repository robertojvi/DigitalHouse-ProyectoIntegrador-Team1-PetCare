
import React, { useEffect, useState } from 'react'
import { ServiceCard } from './cards/ServiceCard'
import { GridContainer } from './styled-components/GridComponent.styles';

export const GridComponent = () => {

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/data/profiles.json')
      .then(response => response.json())
      .then(data => setProfiles(data))
      .catch(error => console.error('Error loading profiles:', error));
  }, []);

  return (
    <GridContainer>
      {profiles.map(profile => (
        <ServiceCard
          key={profile.id}
          name={profile.name}
          serviceType={profile.serviceType}
          image={profile.image}
          rating={profile.rating}
          excerpt={profile.excerpt}
        />
      ))}
    </GridContainer>
  )
}
