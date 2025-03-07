import { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";

const AddCategoryForm = ({ onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		nombre: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
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
					<div className="form-buttons">
						<button type="submit">Guardar</button>
						<button type="button" onClick={onClose}>
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

