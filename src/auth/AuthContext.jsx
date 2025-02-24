import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    nombre: localStorage.getItem("userName"),
  });

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, nombre: null });
    window.location.href = "/"
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
