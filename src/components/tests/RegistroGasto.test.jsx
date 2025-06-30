import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegistroGasto from "../RegistroGasto";
import { describe, it, expect, vi } from "vitest";

describe("RegistroGasto", () => {
  it("permite completar y enviar el formulario de gasto", async () => {
    const gastoInicial = {
      descripcion: "",
      monto: "",
      categoria: "Comida",
      fecha: "",
    };

    const setGasto = vi.fn();
    const onRegistrar = vi.fn();

    render(
      <RegistroGasto
        gasto={gastoInicial}
        setGasto={setGasto}
        onRegistrar={onRegistrar}
        categorias={["Comida", "Transporte", "Educación"]}
      />
    );

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Descripción"), "Pizza");
    await user.type(screen.getByPlaceholderText("Monto"), "200");
    await user.selectOptions(screen.getByRole("combobox"), "Comida");
    await user.type(screen.getByRole("textbox", { name: "" }), "2024-06-26");
    await user.click(screen.getByRole("button", { name: /guardar/i }));

    expect(onRegistrar).toHaveBeenCalled();
  });
});
