import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";
import {
  FormWrapper,
  FormContainer,
  Overlay,
  Form,
  FormGroup,
  ButtonGroup,
  Button,
  LogoContainer,
  Label,
  Select,
} from "../../styles/AddProductForm.styles";
import petCareLogo from "../../images/pet-care-logo-v2.png";

const EditUserRoleForm = ({ user, onClose, onSubmit }) => {
  console.log("USER", user);
  const [formData, setFormData] = useState({
    idUser: "",
    nombre: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        idUser: user.id,
        nombre: user.nombre,
        role: user.rol,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.idUser) {
      console.error("ID de usuario no disponible");
      return;
    }
    onSubmit(formData);
  };

  return (
    <FormWrapper>
      <Overlay onClick={onClose} />
      <FormContainer>
        <LogoContainer>
          <img src={petCareLogo} alt="PetCare Logo" />
        </LogoContainer>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ color: "#314549" }}>Editar rol de {formData.nombre}</h2>
          <FormGroup>
            <Label>Rol:</Label>
            <Select
              value={formData.role}
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <option value="">Seleccione un rol</option>
              <option value="CLIENTE">Cliente</option>
              <option value="ADMIN">Administrador</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="submit">
              Actualizar
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

EditUserRoleForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default EditUserRoleForm;
