import { render, screen } from "@testing-library/react";
import GraficoGastos from "../GraficoGastos";

test("muestra mensaje cuando no hay datos", () => {
  render(<GraficoGastos data={[]} colores={{}} categoriaMayor={null} />);
  const mensaje = screen.getByText(/no hay datos disponibles/i);
  expect(mensaje).to.exist; 
});
