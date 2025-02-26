// src/components/AddServiceForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/admin/registro.css";

/*
Criterios de Aceptación:
✓ CA1: El servicio debe visualizarse en el listado de servicios
✓ CA2: El panel de administración debe contener un botón "Agregar servicio"
✓ CA3: La página debe incluir campos para ingresar información relevante del servicio (nombre, descripción e imagen)
✓ CA4: Se debe poder subir una o más imágenes del servicio
✓ CA5: Se debe poder guardar el servicio y este debe ser agregado correctamente a la base de datos del sitio
✓ CA6: Si se intenta agregar un servicio con un nombre que ya existe, se debe mostrar un mensaje de error
*/

const AddServiceForm = () => {
	const [serviceName, setServiceName] = useState("");
	const [serviceDescription, setServiceDescription] = useState("");
	const [serviceCategory, setServiceCategory] = useState("");
	const [serviceImages, setServiceImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const [error, setError] = useState("");

	const handleNameChange = (e) => {
		setServiceName(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setServiceDescription(e.target.value);
	};

	const handleCategoryChange = (e) => {
		setServiceCategory(e.target.value);
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setServiceImages(files);

		const previews = files.map((file) => URL.createObjectURL(file));
		setPreviewImages(previews);
	};

	useEffect(() => {
		return () => {
			previewImages.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [previewImages]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", serviceName);
		formData.append("description", serviceDescription);
		formData.append("category", serviceCategory);
		for (let i = 0; i < serviceImages.length; i++) {
			formData.append("images", serviceImages[i]);
		}

		try {
			const response = await axios.post(
				"http://localhost:8080/api/v1/servicios",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			setServiceName("");
			setServiceDescription("");
			setServiceCategory("");
			setServiceImages([]);
			setPreviewImages([]);
			setError("");

			alert("Servicio agregado con éxito!");
		} catch (err) {
			if (
				err.response &&
				err.response.data &&
				err.response.data.error === "Nombre ya en uso"
			) {
				setError("El nombre del servicio ya está en uso.");
			} else {
				setError("Hubo un error al agregar el servicio.");
			}
		}
	};

	return (
		<div className="mainContainer">
			<h2 className="title">Agregar Servicio</h2>
			<form onSubmit={handleSubmit} className="form">
				<div>
					<label className="label">Nombre del Servicio</label>
					<input
						type="text"
						value={serviceName}
						onChange={handleNameChange}
						required
						className="input"
						placeholder="Ingrese el nombre del servicio"
					/>
				</div>
				<div>
					<label className="label">Categoría</label>
					<select
						value={serviceCategory}
						onChange={handleCategoryChange}
						required
						className="input"
					>
						<optgroup label="En Personas">
							<option value="Cuidadores">Cuidadores</option>
							<option value="Peluqueros">Peluqueros</option>
							<option value="Paseadores">Paseadores</option>
							<option value="Veterinarios y/o expertos">
								Veterinarios y/o expertos
							</option>
						</optgroup>
						<optgroup label="En Servicios">
							<option value="Cuidado en casa">Cuidado en casa</option>
							<option value="Spa">Spa</option>
							<option value="Paseos">Paseos</option>
							<option value="Asesorías">Asesorías</option>
						</optgroup>
					</select>
				</div>
				<div>
					<label className="label">Descripción</label>
					<textarea
						value={serviceDescription}
						onChange={handleDescriptionChange}
						required
						className="input"
						placeholder="Ingrese la descripción del servicio"
						rows="4"
					/>
				</div>
				<div>
					<label className="label">Imágenes del Servicio</label>
					<label className="fileInputLabel">
						Seleccionar Imágenes
						<input
							type="file"
							onChange={handleImageChange}
							multiple
							accept="image/*"
							className="fileInput"
							required
						/>
					</label>
					<div className="imagePreviewContainer">
						{previewImages.map((preview, index) => (
							<div key={index} className="imagePreview">
								<img src={preview} alt={`Vista previa ${index + 1}`} />
							</div>
						))}
					</div>
				</div>
				{error && <div className="error">{error}</div>}
				<button type="submit" className="button">
					Guardar Servicio
				</button>
			</form>
		</div>
	);
};

export default AddServiceForm;
