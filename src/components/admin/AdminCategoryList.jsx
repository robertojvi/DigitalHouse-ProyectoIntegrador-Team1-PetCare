import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaPawSolid } from "react-icons/lia";

// Import image icons
import pencilIcon from "../../images/pencil.png"; // For edit button
import trashIcon from "../../images/trash-can.png"; // For delete button

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/api/categorias`;

const AdminCategoryList = ({ onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { auth, logout } = useContext(AuthContext);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    if (!auth || !auth.token) {
      logout();
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/categoria-list`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("Categories fetched from API:", response.data);
      // Log the first category to inspect its structure
      if (response.data && response.data.length > 0) {
        console.log("First category object:", response.data[0]);
        console.log(
          "Image URL field in first category:",
          response.data[0]?.imagenUrl
        );
      }
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Error al cargar las categorías");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [auth.token]);

  // Make fetchCategories available to parent
  useEffect(() => {
    if (window) {
      window.refreshCategoryList = fetchCategories;
    }
    return () => {
      if (window) {
        delete window.refreshCategoryList;
      }
    };
  }, []);

  // Make fetchCategories available globally
  useEffect(() => {
    window.refreshCategoryList = fetchCategories;
    return () => {
      delete window.refreshCategoryList;
    };
  }, [fetchCategories]); // Add fetchCategories as dependency

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setConfirmDelete(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!categoryToDelete) return;
    setDeleteLoading(true);
    try {
      console.log("Deleting category:", categoryToDelete); // Debug log
      const response = await axios.delete(
        `${API_URL}/${categoryToDelete.id}`, // Changed from .id to .id_categoria
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        toast.success("Categoría eliminada exitosamente", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setCategories(
          categories.filter(
            (c) => c.id_categoria !== categoryToDelete.id_categoria
          )
        ); // Changed from .id to .id_categoria
        setError(null);
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }
    } catch (err) {
      console.error("Delete error:", err); // Debug log
      const errorMessage =
        err.response?.status === 403
          ? "No tienes permisos para eliminar esta categoría"
          : "Error al eliminar la categoría";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
      setConfirmDelete(false);
      setCategoryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
    setCategoryToDelete(null);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="admin-list">
        {error && <div className="error-message">{error}</div>}
        <table className="admin-table">
          <thead>
            <tr>
              <th className="table-header">Imagen</th>
              <th className="table-header">Nombre</th>
              <th className="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="table-row">
                <td className="table-cell">
                  {category.imagenUrl ? (
                    <img
                      src={category.imagenUrl}
                      alt={`Imagen de ${category.nombre}`}
                      style={{
                        width: "20px",
                        height: "20px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                      onError={(e) => {
                        console.log(
                          "Error loading image for category:",
                          category.nombre
                        );
                        e.target.onerror = null;
                        e.target.src = "https://images-s3-test.s3.us-east-1.amazonaws.com/logo/002bd4cd-4d9d-4507-b37a-8ac22622a83b_pet-care-logo-v2.png";
                      }}
                    />
                  ) : (
                    // Si no hay imagenUrl, muestra el div gris
                    <div
                      key={`placeholder-${category.id}`}
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "4px",
                        display: "inline-block",
                      }}
                    />
                  )}
                </td>
                <td className="table-cell">{category.nombre}</td>
                <td className="table-cell">
                  <div className="action-buttons">
                    <button
                      className="icon-button"
                      onClick={() => onEdit(category)}
                      title="Editar"
                    >
                      <img
                        src={pencilIcon}
                        alt="Editar"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                    <button
                      className="icon-button delete"
                      onClick={() => openDeleteModal(category)}
                      title="Eliminar"
                      disabled={deleteLoading}
                    >
                      <img
                        src={trashIcon}
                        alt="Eliminar"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-container">
            <LiaPawSolid className="modal-icon" />
            <p>
              ¿Estás seguro de querer eliminar la categoría &quot;
              {categoryToDelete?.nombre}&quot; del listado?
            </p>
            <div className="modal-buttons">
              <button
                className="modal-button cancel"
                onClick={handleDeleteCancel}
                disabled={deleteLoading}
              >
                Cancelar
              </button>
              <button
                className="modal-button confirm"
                onClick={handleDeleteConfirmed}
                disabled={deleteLoading}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AdminCategoryList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default AdminCategoryList;
