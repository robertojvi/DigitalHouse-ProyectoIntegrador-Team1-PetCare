// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const FormContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	width: 90%;
	max-width: 500px;
	z-index: 1000;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Input = styled.input`
	width: 100%;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
	box-sizing: border-box;
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
	min-height: 100px;
	box-sizing: border-box;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`;

const Button = styled.button`
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&.cancel {
		background: #ddd;
	}

	&.submit {
		background: #f2be5e;
		color: white;
	}
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const AddProductForm = ({ onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});
	
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
		if (!formData.description.trim()) newErrors.description = "La descripción es requerida";
		if (!formData.price) newErrors.price = "El precio es requerido";
		if (formData.price && formData.price <= 0) newErrors.price = "El precio debe ser mayor a 0";
		if (!formData.category.trim()) newErrors.category = "La categoría es requerida";
		if (!formData.image.trim()) newErrors.image = "La imagen es requerida";
		if (formData.image && !formData.image.match(/^https?:\/\/.+\..+/)) {
			newErrors.image = "URL de imagen inválida";
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
			await onSubmit(formData);
			onClose();
		} catch (error) {
			console.error('Error al guardar:', error);
			setErrors({ submit: "Error al guardar el producto" });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Overlay onClick={onClose} />
			<FormContainer>
				<h2>Añadir Nuevo Producto/Servicio</h2>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Input
							type="text"
							placeholder="Nombre del producto"
							value={formData.name}
							onChange={(e) => {
								setFormData({ ...formData, name: e.target.value });
								setErrors({ ...errors, name: "" });
							}}
							required
						/>
						{errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
						</FormGroup>
					
					<FormGroup>
						<TextArea
							placeholder="Descripción"
							value={formData.description}
							onChange={(e) => {
								setFormData({ ...formData, description: e.target.value });
								setErrors({ ...errors, description: "" });
							}}
							required
						/>
						{errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
						</FormGroup>

					<FormGroup>
						<Input
							type="number"
							placeholder="Precio"
							value={formData.price}
							onChange={(e) => {
								setFormData({ ...formData, price: e.target.value });
								setErrors({ ...errors, price: "" });
							}}
							required
						/>
						{errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
						</FormGroup>

					<FormGroup>
						<Input
							type="text"
							placeholder="Categoría"
							value={formData.category}
							onChange={(e) => {
								setFormData({ ...formData, category: e.target.value });
								setErrors({ ...errors, category: "" });
							}}
							required
						/>
						{errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
						</FormGroup>

					<FormGroup>
						<Input
							type="url"
							placeholder="URL de la imagen"
							value={formData.image}
							onChange={(e) => {
								setFormData({ ...formData, image: e.target.value });
								setErrors({ ...errors, image: "" });
							}}
							required
						/>
						{errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
						</FormGroup>

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
		</>
	);
};

AddProductForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default AddProductForm;
