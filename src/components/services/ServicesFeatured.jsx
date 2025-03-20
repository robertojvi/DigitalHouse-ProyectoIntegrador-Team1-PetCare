import { useNavigate } from "react-router-dom";
import { TitleComponent } from "../shared/TitleComponent";
import { GridComponent } from "../GridComponent";

export const ServicesFeatured = ({ services }) => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate(`/service/${service.idServicio}`, {
      state: { selectedService: service },
    });
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <TitleComponent title={"Recomendados"} />
      <GridComponent onServiceClick={handleServiceClick} services={services} />
    </div>
  );
};
