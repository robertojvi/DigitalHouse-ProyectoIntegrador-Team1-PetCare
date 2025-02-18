/**
 * Search input component
 * Features:
 * - Search icon on the left
 * - Text input field with placeholder
 * - Custom styling with shadow effect
 * - Responsive design (hides on mobile)
 */
import "../styles/searchBox.css";
import searchIcon from "../images/search.png";

const SearchBox = () => {
	return (
		<div className="search-container">
			<img src={searchIcon} alt="Search icon" className="search-icon" />
			<input type="text" placeholder="Search" className="search-input" />
		</div>
	);
};

export default SearchBox;
