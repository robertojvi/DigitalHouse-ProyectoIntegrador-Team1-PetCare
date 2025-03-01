import React, { useState } from "react";
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
`;

const Input = styled.input`
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
`;

const TextArea = styled.textarea`
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
	min-height: 100px;
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

const AddProductForm = ({ onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
		onClose();
	};

	return (
		<>
			<Overlay onClick={onClose} />
			<FormContainer>
				<h2>Añadir Nuevo Producto/Servicio</h2>
				<Form onSubmit={handleSubmit}>
					<Input
						type="text"
						placeholder="Nombre del producto"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						required
					/>
					<TextArea
						placeholder="Descripción"
						value={formData.description}
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
						required
					/>
					<Input
						type="number"
						placeholder="Precio"
						value={formData.price}
						onChange={(e) =>
							setFormData({ ...formData, price: e.target.value })
						}
						required
					/>
					<Input
						type="text"
						placeholder="Categoría"
						value={formData.category}
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
						required
					/>
					<Input
						type="url"
						placeholder="URL de la imagen"
						value={formData.image}
						onChange={(e) =>
							setFormData({ ...formData, image: e.target.value })
						}
						required
					/>
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
		</>
	);
};

export default AddProductForm;
