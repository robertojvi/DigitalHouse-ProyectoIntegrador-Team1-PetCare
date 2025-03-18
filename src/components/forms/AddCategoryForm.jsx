import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";

const AddCategoryForm = ({ onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		nombre: "",
		descripcion: "",
	});
	const [imagen, setImagen] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImagen(file);

			// Create a preview URL for the selected image
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitting category form data");

		// Validate form inputs
		if (!formData.nombre.trim()) {
			alert("Por favor ingrese un nombre para la categoría");
			return;
		}

		// Create FormData object to match the API requirements
		const submitFormData = new FormData();

		// Log what we're sending
		console.log("Category data to send:", {
			nombre: formData.nombre,
			descripcion: formData.descripcion || "",
		});

		// Create JSON string for 'datos' key containing nombre and descripcion
		const datosJson = JSON.stringify({
			nombre: formData.nombre,
			descripcion: formData.descripcion || "",
		});

		// Add the 'datos' key with the JSON string
		submitFormData.append("datos", datosJson);

		// Also add direct fields for APIs that might expect them
		submitFormData.append("nombre", formData.nombre);
		submitFormData.append("descripcion", formData.descripcion || "");

		// Add the imagen file if it exists
		if (imagen) {
			submitFormData.append("imagen", imagen);
			console.log("Adding image to form data");
		} else {
			console.log("No image selected");
		}

		// Submit the form data
		onSubmit(submitFormData);
	};

	return (
		<div className="form-overlay">
			<div className="form-container">
				<h2>Agregar Nueva Categoría</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Nombre:</label>
						<input
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
					</div>

					<div className="form-group">
						<label>Descripción:</label>
						<textarea
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
					</div>

					<div className="form-group">
						<label>Imagen:</label>
						<div className="image-upload-container">
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								style={{ display: "none" }}
								ref={fileInputRef}
							/>
							<button
								type="button"
								onClick={() => fileInputRef.current.click()}
								className="upload-button"
								style={{
									backgroundColor: "#F2BE5E",
									color: "#FFFEFF",
									borderRadius: "20px",
									padding: "8px 16px",
									marginBottom: "10px",
								}}
							>
								Seleccionar Imagen
							</button>

							{imagePreview && (
								<div className="image-preview">
									<img
										src={imagePreview}
										alt="Vista previa"
										style={{
											maxWidth: "100%",
											maxHeight: "200px",
											marginTop: "10px",
											borderRadius: "8px",
										}}
									/>
								</div>
							)}
						</div>
					</div>

					<div className="form-buttons">
						<button
							type="submit"
							style={{
								backgroundColor: "#F2BE5E",
								color: "#FFFEFF",
								borderRadius: "20px",
							}}
						>
							Guardar
						</button>
						<button
							type="button"
							onClick={onClose}
							style={{ borderRadius: "20px" }}
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

AddCategoryForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default AddCategoryForm;
