import { useState } from "react";
import { SearchComponent } from "../components/shared/SearchComponent";
import { ServicesFilter } from "../components/ServicesFilter";
import { ServicesFeatured } from "../components/services/ServicesFeatured";
import "../styles/home/home.css";

const Home = () => {
  const [filteredServices, setFilteredServices] = useState([]);

  return (
    <main className="mainContainer">
      {/* Pasamos la función de actualización a SearchComponent */}
      <SearchComponent onSearch={setFilteredServices} />

      <div style={{ border: "1px solid #000000", padding: "30px 50px" }}>
        <ServicesFilter />
      </div>

      <div style={{ marginTop: "22px" }}>
        {/* Pasamos los resultados filtrados a ServicesFeatured */}
        <ServicesFeatured services={filteredServices} />
      </div>
    </main>
  );
};

export default Home;
