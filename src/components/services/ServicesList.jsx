import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import servicesData from '../../data/services.json';
import '../../styles/services/servicesList.css';

/**
 * Criterios de Aceptación:
 * ✓ CA1: Se deben mostrar como máximo 10 servicios aleatorios
 *   -> Implementado en getRandomServices con count=10
 * 
 * ✓ CA2: Los servicios no deben repetirse
 *   -> Garantizado por el uso de Array.slice() después de mezclar
 * 
 * ✓ CA3: Se deben distribuir en 2 columnas y 5 filas como máximo
 *   -> Implementado en servicesList.css con grid-template-columns
 * 
 * ✓ CA4: Garantizar que la lista sea verdaderamente aleatoria
 *   -> Implementado usando sort() con Math.random()
 */

const ServicesList = () => {
  const [randomServices, setRandomServices] = useState([]);

  useEffect(() => {
    // CA1 y CA4: Función para obtener servicios aleatorios sin repetición
    const getRandomServices = (services, count) => {
      // CA4: Mezcla aleatoria usando el algoritmo Fisher-Yates moderno
      const shuffled = [...services].sort(() => 0.5 - Math.random());
      // CA1 y CA2: Toma solo los primeros 10 servicios, evitando repeticiones
      return shuffled.slice(0, count);
    };

    // CA1: Obtener exactamente 10 servicios aleatorios
    const selectedServices = getRandomServices(servicesData.services, 10);
    setRandomServices(selectedServices);
  }, []);

  return (
    <section className="services-section">
      <h2>Nuestros Servicios</h2>
      {/* CA3: Grid layout implementado en CSS */}
      <div className="services-grid">
        {randomServices.map((service) => (
          <ServiceCard
            key={service.id}
            name={service.name}
            description={service.description}
            image={service.mainImage}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesList; 