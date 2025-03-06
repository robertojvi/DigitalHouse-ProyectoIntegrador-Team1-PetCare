import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ServiceDetailImagesGrid from "../components/services/ServiceDetailImagesGrid";
import { ServiceDetailInfo } from "../components/services/ServiceDetailInfo";
import arrowLeft from "../images/arrow-left.png";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
        }}
      >
        <img
          src={arrowLeft}
          alt="Volver"
          style={{
            width: "30px",
            height: "30px",
          }}
          onClick={() => navigate("/")}
        />
      </div>
      <ServiceDetailImagesGrid images={service.images} />
      <ServiceDetailInfo serviceInfo={service} />
    </div>
  );
};

export default ServiceDetail;
