import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { crearServicio } from "../../services/serviciosService";
import petCareLogo from "../../images/pet-care-logo-v2.png";
import { obtenerCategorias } from "../../services/categoriasService";
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
  ErrorMessage,
  LogoContainer,
  Label,
  Select,
} from "../../styles/AddProductForm.styles";
import styled from "styled-components";

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  button {
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background: #314549;
  color: white;
  border-radius: 50px; // Updated to 50%
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    background: #253538; // Darker shade for hover state
  }
`;

const SideBySideContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  > ${FormGroup} {
    flex: 1;
  }
`;

const AddProductForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    categoryName: "", // Added to store category name
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [isLoadingCategorias, setIsLoadingCategorias] = useState(true);

  const validateForm = () => {
    const newErrors = {};
    const numberPrice = Number(formData.price);

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (formData.description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    if (!formData.price) {
      newErrors.price = "El precio es requerido";
    } else if (isNaN(numberPrice) || numberPrice <= 0) {
      newErrors.price = "El precio debe ser un número mayor a 0";
    }

    if (formData.images.length === 0) {
      newErrors.images = "Debe seleccionar al menos una imagen";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const imageUrls = await crearServicio(formData);

      const nuevoServicio = {
        nombre: formData.name,
        descripcion: formData.description,
        precio: formData.price,
        categoria: {
          id_categoria: parseInt(formData.category),
          nombre: formData.categoryName,
        },
        imagenes: imageUrls,
      };

      await onSubmit(nuevoServicio);
      alert("Servicio creado exitosamente!");
      setTimeout(() => {
        window.location.href = "/administracion/service";
        window.location.reload();
      }, 1000);
      onClose();
    } catch (error) {
      setErrors({
        submit: error.message || "Error al guardar el servicio",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setIsLoadingCategorias(true);
        console.log("Fetching categories...");
        const token = localStorage.getItem("token");
        console.log("Using token:", token);

        const data = await obtenerCategorias();
        console.log("Categories received:", data);
        setCategorias(data);
      } catch (error) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setErrors((prev) => ({
          ...prev,
          category: `Error al cargar las categorías: ${error.message}`,
        }));
      } finally {
        setIsLoadingCategorias(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
    setErrors({ ...errors, images: "" });
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Update the category selection handler
  const handleCategoryChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
      categoryName: selectedOption.text,
    }));
    setErrors({ ...errors, category: "" });
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
            <Label htmlFor="productName">Nombre del producto</Label>
            <Input
              id="productName"
              type="text"
              placeholder="Ingrese el nombre del producto"
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
                setErrors({ ...errors, name: "" });
              }}
              required
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="productDescription">Descripción</Label>
            <TextArea
              id="productDescription"
              placeholder="Ingrese la descripción"
              value={formData.description}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  description: e.target.value,
                });
                setErrors({ ...errors, description: "" });
              }}
              required
            />
            {errors.description && (
              <ErrorMessage>{errors.description}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="productPrice">Precio</Label>
            <Input
              id="productPrice"
              type="number"
              placeholder="Ingrese el Precio"
              value={formData.price}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  price: e.target.value,
                });
                setErrors({ ...errors, price: "" });
              }}
              required
            />
            {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
          </FormGroup>

          <SideBySideContainer>
            <FormGroup>
              <Select
                id="productCategory"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                disabled={isLoadingCategorias}
              >
                <option value="">Categoría</option>
                {categorias.map((category) => {
                  console.log("Rendering category:", category);
                  return (
                    <option
                      key={category.idCategoria}
                      value={category.idCategoria}
                    >
                      {category.nombre}
                    </option>
                  );
                })}
              </Select>
              {errors.category && (
                <ErrorMessage>{errors.category}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FileInputLabel>
                Seleccionar Imágenes
                <FileInput
                  id="productImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </FileInputLabel>
              {errors.images && <ErrorMessage>{errors.images}</ErrorMessage>}
            </FormGroup>
          </SideBySideContainer>

          {formData.images.length > 0 && (
            <ImagePreviewContainer>
              {formData.images.map((image, index) => (
                <ImagePreview key={index}>
                  <img src={image.preview} alt={`Preview ${index + 1}`} />
                  <button onClick={() => removeImage(index)}>×</button>
                </ImagePreview>
              ))}
            </ImagePreviewContainer>
          )}

          {errors.server && (
            <ErrorMessage
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {errors.server}
            </ErrorMessage>
          )}

          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

AddProductForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddProductForm;
