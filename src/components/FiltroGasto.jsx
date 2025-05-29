// components/FiltroGasto.jsx
import React, { useState } from "react";

export default function FiltroGasto({ setFiltro, categorias }) {
  const [filtroLocal, setFiltroLocal] = useState({ mes: "", categoria: "" });

  const aplicarFiltro = () => {
    setFiltro(filtroLocal);
  };

  return (
    <div className="card">
      <h3 className="title">Filtrar Gastos</h3>
      <label>
        Mes:
        <input
          type="month"
          value={filtroLocal.mes}
          onChange={(e) => setFiltroLocal({ ...filtroLocal, mes: e.target.value })}
          className="input"
        />
      </label>
      <label>
        Categoría:
        <select
          value={filtroLocal.categoria}
          onChange={(e) => setFiltroLocal({ ...filtroLocal, categoria: e.target.value })}
          className="input"
        >
          <option value="">Todas</option>
          {categorias.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      <button onClick={aplicarFiltro} className="btn">
        Aplicar Filtro
      </button>
    </div>
  );
}
