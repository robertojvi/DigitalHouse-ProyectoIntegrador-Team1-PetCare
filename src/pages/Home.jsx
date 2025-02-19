// Styles
// import "../styles/home.css";
import "../styles/home/home.css";

/**
 * Home Page Component
 *
 * Features:
 * - Main landing page of the application
 * - Contains sample content with text and images
 * - Uses CSS Grid/Flexbox for layout
 * - Responsive design for all screen sizes
 * - Optimized image loading with width/height attributes
 *
 * Structure:
 * - Main container with className="mainContainer"
 * - Page heading (h1)
 * - Content section with className="home-content"
 * - Multiple paragraphs of text
 * - Responsive images with className="pet-image"
 *
 * Styling:
 * - Uses home.css for component specific styles
 * - Responsive images with fixed dimensions (200x100)
 * - Maintains consistent spacing between elements
 * - Proper semantic HTML structure
 *
 * Image Sources:
 * - Uses Unsplash API for sample pet images
 * - Two alternating images (puppy and kitten)
 * - Alt text provided for accessibility
 *
 * Props:
 * - None
 *
 * State:
 * - None (stateless component)
 *
 * Example Usage:
 * ```jsx
 * <Route path="/" element={<Home />} />
 * ```
 *
 * Related Files:
 * - /src/styles/home.css - Component styles
 * - /src/routes/index.jsx - Route configuration
 */

const Home = () => {
	return (
		<main className="mainContainer">
			<h1>Home</h1>
			<div className="home-content">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam in dui mauris. Vivamus hendrerit arcu sed erat
					molestie vehicula. Sed auctor neque eu tellus rhoncus ut
					eleifend nibh porttitor.
				</p>

				<img
					src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
					alt="Adorable puppy"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Praesent et diam eget libero egestas mattis sit amet vitae
					augue. Nam tincidunt congue enim, ut porta lorem lacinia
					consectetur.
				</p>

				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
					alt="Cute kitten"
					className="pet-image"
					width="200"
					height="100"
				/>

				<p>
					Donec ut libero sed arcu vehicula ultricies a non tortor.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Aenean ut gravida lorem.
				</p>
			</div>
		</main>
	);
};

export default Home;
