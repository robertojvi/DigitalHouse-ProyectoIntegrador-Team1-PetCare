import { useState } from "react";
import PropTypes from "prop-types";
import {
  FormWrapper,
  FormContainer,
  Overlay,
  Form,
  FormGroup,
  Input,
  ButtonGroup,
  Button,
  LogoContainer,
  Label,
} from "../../styles/AddProductForm.styles";
import petCareLogo from "../../images/pet-care-logo-v2.png";

const AddFeatureForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    icon: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData with just the nombre field for now
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('nombre', formData.nombre.trim());
    
    // For debugging
    console.log('Submitting feature:', {
      nombre: formData.nombre.trim()
    });
    
    onSubmit(formDataToSubmit);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, icon: e.target.files[0] });
    }
  };

  return (
    <FormWrapper>
      <Overlay onClick={onClose} />
      <FormContainer>
        <LogoContainer>
          <img src={petCareLogo} alt="PetCare Logo" />
        </LogoContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre de la característica:</Label>
            <Input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Icono:</Label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="submit">
              Guardar
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

AddFeatureForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddFeatureForm;
