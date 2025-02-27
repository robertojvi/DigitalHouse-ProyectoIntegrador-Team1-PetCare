import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ServiceDetailImagesGrid from "../components/services/ServiceDetailImagesGrid";
import { ServiceDetailInfo } from "../components/services/ServiceDetailInfo";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Simulating API endpoint with local JSON
        const response = await axios.get("/src/data/services.json");
        const foundService = response.data.services.find(
          (s) => s.id === parseInt(id)
        );

        if (foundService) {
          setService(foundService);
        } else {
          throw new Error("Service not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="mainContainer">
      {/* <h2><PiPawPrintLight /> Servicio</h2> */}
      <ServiceDetailImagesGrid images={service.images} />
      <ServiceDetailInfo serviceInfo={service} />
    </div>
  );
};

export default ServiceDetail;
