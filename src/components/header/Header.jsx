// React
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CiLogout, CiUser } from "react-icons/ci";

// Components
import { AuthContext } from "../../auth/AuthContext";
import Logo from "./Logo";
import Modal from "../shared/Modal/Modal";
import Login from "../login/login";

// Styles
import "../../styles/header/header.css";
import "../../styles/header/menu.css";

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
					<Logo />
					<Link to="/" className="logo">
						<span>La mejor compañia para tu mejor amigo</span>
					</Link>
					<nav className="nav-section">
						<button
							className="menu-toggle"
							onClick={toggleMenu}
							aria-label="Toggle menu"
						>
							{isMenuOpen ? "✕" : "☰"}
						</button>
						<div
							className={`nav-container ${
								isMenuOpen ? "show" : ""
							}`}
						>
							{/* <Menu /> */}
							{!auth.token ? (
								<>
									<div className="header-user-noA">
										<button
											onClick={() =>
												openLoginModal(false)
											}
										>
											Crear cuenta
										</button>
										<button
											onClick={() => openLoginModal(true)}
										>
											Iniciar sesión
										</button>
									</div>
								</>
							) : (
								<div className="header-user">
									<div className="name-avatar">
										<span className="avatar">
											{auth.nombre[0]}
											{auth.apellido[0]}
										</span>
										<h3>{auth.nombre}</h3>
									</div>
									<button className="logout" onClick={logout}>
										<CiLogout /> Cerrar Sesión
									</button>
								</div>
							)}
						</div>
					</nav>
				</header>
			</div>

			{isLoginModalOpen && (
				<Modal onClose={closeModal}>
					<Login isLoginValue={isLogin} />
				</Modal>
			)}
		</div>
	);
};

export default Header;
