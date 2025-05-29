// components/RegistroGasto.js
import React from "react";

export default function RegistroGasto({ gasto, setGasto, onRegistrar, categorias }) {
  return (
    <div className="card">
      <h3 className="subtitle">Registrar Gasto</h3>
      <input
        className="input"
        placeholder="Descripción"
        value={gasto.descripcion}
        onChange={(e) => setGasto({ ...gasto, descripcion: e.target.value })}
      />
      <input
        className="input"
        type="number"
        placeholder="Monto"
        value={gasto.monto}
        onChange={(e) => setGasto({ ...gasto, monto: e.target.value })}
      />
      <select
        className="input"
        value={gasto.categoria}
        onChange={(e) => setGasto({ ...gasto, categoria: e.target.value })}
      >
        {categorias.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        className="input"
        type="date"
        value={gasto.fecha}
        onChange={(e) => setGasto({ ...gasto, fecha: e.target.value })}
      />
      <button className="button" onClick={onRegistrar}>Guardar</button>
    </div>
  );
}
