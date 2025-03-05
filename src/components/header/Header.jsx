import React, { useState, useContext } from "react";
import "../../styles/header/header.css";
import "../../styles/header/menu.css";
import TopBar from "./TopBar";
import Logo from "./Logo";
import Menu from "./Menu";
import Modal from "../shared/Modal/Modal";
import { CiLogout, CiUser } from "react-icons/ci";
import Login from "../login/login";
import { AuthContext } from "../../auth/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { auth, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = (loginMode) => {
    setIsLogin(loginMode);
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="header-container">
      <div className="fixed-header">
        <header className="app-header">
          <Logo /> <span>La mejor compañia para tu mejor amigo</span>
          <nav className="nav-section">
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
            <div className={`nav-container ${isMenuOpen ? "show" : ""}`}>
              {/* <Menu /> */}
              {!auth.token ? (
              <>
                <div className="header-user-noA">
                  <button onClick={() => openLoginModal(false)}>Crear cuenta</button>
                  <button onClick={() => openLoginModal(true)}>Iniciar sesión</button>
                </div>
              </>
            ) : (
              <div className="header-user">
                <div className="name-avatar">
                  <h3>{auth.nombre} {auth.apellido}</h3>
                  <span className="avatar">{auth.nombre[0]}{auth.apellido[0]}</span>
                </div>
                <button className="logout" onClick={logout}>
                  <CiLogout/> Cerrar Sesión
                </button>
              </div>
            )}              
            </div>
          </nav>
        </header>
      </div>

      {isLoginModalOpen && (
        <Modal onClose={closeModal}>
          <Login isLoginValue={isLogin}/>
        </Modal>
      )}
    </div>
  );
};

export default Header;
