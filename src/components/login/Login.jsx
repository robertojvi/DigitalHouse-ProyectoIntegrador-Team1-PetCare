import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../styles/login/login.css";
import Logo from "../header/Logo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";


const Login = ({ isLoginValue }) => {
  const [isLogin, setIsLogin] = useState(isLoginValue);
  const [errorMessage, setErrorMessage] = useState("");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

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
      localStorage.setItem("userName", response.data.nombre || "Usuario");
      localStorage.setItem("lastname", response.data.apellido || "Apellido");

      if (response.data.message != null) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = response.data.role === "ADMIN" ? "/administracion" : "/";
        }, 2000);

      }

      if (response.data.error != null) {
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/");
      }



    } catch (error) {
      console.error("Error en la autenticación:", error.response?.data || error);

      toast.error(error.response?.data?.message || "Error en la autenticación", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-form-container">
        <div className="login-logo">
          <Logo />
        </div>
        <h2>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin ? (
            <>
              <div className="combo-input">
                <div>
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                  />
                  {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                </div>

                <div>
                  <label>Apellido</label>
                  <input
                    type="text"
                    placeholder="Ingresa tu apellido"
                    {...register("apellido", { required: "El apellido es obligatorio" })}
                  />
                  {errors.apellido && <p className="error">{errors.apellido.message}</p>}
                </div>
              </div>

              <div className="combo-input">
                <div>
                  <label>Email</label>
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
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    placeholder="Ingresa tu número de teléfono"
                    {...register("telefono", { required: "El teléfono es obligatorio" })}
                  />
                  {errors.telefono && <p className="error">{errors.telefono.message}</p>}
                </div>
              </div>

              <div className="combo-input">
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
                  {errors.contrasenia && <p className="error">{errors.contrasenia.message}</p>}
                </div>

                <div>
                  <label>Confirmar Contraseña</label>
                  <input
                    type="password"
                    placeholder="********"
                    {...register("contrasenia1", {
                      required: "Las contraseñas no coinciden",
                      minLength: { value: 6, message: "Mínimo 6 caracteres" }
                    })}
                  />
                  {errors.contrasenia && <p className="error">{errors.contrasenia.message}</p>}
                </div>
              </div>

            </>

          ) : (
            <>
              <div className="login-form-combo">
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
              <div className="login-form-combo">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="********"
                  {...register("contrasenia", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" }
                  })}
                />
                {errors.contrasenia && <p className="error">{errors.contrasenia.message}</p>}
              </div>
            </>
          )}


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
    </>
  );
};

export default Login;