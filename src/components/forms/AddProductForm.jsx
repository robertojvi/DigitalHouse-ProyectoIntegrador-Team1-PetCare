import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { crearServicio } from "../../services/serviciosService";
import { obtenerCategorias } from "../../services/categoriasService";
import petCareLogo from "../../images/pet-care-logo-v2.png";

const FormWrapper = styled.div`
	font-family: "Poppins", sans-serif;
`;

const FormContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	width: 90%;
	max-width: 500px;
	z-index: 1000;
	font-family: inherit;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Input = styled.input`
	width: 100%;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
	box-sizing: border-box;
	font-family: inherit;
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
	min-height: 100px;
	box-sizing: border-box;
	font-family: inherit;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`;

const Button = styled.button`
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&.cancel {
		background: #ddd;
	}

	&.submit {
		background: #f2be5e;
		color: white;
	}
	font-family: inherit;
`;

const ErrorMessage = styled.span`
	color: red;
	font-size: 12px;
	margin-top: 4px;
	font-family: inherit;
`;

const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 20px;

	img {
		height: 60px;
		object-fit: contain;
	}
`;

const Label = styled.label`
	font-family: "Poppins", sans-serif;
	font-size: 14px;
	font-weight: 700;
	margin-bottom: 4px;
	color: #333;
	font-family: inherit;
`;

const Select = styled.select`
	width: 100%;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
	box-sizing: border-box;
	background-color: white;
	font-family: inherit;

	option:first-child {
		font-weight: 700;
	}
`;

const AddProductForm = ({ onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [categorias, setCategorias] = useState([]);
	const [isLoadingCategorias, setIsLoadingCategorias] = useState(true);

	const validateForm = () => {
		const newErrors = {};
		const numberPrice = Number(formData.price);

		if (!formData.name.trim()) {
			newErrors.name = "El nombre es requerido";
		} else if (formData.name.length < 3) {
			newErrors.name = "El nombre debe tener al menos 3 caracteres";
		}

		if (!formData.description.trim()) {
			newErrors.description = "La descripción es requerida";
		} else if (formData.description.length < 10) {
			newErrors.description =
				"La descripción debe tener al menos 10 caracteres";
		}

		if (!formData.price) {
			newErrors.price = "El precio es requerido";
		} else if (isNaN(numberPrice) || numberPrice <= 0) {
			newErrors.price = "El precio debe ser un número mayor a 0";
		}

		if (!formData.image.trim()) {
			newErrors.image = "La URL de la imagen es requerida";
		} else {
			try {
				new URL(formData.image);
			} catch {
				newErrors.image = "URL de imagen inválida";
			}
		}

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validateForm();

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsSubmitting(true);
		try {
			const nuevoServicio = await crearServicio(formData);
			await onSubmit(nuevoServicio);
			onClose();
		} catch (error) {
			setErrors({
				submit: error.message || "Error al guardar el servicio",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		const cargarCategorias = async () => {
			try {
				const data = await obtenerCategorias();
				setCategorias(data);
			} catch (error) {
				setErrors((prev) => ({
					...prev,
					category: "Error al cargar categorías",
				}));
			} finally {
				setIsLoadingCategorias(false);
			}
		};

		cargarCategorias();
	}, []);

	return (
		<FormWrapper>
			<Overlay onClick={onClose} />
			<FormContainer>
				<LogoContainer>
					<img src={petCareLogo} alt="PetCare Logo" />
				</LogoContainer>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="productName">Nombre del producto</Label>
						<Input
							id="productName"
							type="text"
							placeholder="Nombre del producto"
							value={formData.name}
							onChange={(e) => {
								setFormData({ ...formData, name: e.target.value });
								setErrors({ ...errors, name: "" });
							}}
							required
						/>
						{errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
					</FormGroup>

					<FormGroup>
						<Label htmlFor="productDescription">Descripción</Label>
						<TextArea
							id="productDescription"
							placeholder="Descripción"
							value={formData.description}
							onChange={(e) => {
								setFormData({ ...formData, description: e.target.value });
								setErrors({ ...errors, description: "" });
							}}
							required
						/>
						{errors.description && (
							<ErrorMessage>{errors.description}</ErrorMessage>
						)}
					</FormGroup>

					<FormGroup>
						<Input
							type="number"
							placeholder="Precio"
							value={formData.price}
							onChange={(e) => {
								setFormData({ ...formData, price: e.target.value });
								setErrors({ ...errors, price: "" });
							}}
							required
						/>
						{errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
					</FormGroup>

					<FormGroup>
						<Select
							id="productCategory"
							value={formData.category}
							onChange={(e) => {
								setFormData({ ...formData, category: e.target.value });
								setErrors({ ...errors, category: "" });
							}}
							required
							disabled={isLoadingCategorias}
						>
							<option value="">Categorías</option>
							{categorias.map((categoria) => (
								<option key={categoria.id} value={categoria.id}>
									{categoria.nombre}
								</option>
							))}
						</Select>
						{errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
					</FormGroup>

					<FormGroup>
						<Input
							type="url"
							placeholder="URL de la imagen"
							value={formData.image}
							onChange={(e) => {
								setFormData({ ...formData, image: e.target.value });
								setErrors({ ...errors, image: "" });
							}}
							required
						/>
						{errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
					</FormGroup>

					{errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

					<ButtonGroup>
						<Button type="button" className="cancel" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit" className="submit" disabled={isSubmitting}>
							{isSubmitting ? "Guardando..." : "Guardar"}
						</Button>
					</ButtonGroup>
				</Form>
			</FormContainer>
		</FormWrapper>
	);
};

AddProductForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default AddProductForm;
