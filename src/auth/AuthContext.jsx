import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    nombre: localStorage.getItem("userName"),
    apellido: localStorage.getItem("lastname")
  });
  
  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, nombre: null, apellido: null });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
