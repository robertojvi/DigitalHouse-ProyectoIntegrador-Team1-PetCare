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
		imagenUrl: null,
	});
	const [previewImage, setPreviewImage] = useState(null);
	const [fileSelected, setFileSelected] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate form before submitting
		if (!formData.nombre.trim()) {
			alert("El nombre de la categoría es obligatorio");
			return;
		}

		const data = new FormData();

		// Create a JSON object containing nombre and descripcion
		const categoryData = {
			nombre: formData.nombre.trim(),
			descripcion: formData.descripcion.trim(),
		};

		// Append the JSON data as a string with the key 'datos'
		data.append("datos", JSON.stringify(categoryData));

		// Only append file if one was selected
		if (formData.imagenUrl) {
			// Check file size (limit to 5MB for example)
			if (formData.imagenUrl.size > 5 * 1024 * 1024) {
				alert("La imagen es demasiado grande. El tamaño máximo es 5MB.");
				return;
			}

			// Check file type
			const allowedTypes = [
				"image/jpeg",
				"image/png",
				"image/gif",
				"image/webp",
			];
			if (!allowedTypes.includes(formData.imagenUrl.type)) {
				alert("Tipo de archivo no permitido. Use JPEG, PNG, GIF o WEBP.");
				return;
			}

			// If all checks pass, append the file with the key name 'imagen' as expected by the API
			data.append("imagen", formData.imagenUrl);
			console.log(
				"Image file appended with key 'imagen':",
				formData.imagenUrl.name
			);
		}

		// Log what we're about to send
		console.log("About to submit form with data:");
		for (let [key, value] of data.entries()) {
			console.log(
				`${key}: ${value instanceof File ? `File: ${value.name}` : value}`
			);
		}

		onSubmit(data);
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];

			// Log file details for debugging
			console.log("Selected file:", {
				name: selectedFile.name,
				type: selectedFile.type,
				size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
			});

			setFormData({ ...formData, imagenUrl: selectedFile });
			setFileSelected(true);

			// Create a preview URL for the selected image
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(selectedFile);
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
						<Label
							className="fileInputLabel"
							style={{
								backgroundColor: "#314549",
								color: "#FFFFFF",
								padding: "8px 16px",
								borderRadius: "20px",
								cursor: "pointer",
								display: "inline-block",
								marginTop: "8px",
								width: "fit-content",
								minWidth: "120px",
								textAlign: "center",
							}}
						>
							{fileSelected ? "Cambiar Imagen" : "Seleccionar Imagen"}
							<input
								type="file"
								onChange={handleFileChange}
								accept="image/*"
								style={{ display: "none" }}
							/>
						</Label>

						{/* Preview of selected image */}
						{previewImage && (
							<div style={{ marginTop: "10px" }}>
								<img
									src={previewImage}
									alt="Vista previa"
									style={{
										maxWidth: "100%",
										maxHeight: "200px",
										borderRadius: "8px",
									}}
								/>
								<p style={{ fontSize: "0.8rem", marginTop: "5px" }}>
									{formData.imagenUrl?.name}
								</p>
							</div>
						)}
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
