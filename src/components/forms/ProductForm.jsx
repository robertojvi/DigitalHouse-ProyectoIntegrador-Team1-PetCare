import { useState, useEffect } from "react";
import { obtenerCategorias } from "../../services/categoriasService";

const ProductForm = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error loading categories:", err);
      }
    };

    loadCategorias();
  }, []);

  return (
    <form>
      <div>
        <label htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        {error && <p className="error-message">{error}</p>}
      </div>
      {/* ...rest of your form fields... */}
    </form>
  );
};

export default ProductForm;
