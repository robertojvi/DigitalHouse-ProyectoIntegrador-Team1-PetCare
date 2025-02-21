
import React, { useEffect, useState } from 'react'
import { ServiceCard } from './cards/ServiceCard'

export const GridComponent = () => {

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/data/profiles.json')
      .then(response => response.json())
      .then(data => setProfiles(data))
      .catch(error => console.error('Error loading profiles:', error));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(45%, 2fr))', gap: '20px', columnGap: "100px", marginTop:"20px"}}>
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
    </div>
  )
}
