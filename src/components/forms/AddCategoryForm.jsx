import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";

const AddCategoryForm = ({ onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		nombre: "",
		descripcion: "",
		imagen: null,
	});
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({
				...formData,
				imagen: file,
			});

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

		// Create form data to handle image upload
		if (formData.imagen) {
			const submitData = new FormData();
			submitData.append("nombre", formData.nombre);
			submitData.append("descripcion", formData.descripcion);
			submitData.append("imagen", formData.imagen);
			onSubmit(submitData);
		} else {
			onSubmit(formData);
		}
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
