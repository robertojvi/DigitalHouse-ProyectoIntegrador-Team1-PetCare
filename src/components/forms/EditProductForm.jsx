import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { obtenerCategorias } from "../../services/categoriasService";
import { crearCategoria } from "../../services/categoriasService"; // Add this import
import {
	FormWrapper,
	FormContainer,
	Overlay,
	Form,
	FormGroup,
	Input,
	TextArea,
	ButtonGroup,
	Button,
	ErrorMessage,
	LogoContainer,
	Label,
	Select,
} from "../../styles/AddProductForm.styles";
import petCareLogo from "../../images/pet-care-logo-v2.png";
import AddCategoryForm from "./AddCategoryForm";

const EditProductForm = ({ service, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		name: service.nombre,
		description: service.descripcion,
		price: service.precio,
		category: service.categoria.idCategoria,
		images: service.imagenes || [],
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [categorias, setCategorias] = useState([]);
	const [showAddCategory, setShowAddCategory] = useState(false);

	useEffect(() => {
		const fetchCategorias = async () => {
			try {
				const data = await obtenerCategorias();
				setCategorias(data);
			} catch (error) {
				setErrors((prev) => ({
					...prev,
					category: `Error al cargar las categorías: ${error.message}`,
				}));
			}
		};

		fetchCategorias();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate category selection
		if (!formData.category) {
			setErrors({
				category: "Por favor seleccione una categoría válida",
			});
			return;
		}

		setIsSubmitting(true);

		try {
			await onSubmit({
				idServicio: service.idServicio,
				nombre: formData.name,
				descripcion: formData.description,
				precio: formData.price,
				categoriaId: formData.category,
				imagenes: formData.images,
			});

			// Close the form first
			onClose();

			// Set selected menu - simpler approach
			localStorage.setItem("adminSelectedMenu", "productos");

			// Try different refresh methods
			if (typeof window.refreshProductList === "function") {
				console.log("Refreshing product list via global function");
				window.refreshProductList();
			} else if (typeof window.refreshServiceList === "function") {
				console.log("Refreshing service list via global function");
				window.refreshServiceList();
			}

			// Also dispatch a custom event for components listening to it
			const event = new CustomEvent("serviceUpdated", {
				detail: { serviceId: service.idServicio },
			});
			window.dispatchEvent(event);
		} catch (error) {
			setErrors({
				submit: error.message || "Error al actualizar el servicio",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleNewCategory = async (formData) => {
		try {
			console.log("Processing new category submission...");

			// Call the API to create a new category
			const newCategory = await crearCategoria(formData);
			console.log("New category created:", newCategory);

			// More flexible identification of ID and name
			let categoryId = null;
			let categoryName = null;

			// Check various possible ID fields
			if (newCategory.idCategoria !== undefined)
				categoryId = newCategory.idCategoria;
			else if (newCategory.id !== undefined) categoryId = newCategory.id;
			else if (newCategory._id !== undefined) categoryId = newCategory._id;

			// Check various possible name fields
			if (newCategory.nombre !== undefined) categoryName = newCategory.nombre;
			else if (newCategory.name !== undefined) categoryName = newCategory.name;

			if (!categoryId) {
				console.error("Could not find valid ID in category data:", newCategory);
				// For testing, generate a temporary ID (remove this in production)
				categoryId = `temp_${Date.now()}`;
				console.warn("Generated temporary ID for testing:", categoryId);
			}

			if (!categoryName) {
				// Default name if none exists
				categoryName = "Nueva Categoría";
			}

			// Update the categories list with the new category
			setCategorias((prevCategorias) => {
				// Create a properly structured category object
				const formattedCategory = {
					idCategoria: categoryId,
					nombre: categoryName,
				};

				console.log("Adding new category to list:", formattedCategory);

				// Check if the category already exists in the list
				const exists = prevCategorias.some(
					(cat) => cat.idCategoria === categoryId
				);

				if (exists) {
					return prevCategorias;
				}

				return [...prevCategorias, formattedCategory];
			});

			// Update the form data to select the new category
			setFormData((prev) => ({
				...prev,
				category: categoryId.toString(),
				categoryName: categoryName,
			}));

			// Close the add category form
			setShowAddCategory(false);

			// Show a success message
			alert(`Categoría "${categoryName}" creada exitosamente!`);

			return true;
		} catch (error) {
			console.error("Error handling new category:", error);
			alert(`Error al crear la categoría: ${error.message}`);
			return false;
		}
	};

	const handleCategoryChange = (e) => {
		const selectedValue = e.target.value;
		if (selectedValue === "new") {
			setShowAddCategory(true);
		} else {
			setFormData((prev) => ({
				...prev,
				category: selectedValue,
			}));
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
						<Label>Nombre del servicio</Label>
						<Input
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Descripción</Label>
						<TextArea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Precio</Label>
						<Input
							type="number"
							value={formData.price}
							onChange={(e) =>
								setFormData({ ...formData, price: e.target.value })
							}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Categoría</Label>
						<Select
							value={formData.category}
							onChange={handleCategoryChange}
							style={{ width: "100%" }}
						>
							<option value="">Seleccione una categoría</option>
							{categorias.map((cat) => (
								<option key={cat.idCategoria} value={cat.idCategoria}>
									{cat.nombre}
								</option>
							))}
							<option value="new" style={{ fontWeight: "bold" }}>
								Nueva Categoría
							</option>
						</Select>
						{errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
					</FormGroup>

					<ButtonGroup>
						<Button type="button" className="cancel" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit" className="submit" disabled={isSubmitting}>
							{isSubmitting ? "Guardando..." : "Guardar cambios"}
						</Button>
					</ButtonGroup>
				</Form>
			</FormContainer>
			{showAddCategory && (
				<AddCategoryForm
					onClose={() => setShowAddCategory(false)}
					onSubmit={handleNewCategory}
				/>
			)}
		</FormWrapper>
	);
};

EditProductForm.propTypes = {
	service: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default EditProductForm;
