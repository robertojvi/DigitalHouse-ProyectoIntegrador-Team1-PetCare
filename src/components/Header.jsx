import { useState } from "react";
import "../styles/header.css";
import Menu from "./Menu";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="app-header">
			<Logo />
			<button
				className="menu-toggle"
				onClick={toggleMenu}
				aria-label="Toggle menu"
			>
				{isMenuOpen ? "✕" : "☰"}
			</button>
			<div className={`nav-container ${isMenuOpen ? "show" : ""}`}>
				<Menu />
				<AuthButtons />
			</div>
		</header>
	);
};

export default Header;
