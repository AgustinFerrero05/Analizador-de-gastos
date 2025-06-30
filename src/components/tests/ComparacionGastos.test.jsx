import React from "react";
import { render, screen } from "@testing-library/react";
import ComparacionGastos from "../ComparacionGastos";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ComparacionGastos básico", () => {
  const data = [
    { name: "Enero", Anterior: 400, Actual: 300 },
    { name: "Febrero", Anterior: 300, Actual: 500 },
  ];

  test("muestra el título en el documento", () => {
    render(<ComparacionGastos data={data} />);
    const titulo = screen.getByText(/Comparación Mes a Mes/i);
    expect(titulo).toBeTruthy(); 
  });

  test("renderiza sin datos sin fallar", () => {
    render(<ComparacionGastos data={[]} />);
    const titulo = screen.getByText(/Comparación Mes a Mes/i);
    expect(titulo).toBeTruthy();
  });
});
