// components/GraficoGastos.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function GraficoGastos({ data, colores, categoriaMayor }) {
  const noData = !data || data.length === 0;

  return (
    <div className="card">
      <h3 className="subtitle">Gráfico de Gastos por Categoría</h3>

      {noData ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No hay datos disponibles para mostrar.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colores[entry.name] || "#ccc"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}

      {!noData && categoriaMayor && (
        <p className="highlight">
          Categoría con más gasto: <strong>{categoriaMayor}</strong>
        </p>
      )}
    </div>
  );
}
