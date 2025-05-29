// components/Login.jsx
import React, { useState } from "react";

export default function Login({ onLogin, onGoToRegister }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const manejarInicioSesion = () => {
    if (usuario && password) {
      onLogin(usuario, password);
    }
  };

  return (
    <div className="card">
      <h2 className="title">Iniciar Sesión</h2>
      <input
        className="input"
        placeholder="Nombre de usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={manejarInicioSesion}>
        Iniciar Sesión
      </button>
      <p className="small-text">
        ¿No tienes cuenta?{" "}
        <button className="link-button" onClick={onGoToRegister}>
          Regístrate
        </button>
      </p>
    </div>
  );
}
