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

const AddCategoryForm = ({ onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		nombre: "",
		descripcion: "",
		imagenUrl: null
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData();
		const datos = {
		 		"nombre": formData.nombre,
		 		"descripcion": formData.descripcion
		 	}
		data.append("datos", JSON.stringify(datos));
		if (formData.imagenUrl) {
			data.append("imagenUrl", formData.imagenUrl);
		}
		onSubmit(data);
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setFormData({ ...formData, imagenUrl: e.target.files[0] });
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
						<Label>Nombre:</Label>
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
						<Label>Descripción:</Label>
						<Input
							as="textarea"
							value={formData.descripcion}
							onChange={(e) =>
								setFormData({ ...formData, descripcion: e.target.value })
							}
							rows={4}
							placeholder="Descripción de la categoría"
						/>
					</FormGroup>

					<FormGroup>
						<Label>Imagen:</Label>
						<Label className="fileInputLabel" style={{
							backgroundColor: "#314549",
							color: "#FFFFFF",
							padding: "8px 16px",
							borderRadius: "20px",
							cursor: "pointer",
							display: "inline-block",
							marginTop: "8px",
							width: "fit-content",
							minWidth: "120px",
							textAlign: "center"
						}}>
							Seleccionar Imagen
							<input
								type="file"
								onChange={handleFileChange}
								accept="image/*"
								style={{ display: 'none' }}
							/>
						</Label>
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

AddCategoryForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default AddCategoryForm;
