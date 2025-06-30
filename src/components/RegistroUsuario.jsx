
import React, { useState } from "react";

export default function RegistroUsuario({ onRegistrar }) {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    usuario: "",
    password: ""
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const registrar = () => {
    if (Object.values(datos).some((v) => !v)) return;
    onRegistrar(datos);
  };

  return (
    <div className="card">
      <h2 className="title">Registro de Usuario</h2>
      <input className="input" placeholder="Nombre" name="nombre" onChange={manejarCambio} />
      <input className="input" placeholder="Apellido" name="apellido" onChange={manejarCambio} />
      <input className="input" placeholder="Correo" name="correo" onChange={manejarCambio} />
      <input className="input" placeholder="Teléfono" name="telefono" onChange={manejarCambio} />
      <input className="input" placeholder="Nombre de usuario" name="usuario" onChange={manejarCambio} />
      <input className="input" type="password" placeholder="Contraseña" name="password" onChange={manejarCambio} />
      <button className="button" onClick={registrar}>Registrarse</button>
    </div>
  );
}