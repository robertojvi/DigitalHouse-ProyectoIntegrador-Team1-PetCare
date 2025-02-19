/**
 * Header component containing navigation and branding
 * Features:
 * - Fixed positioning at top of viewport
 * - Contains TopBar for user actions
 * - Logo component for branding
 * - SearchBox for search functionality
 * - Responsive menu with hamburger toggle
 * - State management for menu open/close
 */

// Imports
// React
import { useState } from "react";

// Styles
import "../../styles/header/header.css";
import "../../styles/header/menu.css";

// Components
import TopBar from "./TopBar";
import Logo from "./Logo";
import SearchBox from "../SearchBox";
import Menu from "./Menu";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="header-container">
			<div className="fixed-header">
				<TopBar />
				<header className="app-header">
					<Logo />
					<SearchBox />
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
							<Menu />
						</div>
					</nav>
				</header>
			</div>
		</div>
	);
};

export default Header;
