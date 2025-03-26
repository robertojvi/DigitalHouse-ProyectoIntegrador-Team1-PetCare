import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";
import {
  FormWrapper,
  FormContainer,
  Overlay,
  Form,
  FormGroup,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  LogoContainer,
  Label,
} from "../../styles/AddProductForm.styles";
import petCareLogo from "../../images/pet-care-logo-v2.png";

const EditCategoryForm = ({ category, onClose, onSubmit }) => {
  console.log("Initial category data:", category); // Debug log

  const [formData, setFormData] = useState({
    id_categoria: category.id || category.id_categoria, // Intentar ambos formatos de ID
    nombre: category.nombre || "",
    descripcion: category.descripcion || "",
    imagenUrl: category.imagenUrl || "",
  });

  useEffect(() => {
    console.log("Category received:", category);
    console.log("Category ID formats:", {
      id: category.id,
      id_categoria: category.id_categoria,
    });
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data before submit:", formData);

    const dataToSubmit = {
      ...formData,
      id_categoria: category.id || category.id_categoria, // Intentar ambos formatos de ID
    };

    console.log("Final data to submit:", dataToSubmit);
    onSubmit(dataToSubmit);
  };

  // Specific debug for imagenUrl field
  console.log("Category object:", category);
  console.log("Direct check - imagenUrl:", category?.imagenUrl);
  console.log("Direct check - imagen_url:", category?.imagen_url);
  console.log(
    "All fields in category:",
    category ? Object.keys(category).join(", ") : "No category"
  );

  // Look for any property that might contain image URL
  if (category) {
    Object.keys(category).forEach((key) => {
      if (
        typeof category[key] === "string" &&
        (key.includes("image") ||
          key.includes("imagen") ||
          category[key].includes("image") ||
          category[key].includes("jpg") ||
          category[key].includes("png"))
      ) {
        console.log(`Potential image field: ${key} = ${category[key]}`);
      }
    });
  }

  return (
    <FormWrapper>
      <Overlay onClick={onClose} />
      <FormContainer>
        <LogoContainer>
          <img src={petCareLogo} alt="PetCare Logo" />
        </LogoContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre:</Label>
            <Input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nombre: e.target.value,
                })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Descripción:</Label>
            <TextArea
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descripcion: e.target.value,
                })
              }
              rows={4}
              placeholder="Descripción de la categoría"
            />
          </FormGroup>

          <FormGroup>
            <Label>Imagen:</Label>
            <div className="image-display">
              {category && category.imagenUrl ? (
                <>
                  <img
                    src={category.imagenUrl}
                    alt={`Imagen de ${category.nombre}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    onLoad={() => console.log("Image loaded successfully")}
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        category.imagenUrl
                      );
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                  {/* Hidden input to store the imagenUrl value */}
                  <input
                    type="hidden"
                    name="imagenUrl"
                    value={formData.imagenUrl}
                  />
                </>
              ) : (
                <p>Esta categoría no tiene imagen</p>
              )}
            </div>
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

EditCategoryForm.propTypes = {
  category: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditCategoryForm;
