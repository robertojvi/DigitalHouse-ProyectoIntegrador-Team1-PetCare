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
	ErrorMessage,
	Label,
} from "../../styles/AddProductForm.styles";

const AddCategoryForm = ({ onClose, onSubmit }) => {
	const [nombre, setNombre] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!nombre.trim()) {
			setError("El nombre es requerido");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await fetch("http://localhost:8080/api/categorias", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ nombre }),
			});

			if (!response.ok) throw new Error("Error al crear la categoría");

			const newCategory = await response.json();
			onSubmit(newCategory);
			onClose();
		} catch (error) {
			setError(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<FormWrapper>
			<Overlay onClick={onClose} />
			<FormContainer style={{ 
				border: "2px solid #314549",
				position: "fixed",
				top: "50%",
				left: "calc(50% + 300px)", // Move form to the right
				transform: "translate(0, -50%)", // Only transform vertically
				maxWidth: "400px", // Smaller width for the category form
				width: "90%"
			}}>
				<Form onSubmit={handleSubmit}>
					<h2>Nueva Categoría</h2>
					<FormGroup>
						<Label>Nombre de la categoría</Label>
						<Input
							type="text"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							placeholder="Ingrese el nombre de la categoría"
						/>
						{error && <ErrorMessage>{error}</ErrorMessage>}
					</FormGroup>
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

AddCategoryForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default AddCategoryForm;
