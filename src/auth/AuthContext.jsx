import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    idUsuario: localStorage.getItem("idUser"),
    nombre: localStorage.getItem("userName"),
    apellido: localStorage.getItem("lastname")
  });
  
  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, nombre: null, apellido: null });
  };
  
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
