import { render, screen, fireEvent } from "@testing-library/react";
import FiltroGasto from "../FiltroGasto";

test("FiltroGasto aplica filtro con mes y categoría seleccionados", () => {
  const categorias = ["Alimentos", "Transporte", "Salud"];
  let filtroAplicado = null;
  const setFiltroMock = (filtro) => {
    filtroAplicado = filtro;
  };

  render(<FiltroGasto categorias={categorias} setFiltro={setFiltroMock} />);

  fireEvent.change(screen.getByLabelText(/Mes/i), { target: { value: "2023-05" } });
  fireEvent.change(screen.getByLabelText(/Categoría/i), { target: { value: "Transporte" } });

  fireEvent.click(screen.getByText(/Aplicar Filtro/i));

  expect(filtroAplicado).toEqual({ mes: "2023-05", categoria: "Transporte" });
});
