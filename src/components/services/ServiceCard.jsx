import PropTypes from 'prop-types';
import '../../styles/services/serviceCard.css';

const ServiceCard = ({ name, description, image }) => {
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={image} alt={name} />
      </div>
      <div className="service-content">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ServiceCard; 