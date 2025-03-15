import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/forms/formStyles.css";
import { FormGroup, Select } from "../../styles/AddProductForm.styles";

const EditUserRoleForm = ({ user, onClose, onSubmit }) => {
	console.log("USER", user);
	const [formData, setFormData] = useState({
		idUser: "",
		nombre: "",
		role: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				idUser: user.idUsuario,
				nombre: user.nombre,
				role: user.role,
			});
		}
	}, [user]);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			role: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div className="form-overlay">
			<div className="form-container">
				<h2>Editar rol de {formData.nombre}</h2>
				<form onSubmit={handleSubmit}>
					<FormGroup>
						<Select
							value={formData.role}
							style={{ width: "100%" }}
							onChange={handleChange}
						>
							<option value="">Seleccione un rol</option>
							<option value="CLIENTE">Cliente</option>
							<option value="ADMIN">Administrador</option>
						</Select>
					</FormGroup>

					<div className="form-buttons">
						<button
							type="submit"
							style={{
								backgroundColor: "#F2BE5E",
								color: "#FFFEFF",
								borderRadius: "20px",
							}}
						>
							Actualizar
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
EditUserRoleForm.propTypes = {
	user: PropTypes.shape({
		idUsuario: PropTypes.number.isRequired,
		nombre: PropTypes.string.isRequired,
	}),
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default EditUserRoleForm;
