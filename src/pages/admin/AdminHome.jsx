import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import AdminService from "./AdminService";
import AdminCategory from "./AdminCategory";
import AdminUser from "./AdminUser";
import warningImg from "../../images/warning.png";
import "../../styles/admin/adminHome.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addPlusIcon from "../../images/add-plus.png";
import pencilIcon from "../../images/pencil.png";
import trashIcon from "../../images/trash-can.png";
import {
  FormWrapper,
  FormContainer,
  Overlay,
  Form,
  FormGroup,
  Input,
  ButtonGroup,
  Button,
  LogoContainer,
  Label,
} from "../../styles/AddProductForm.styles";
import petCareLogo from "../../images/pet-care-logo-v2.png";
import AdminFeature from "./AdminFeature";

// Componente del formulario
const AddCharacteristicForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    icon: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre", formData.nombre);
    if (formData.icon) {
      data.append("icon", formData.icon);
    }
    onSubmit(data);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, icon: e.target.files[0] });
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
            <Label>Característica:</Label>
            <Input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Icon:</Label>
            <Label
              className="fileInputLabel"
              style={{
                backgroundColor: "#314549",
                color: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                display: "inline-block",
                marginTop: "8px",
                width: "fit-content",
                minWidth: "120px",
                textAlign: "center",
              }}
            >
              Seleccionar Icon
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Label>
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="submit">
              Guardar
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

function AdminHome() {
  const { auth } = useContext(AuthContext);
  // Persistimos el menú seleccionado en localStorage
  const [selectedMenu, setSelectedMenu] = useState(() => {
    const saved = localStorage.getItem("adminSelectedMenu");
    return saved || null;
  });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth <= 768,
  });
  const [characteristics, setCharacteristics] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const [showAddForm, setShowAddForm] = useState(false);

  // Guardar el menú seleccionado cuando cambie
  useEffect(() => {
    if (selectedMenu) {
      localStorage.setItem("adminSelectedMenu", selectedMenu);
    }
  }, [selectedMenu]);

  // Verificar dimensiones
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      setDimensions({ width, isMobile });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedMenu === "caracteristicas") {
      fetchCharacteristics();
    }
  }, [selectedMenu]);

  const getInitials = (nombre, apellido) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : "";
    const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  // Manejador para acciones completadas
  const handleActionComplete = () => {
    // No hacemos nada aquí, solo mantenemos el estado actual
    console.log("Acción completada, manteniendo vista actual");
  };

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

  // Función para manejar el envío del formulario
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

  if (!auth.token) {
    return (
      <div className="admin-home-container">
        <div className="admin-welcome-card">
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }

  // Verificar si debemos mostrar el warning
  const shouldShowWarning = dimensions.isMobile && auth?.role === "ADMIN";

  // Vista inicial del panel de administración
  if (!selectedMenu) {
    return (
      <main>
        {shouldShowWarning && (
          <div
            style={{
              //position: 'fixed',
              //top: 'var(--header-height)',
              //left: 0,
              //right: 0,
              //bottom: 'var(--footer-height)',
              backgroundColor: "#ffffff",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            <img
              src={warningImg}
              alt="Warning"
              style={{
                width: "80px",
                height: "80px",
                marginBottom: "1.5rem",
              }}
            />
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#314549",
              }}
            >
              NO DISPONIBLE PARA MOBILE
            </span>
          </div>
        )}

        <div style={{ display: shouldShowWarning ? "none" : "block" }}>
          <div className="admin-navigation">
            <Link to="/" className="breadcrumb-link">
              Inicio
            </Link>
            <span className="breadcrumb-separator"> {">"} </span>
            <span className="breadcrumb-current">Administración</span>
          </div>

          <div className="admin-home-container">
            <div className="admin-welcome-card">
              <h1 className="welcome-title">
                ¡Hola {auth.nombre} {auth.apellido}!
              </h1>
              <div className="admin-initials-circle">
                {getInitials(auth.nombre, auth.apellido)}
              </div>
              <div className="admin-menu-links">
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("productos")}
                >
                  Lista de Productos
                </button>
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("usuarios")}
                >
                  Lista de Usuarios
                </button>
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("categorias")}
                >
                  Lista de Categorías
                </button>
                <button
                  className="admin-link"
                  onClick={() => handleMenuClick("caracteristicas")}
                >
                  Lista de Características
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Vista con menú lateral y contenido dinámico
  return (
    <main>
      <AdminLayout onMenuClick={handleMenuClick} selectedMenu={selectedMenu}>
        {selectedMenu === "productos" && (
          <AdminService
            isInAdminLayout={true}
            onActionComplete={handleActionComplete}
          />
        )}
        {selectedMenu === "usuarios" && (
          <AdminUser
            isInAdminLayout={true}
            onActionComplete={handleActionComplete}
          />
        )}
        {selectedMenu === "categorias" && (
          <AdminCategory
            isInAdminLayout={true}
            onActionComplete={handleActionComplete}
          />
        )}
        {selectedMenu === "caracteristicas" && (
          <AdminFeature
            isInAdminLayout={true}
            onActionComplete={handleActionComplete}
          />
        )}
      </AdminLayout>
    </main>
  );
}

export default AdminHome;
