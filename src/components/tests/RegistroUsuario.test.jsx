
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegistroUsuario from "../RegistroUsuario";

describe("RegistroUsuario", () => {
  test("permite ingresar datos y llamar a onRegistrar con datos completos", async () => {
    const user = userEvent.setup();
    const onRegistrar = vi.fn();

    render(<RegistroUsuario onRegistrar={onRegistrar} />);

    
    await user.type(screen.getByPlaceholderText("Nombre"), "Juan");
    await user.type(screen.getByPlaceholderText("Apellido"), "Pérez");
    await user.type(screen.getByPlaceholderText("Correo"), "juan@example.com");
    await user.type(screen.getByPlaceholderText("Teléfono"), "123456789");
    await user.type(screen.getByPlaceholderText("Nombre de usuario"), "juanp");
    await user.type(screen.getByPlaceholderText("Contraseña"), "secreto123");

    
    fireEvent.click(screen.getByText("Registrarse"));

    
    expect(onRegistrar).toHaveBeenCalledWith({
      nombre: "Juan",
      apellido: "Pérez",
      correo: "juan@example.com",
      telefono: "123456789",
      usuario: "juanp",
      password: "secreto123",
    });
  });

  test("no llama a onRegistrar si falta algún campo", async () => {
    const user = userEvent.setup();
    const onRegistrar = vi.fn();

    render(<RegistroUsuario onRegistrar={onRegistrar} />);

    
    await user.type(screen.getByPlaceholderText("Nombre"), "Juan");
    await user.type(screen.getByPlaceholderText("Apellido"), "Pérez");

    fireEvent.click(screen.getByText("Registrarse"));

    
    expect(onRegistrar).not.toHaveBeenCalled();
  });
});
