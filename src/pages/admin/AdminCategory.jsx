import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import "../../styles/admin/adminService.css";

// Components
import AdminCategoryList from "../../components/admin/AdminCategoryList";
import AddCategoryForm from "../../components/forms/AddCategoryForm";
import EditCategoryForm from "../../components/forms/EditCategoryForm";

// Images
import warningIcon from "../../images/warning.png";
import addPlusIcon from "../../images/add-plus.png";

const AdminCategory = ({ isInAdminLayout }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const { auth, logout } = useContext(AuthContext);

  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const API_URL = `${BASE_URL}/api/categorias`;

  const getAuthHeaders = () => {
    if (!auth || !auth.token) return null;
    return {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
  };

  const handleAddCategory = async (formData) => {
    const headers = getAuthHeaders();
    if (!headers) {
      logout();
      return;
    }

    try {
      // For FormData, we need to modify headers to handle multipart data
      // but remove Content-Type so boundary is set automatically
      const multipartHeaders = {
        ...headers.headers,
      };

      console.log("Sending category creation request with FormData");

      // Display FormData entries for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(API_URL, formData, {
        headers: multipartHeaders,
      });

      console.log("Category created successfully:", response.data);
      setShowAddForm(false);
      alert("Categoría creada exitosamente");

      // Reload category list
      if (window.refreshCategoryList) {
        window.refreshCategoryList();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating category:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(
          `Error al crear la categoría: ${
            error.response.data.mensaje || error.message
          }`
        );
      } else {
        setError("Error al crear la categoría: " + error.message);
      }
    }
  };

  const handleEditCategory = async (categoryData) => {
    const headers = getAuthHeaders();
    if (!headers) {
      logout();
      return;
    }

    // Check if ID is present in the data
    const categoryId = categoryData.id_categoria;
    if (!categoryId) {
      console.error("Missing category ID:", categoryData);
      setError("Error: ID de categoría faltante");
      return;
    }

    try {
      console.log("Sending update request:", {
        url: `${API_URL}/${categoryId}`,
        data: {
          nombre: categoryData.nombre,
          descripcion: categoryData.descripcion,
          imagenUrl: categoryData.imagenUrl, // Include the imagenUrl in the update
        },
        headers: headers.headers,
      });

      // Regular JSON data with imagenUrl included
      await axios.put(
        `${API_URL}/${categoryId}`,
        {
          nombre: categoryData.nombre,
          descripcion: categoryData.descripcion,
          imagenUrl: categoryData.imagenUrl, // Include the imagenUrl in the request
        },
        headers
      );

      setShowEditForm(false);
      setSelectedCategory(null);

      // Recargar la lista usando la función global de actualización
      if (window.refreshCategoryList) {
        window.refreshCategoryList();
      } else {
        // Si la función no está disponible, recargar la página
        window.location.reload();
      }

      alert("Categoría actualizada exitosamente");
    } catch (error) {
      console.error("Error updating category:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        setError(
          `Error al actualizar la categoría: ${
            error.response.data.mensaje || error.message
          }`
        );
      } else {
        setError("Error al actualizar la categoría: " + error.message);
      }
    }
  };

  return (
    <main className={`admin-container ${isInAdminLayout ? "in-layout" : ""}`}>
      <div className="mobile-message">
        <img src={warningIcon} alt="Warning" className="warning-icon" />
        <span>NO DISPONIBLE PARA MOBILE</span>
      </div>

      {!isInAdminLayout && (
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Inicio
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
          <Link to="/administracion" className="breadcrumb-link">
            Administración
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
          <span className="breadcrumb-current">Categorías</span>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="admin-content">
        <section className="admin-section">
          <div className="admin-header">
            <button
              className="adminService-admin-button"
              onClick={() => setShowAddForm(true)}
            >
              <span>Agregar Categoría</span>
              <img
                src={addPlusIcon}
                alt="Añadir"
                style={{
                  width: "15px",
                  height: "15px",
                  marginLeft: "8px",
                }}
              />
            </button>
          </div>

          {showAddForm && (
            <AddCategoryForm
              onClose={() => setShowAddForm(false)}
              onSubmit={handleAddCategory}
            />
          )}

          {showEditForm && selectedCategory && (
            <EditCategoryForm
              category={selectedCategory}
              onClose={() => {
                setShowEditForm(false);
                setSelectedCategory(null);
              }}
              onSubmit={handleEditCategory}
            />
          )}

          <AdminCategoryList
            onEdit={(category) => {
              console.log("Category being edited:", category);
              console.log("Category ID:", category.id);
              setSelectedCategory({
                ...category,
                id_categoria: category.id,
              });
              setShowEditForm(true);
            }}
          />
        </section>
      </div>
    </main>
  );
};

AdminCategory.propTypes = {
  isInAdminLayout: PropTypes.bool.isRequired,
};

export default AdminCategory;
