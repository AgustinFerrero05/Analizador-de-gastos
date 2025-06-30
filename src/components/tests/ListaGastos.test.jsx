
import { render, screen, fireEvent } from "@testing-library/react";
import ListaGastos from "../ListaGastos";

describe("ListaGastos", () => {
  const categorias = ["Comida", "Transporte", "Ocio"];
  const gastos = [
    {
      descripcion: "Almuerzo",
      monto: 120,
      categoria: "Comida",
      fecha: "2025-06-01",
    },
    {
      descripcion: "Taxi",
      monto: 50,
      categoria: "Transporte",
      fecha: "2025-06-02",
    },
  ];

  test("renderiza la lista de gastos correctamente", () => {
    render(
      <ListaGastos gastos={gastos} modificarGasto={() => {}} categorias={categorias} />
    );

    expect(screen.getAllByDisplayValue("Almuerzo")).toHaveLength(1);
    expect(screen.getAllByDisplayValue("120")).toHaveLength(1);
    expect(screen.getAllByDisplayValue("Comida")[0].tagName).toBe("SELECT");
    expect(screen.getAllByDisplayValue("2025-06-01")).toHaveLength(1);

    expect(screen.getAllByDisplayValue("Taxi")).toHaveLength(1);
    expect(screen.getAllByDisplayValue("50")).toHaveLength(1);
    expect(screen.getAllByDisplayValue("Transporte")[0].tagName).toBe("SELECT");
    expect(screen.getAllByDisplayValue("2025-06-02")).toHaveLength(1);
  });

  test("llama modificarGasto al cambiar un campo", () => {
    const modificarGasto = vi.fn();
    render(
      <ListaGastos gastos={gastos} modificarGasto={modificarGasto} categorias={categorias} />
    );

    
    fireEvent.change(screen.getAllByDisplayValue("Almuerzo")[0], {
      target: { value: "Cena" },
    });
    expect(modificarGasto).toHaveBeenCalledWith(0, "descripcion", "Cena");

    
    fireEvent.change(screen.getAllByDisplayValue("50")[0], {
      target: { value: "60" },
    });
    expect(modificarGasto).toHaveBeenCalledWith(1, "monto", "60");

    
    fireEvent.change(screen.getAllByDisplayValue("Comida")[0], {
      target: { value: "Ocio" },
    });
    expect(modificarGasto).toHaveBeenCalledWith(0, "categoria", "Ocio");

    
    fireEvent.change(screen.getAllByDisplayValue("2025-06-02")[0], {
      target: { value: "2025-06-10" },
    });
    expect(modificarGasto).toHaveBeenCalledWith(1, "fecha", "2025-06-10");
  });
});
