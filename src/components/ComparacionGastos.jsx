// components/ComparacionGastos.js
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ComparacionGastos({ data }) {
  return (
    <div className="card">
      <h3 className="subtitle">Comparación Mes a Mes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Anterior" fill="#8884d8" />
          <Bar dataKey="Actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
