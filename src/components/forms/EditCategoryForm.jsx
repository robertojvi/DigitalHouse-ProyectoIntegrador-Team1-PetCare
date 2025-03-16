import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";

const EditCategoryForm = ({ category, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		idCategoria: "",
		nombre: "",
		descripcion: "",
		imagenUrl: "", // Added imagenUrl to the form data
	});

	useEffect(() => {
		if (category) {
			setFormData({
				idCategoria: category.idCategoria || "",
				nombre: category.nombre || "",
				descripcion: category.descripcion || "",
				imagenUrl: category.imagenUrl || "", // Preserve the imagenUrl
			});
		}
	}, [category]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitting with ID:", formData.idCategoria);
		onSubmit(formData);
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
		<div className="form-overlay">
			<div className="form-container">
				<h2>Editar Categoría</h2>
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

					{/* Display image using the correct imagenUrl field */}
					<div className="form-group">
						<label>Imagen:</label>
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

EditCategoryForm.propTypes = {
	category: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default EditCategoryForm;
