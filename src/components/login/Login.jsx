import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../styles/login/login.css";
import Logo from "../header/Logo";

const Login = ({ isLoginValue }) => {
  const [isLogin, setIsLogin] = useState(isLoginValue);
  const [errorMessage, setErrorMessage] = useState("");

  // React Hook Form para manejar los inputs y validaciones
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      const url = isLogin 
        ? "http://localhost:8080/api/auth/login" 
        : "http://localhost:8080/api/auth/register";
      const response = await axios.post(url, data);

      // Guardar el token en el localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userName", response.data.nombre);

      // Redirigir según el rol
      if (response.data.role === "ADMIN") {
        window.location.href = "/administracion";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error en la autenticación"
      );
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-logo">
        <Logo />
      </div>      
      <h2>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <>
          <div>
            <label>Nombre</label>
            <input 
              type="text" 
              placeholder="Ingresa tu nombre" 
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div>
          <label>Telefono</label>
          <input 
            type="phone" 
            placeholder="Ingresa numero telefonico" 
            {...register("telefono", { required: "El telefono es obligatorio" })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        </>
        )}
        <div>
          <label>Correo Electrónico</label>
          <input 
            type="email" 
            placeholder="ejemplo@correo.com" 
            {...register("email", { 
              required: "El email es obligatorio", 
              pattern: { value: /\S+@\S+\.\S+/, message: "Email no válido" } 
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input 
            type="password" 
            placeholder="********" 
            {...register("contrasenia", { 
              required: "La contraseña es obligatoria", 
              minLength: { value: 6, message: "Mínimo 6 caracteres" } 
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="login-submit-container">
          <button type="submit" className="login-submit">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </div>
      </form>

      <p className="login-toggle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia Sesión"}
      </p>
    </div>
  );
};

export default Login;
