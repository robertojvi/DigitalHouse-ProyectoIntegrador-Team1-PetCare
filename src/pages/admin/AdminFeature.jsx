import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/admin/adminService.css";

// Components
import EditFeatureForm from "../../components/forms/EditFeatureForm";

// Images
import addPlusIcon from "../../images/add-plus.png";
import pencilIcon from "../../images/pencil.png";
import trashIcon from "../../images/trash-can.png";
import warningIcon from "../../images/warning.png";

// Form Component
const AddCharacteristicForm = ({ onClose, onSubmit }) => {
  // ... mantener el mismo código del formulario que estaba en AdminHome ...
};

const AdminFeature = ({ isInAdminLayout }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [characteristics, setCharacteristics] = useState([]);
  const { auth } = useContext(AuthContext);

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetchCharacteristics();
  }, []);

  const fetchCharacteristics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/caracteristicas`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setCharacteristics(response.data);
    } catch (error) {
      toast.error("Error al cargar las características");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta característica?")) {
      try {
        await axios.delete(`${BASE_URL}/api/caracteristicas/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        toast.success("Característica eliminada con éxito");
        fetchCharacteristics();
      } catch (error) {
        toast.error("Error al eliminar la característica");
      }
    }
  };

  const handleAddCharacteristic = async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/caracteristicas`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Característica agregada exitosamente");
        setShowAddForm(false);
        fetchCharacteristics();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al agregar la característica"
      );
    }
  };

  const handleEditFeature = async (formData) => {
    console.log("Datos recibidos para actualizar:", formData); // Debug
    try {
      if (!formData.idCaracteristica) {
        toast.error("ID de característica no válido");
        return;
      }

      await axios.put(
        `${BASE_URL}/api/caracteristicas/${formData.idCaracteristica}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Característica actualizada exitosamente");
      setShowEditForm(false);
      fetchCharacteristics();
    } catch (error) {
      console.error("Error completo:", error.response || error); // Debug mejorado
      toast.error("Error al actualizar la característica");
    }
  };

  return (
    <main className={`admin-container ${isInAdminLayout ? "in-layout" : ""}`}>
      <ToastContainer />

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
          <span className="breadcrumb-current">Características</span>
        </div>
      )}

      <div className="admin-content">
        <section className="admin-section">
          <div className="admin-header">
            <button
              className="adminService-admin-button"
              onClick={() => setShowAddForm(true)}
            >
              <span>Agregar Característica</span>
              <img
                src={addPlusIcon}
                alt="Añadir"
                style={{ width: "15px", height: "15px", marginLeft: "8px" }}
              />
            </button>
          </div>

          {showAddForm && (
            <AddCharacteristicForm
              onClose={() => setShowAddForm(false)}
              onSubmit={handleAddCharacteristic}
            />
          )}

          {showEditForm && selectedFeature && (
            <EditFeatureForm
              feature={selectedFeature}
              onClose={() => {
                setShowEditForm(false);
                setSelectedFeature(null);
              }}
              onSubmit={handleEditFeature}
            />
          )}

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Icon</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {characteristics.map((characteristic) => {
                  console.log("Característica en el mapeo:", characteristic); // Debug
                  return (
                    <tr key={characteristic.idCaracteristica}>
                      <td>{characteristic.nombre}</td>
                      <td>
                        {characteristic.icon ? (
                          <img src={characteristic.icon} height={30} />
                        ) : (
                          "Sin icono"
                        )}
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => {
                            setSelectedFeature(characteristic);
                            setShowEditForm(true);
                          }}
                        >
                          <img src={pencilIcon} alt="Editar característica" />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleDelete(characteristic.idCaracteristica)}
                        >
                          <img src={trashIcon} alt="Eliminar característica" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

AdminFeature.propTypes = {
  isInAdminLayout: PropTypes.bool.isRequired,
};

export default AdminFeature;
