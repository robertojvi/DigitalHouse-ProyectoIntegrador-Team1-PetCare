import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import "../../styles/admin/adminHome.css";

function AdminHome() {
  const { auth } = useContext(AuthContext);

  // Función para obtener las iniciales
  const getInitials = (nombre, apellido) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : "";
    const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
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

  return (
    <main>
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
            <Link to="/administracion/service" className="admin-link">
              Lista de Productos
            </Link>
            <Link to="/admin/users" className="admin-link">
              Lista de Usuarios
            </Link>
            <Link to="/admin/categories" className="admin-link">
              Lista de Categorías
            </Link>
            <Link to="/admin/features" className="admin-link">
              Lista de Características
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminHome;
