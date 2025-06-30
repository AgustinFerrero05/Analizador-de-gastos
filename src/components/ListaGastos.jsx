
import React from "react";

export default function ListaGastos({ gastos, modificarGasto, categorias }) {
  return (
    <div className="card">
      <h3 className="subtitle">Gastos</h3>
      {gastos.map((g, i) => (
        <div key={i} className="gasto-item">
          <input
            className="input"
            value={g.descripcion}
            onChange={(e) => modificarGasto(i, "descripcion", e.target.value)}
          />
          <input
            className="input"
            type="number"
            value={g.monto}
            onChange={(e) => modificarGasto(i, "monto", e.target.value)}
          />
          <select
            className="input"
            value={g.categoria}
            onChange={(e) => modificarGasto(i, "categoria", e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            className="input"
            type="date"
            value={g.fecha}
            onChange={(e) => modificarGasto(i, "fecha", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
