import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Login from "../Login";

describe("Login", () => {
  test("permite ingresar usuario y contraseña y llamar a onLogin", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    const onGoToRegister = vi.fn();

    render(<Login onLogin={onLogin} onGoToRegister={onGoToRegister} />);

    await user.type(screen.getByPlaceholderText(/nombre de usuario/i), "miUsuario");
    await user.type(screen.getByPlaceholderText(/contraseña/i), "miPass123");

    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(onLogin).toHaveBeenCalledWith("miUsuario", "miPass123");
  });

  test("no llama onLogin si falta usuario", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();

    render(<Login onLogin={onLogin} onGoToRegister={() => {}} />);

    
    await user.type(screen.getByPlaceholderText(/contraseña/i), "miPass123");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(onLogin).not.toHaveBeenCalled();
  });

  test("no llama onLogin si falta contraseña", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();

    render(<Login onLogin={onLogin} onGoToRegister={() => {}} />);

    
    await user.type(screen.getByPlaceholderText(/nombre de usuario/i), "miUsuario");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(onLogin).not.toHaveBeenCalled();
  });

  test("llama onGoToRegister cuando se clickea el boton 'Regístrate'", async () => {
    const user = userEvent.setup();
    const onGoToRegister = vi.fn();

    render(<Login onLogin={() => {}} onGoToRegister={onGoToRegister} />);

    await user.click(screen.getByRole("button", { name: /regístrate/i }));

    expect(onGoToRegister).toHaveBeenCalled();
  });
});
