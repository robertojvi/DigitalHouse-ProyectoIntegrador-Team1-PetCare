import { useState, useEffect } from "react";
import "../../styles/forms/formStyles.css";

const EditCategoryForm = ({ category, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		id: "",
		nombre: "",
	});

	useEffect(() => {
		if (category) {
			setFormData({
				id: category.id,
				nombre: category.nombre,
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
						<button type="submit">Actualizar</button>
						<button type="button" onClick={onClose}>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditCategoryForm;
