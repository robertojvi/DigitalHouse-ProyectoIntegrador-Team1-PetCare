import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import '../styles/admin/adminLayout.css';

const AdminLayout = ({ children, onMenuClick }) => {
    const { auth } = useContext(AuthContext);

    const getInitials = (nombre, apellido) => {
        const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : '';
        const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : '';
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <div className="admin-layout">
            <div className="admin-sidebar">
                <div className="admin-welcome-card sidebar-card">
                    <div className="admin-initials-circle">
                        {getInitials(auth.nombre, auth.apellido)}
                    </div>
                    
                    <div className="admin-menu-links">
                        <button 
                            className="admin-link"
                            onClick={() => onMenuClick('productos')}
                        >
                            Lista de Productos
                        </button>
                        <button 
                            className="admin-link"
                            onClick={() => onMenuClick('usuarios')}
                        >
                            Lista de Usuarios
                        </button>
                        <button 
                            className="admin-link"
                            onClick={() => onMenuClick('categorias')}
                        >
                            Lista de Categorías
                        </button>
                        <button 
                            className="admin-link"
                            onClick={() => onMenuClick('caracteristicas')}
                        >
                            Lista de Características
                        </button>
                    </div>
                </div>
            </div>
            <div className="admin-content">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout; 