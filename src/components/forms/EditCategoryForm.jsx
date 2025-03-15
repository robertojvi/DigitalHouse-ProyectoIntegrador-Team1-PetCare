import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";

const EditCategoryForm = ({ category, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		nombre: "",
	});

	useEffect(() => {
		if (category) {
			setFormData({
				nombre: category.nombre || "",
			});
		}
	}, [category]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

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
