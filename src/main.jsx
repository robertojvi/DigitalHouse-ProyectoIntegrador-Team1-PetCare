// IMPORTs
// Styles
// import "./index.css";

// React
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App.jsx";
// import ContextProvider from "./Context/Context.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		{/* <ContextProvider> */}
		<App />
		{/* </ContextProvider> */}
	</BrowserRouter>
);
