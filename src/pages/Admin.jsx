import React from "react";
import { Link } from "react-router-dom";
import warningIcon from "../images/warning.png";
import "../styles/admin/admin.css";

const Admin = () => {
  // Actualizamos los datos de ejemplo para productos
  const productos = [
    { id: 1, tipo: "Paseador", nombre: "Camila Pérez" },
    { id: 2, tipo: "Cuidador", nombre: "Pepito López" },
  ];

  const usuarios = [
    { id: 1, nombre: "Juan Pérez", email: "juan@mail.com", rol: "Admin" },
    { id: 2, nombre: "Ana López", email: "ana@mail.com", rol: "Cliente" },
  ];

  const categorias = [
    { id: 1, nombre: "Cuidado en casa", servicios: 5 },
    { id: 2, nombre: "Spa en casa", servicios: 3 },
    { id: 3, nombre: "Asesoría personalizada", servicios: 2 },
  ];

  const caracteristicas = [
    { id: 1, nombre: "A domicilio" },
    { id: 2, nombre: "24horas" },
    { id: 3, nombre: "Especializada" },
  ];

  // Funciones para manejar edición y eliminación
  const handleEdit = (item, tipo) => {
    console.log(`Editando ${tipo}:`, item);
  };

  const handleDelete = (item, tipo) => {
    console.log(`Eliminando ${tipo}:`, item);
  };

  return (
    <main className="admin-container">
      <div className="mobile-message">
        <img src={warningIcon} alt="Warning" className="warning-icon" />
        <span>NO DISPONIBLE PARA MOBILE</span>
      </div>

      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Inicio
        </Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Administración</span>
      </div>

      <div className="admin-content">
        <section className="admin-section">
          <h2>Productos</h2>
          <button className="admin-button">+ Añadir Productos</button>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.tipo}</td>
                    <td>{producto.nombre}</td>
                    <td>
                      <button
                        className="action-button edit"
                        onClick={() => handleEdit(producto, "producto")}
                      >
                        Editar
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => handleDelete(producto, "producto")}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>Usuarios</h2>
          <button className="admin-button">Usuarios</button>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <button
                        className="action-button edit"
                        onClick={() => handleEdit(usuario, "usuario")}
                      >
                        Editar
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => handleDelete(usuario, "usuario")}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>Categorías</h2>
          <button className="admin-button">+ Añadir Categorías</button>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Servicios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.servicios}</td>
                    <td>
                      <button className="action-button edit">Editar</button>
                      <button className="action-button delete">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>Características</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {caracteristicas.map((caracteristica) => (
                  <tr key={caracteristica.id}>
                    <td>{caracteristica.id}</td>
                    <td>{caracteristica.nombre}</td>
                    <td>
                      <button className="action-button edit">Editar</button>
                      <button className="action-button delete">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;
