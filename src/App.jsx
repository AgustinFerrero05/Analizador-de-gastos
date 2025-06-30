
import React, { useState } from "react";
import "./styles/App.css";
import Login from "./components/Login";
import RegistroUsuario from "./components/RegistroUsuario";
import RegistroGasto from "./components/RegistroGasto";
import FiltroGasto from "./components/FiltroGasto";
import GraficoGastos from "./components/GraficoGastos";
import ComparacionGastos from "./components/ComparacionGastos";
import ListaGastos from "./components/ListaGastos";

const categorias = ["Comida", "Transporte", "Salud", "Entretenimiento", "Otros"];
const coloresCategorias = {
  Comida: "#8884d8",
  Transporte: "#82ca9d",
  Salud: "#ffc658",
  Entretenimiento: "#ff7f50",
  Otros: "#a4de6c"
};

export default function App() {
  const [pantalla, setPantalla] = useState("login"); 
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [gasto, setGasto] = useState({ descripcion: "", monto: "", categoria: "", fecha: "" });
  const [gastos, setGastos] = useState([]);
  const [filtro, setFiltro] = useState({ mes: "", categoria: "" });
  const [resumenMensual, setResumenMensual] = useState({});
  const [comparacionMes, setComparacionMes] = useState({});
  const [categoriaMayorGasto, setCategoriaMayorGasto] = useState("");

  const handleRegistrarUsuario = (datos) => {
    setUsuarioRegistrado(datos); 
    setPantalla("login");
  };

  const handleLogin = (usuarioInput, passwordInput) => {
    if (
      usuarioRegistrado &&
      usuarioInput === usuarioRegistrado.usuario &&
      passwordInput === usuarioRegistrado.password
    ) {
      setUsuario(usuarioRegistrado);
      setPantalla("app");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  
  React.useEffect(() => {
    const resumen = gastos.reduce((acc, gasto) => {
      const mes = gasto.fecha.substring(0, 7);
      acc[mes] = acc[mes] || {};
      acc[mes][gasto.categoria] = (acc[mes][gasto.categoria] || 0) + parseFloat(gasto.monto);
      return acc;
    }, {});
    setResumenMensual(resumen);

    if (filtro.mes) {
      const [anio, mes] = filtro.mes.split("-");
      const mesAnterior = new Date(anio, parseInt(mes) - 2).toISOString().slice(0, 7);
      const actual = resumen[filtro.mes] || {};
      const anterior = resumen[mesAnterior] || {};
      const comparacion = {};

      categorias.forEach(cat => {
        comparacion[cat] = {
          actual: actual[cat] || 0,
          anterior: anterior[cat] || 0,
          diferencia: (actual[cat] || 0) - (anterior[cat] || 0)
        };
      });

      setComparacionMes(comparacion);
      const maxCat = Object.entries(actual).sort((a, b) => b[1] - a[1])[0];
      setCategoriaMayorGasto(maxCat ? maxCat[0] : "");
    }
  }, [gastos, filtro.mes]);

  const registrarGasto = () => {
    setGastos([...gastos, gasto]);
    setGasto({ descripcion: "", monto: "", categoria: "", fecha: "" });
  };

  const modificarGasto = (index, campo, valor) => {
    const nuevosGastos = [...gastos];
    nuevosGastos[index][campo] = valor;
    setGastos(nuevosGastos);
  };

  const gastosFiltrados = gastos.filter(g =>
    (!filtro.mes || g.fecha.startsWith(filtro.mes)) &&
    (!filtro.categoria || g.categoria === g.categoria)
  );

  const dataGrafico = Object.entries(resumenMensual[filtro.mes] || {}).map(([cat, total]) => ({
    name: cat,
    value: total
  }));

  const dataComparacion = categorias.map(cat => ({
    name: cat,
    Actual: comparacionMes[cat]?.actual || 0,
    Anterior: comparacionMes[cat]?.anterior || 0
  }));

  return (
    <div className="app-container">
      {pantalla === "login" && (
        <Login onLogin={handleLogin} onGoToRegister={() => setPantalla("registro")} />
      )}

      {pantalla === "registro" && (
        <RegistroUsuario onRegistrar={handleRegistrarUsuario} />
      )}

      {pantalla === "app" && usuario && (
        <>
          <h2 className="title">Hola, {usuario.nombre}</h2>
          <RegistroGasto gasto={gasto} setGasto={setGasto} onRegistrar={registrarGasto} categorias={categorias} />
          <FiltroGasto filtro={filtro} setFiltro={setFiltro} categorias={categorias} />
          <GraficoGastos data={dataGrafico} colores={coloresCategorias} categoriaMayor={categoriaMayorGasto} />
          <ComparacionGastos data={dataComparacion} />
          <ListaGastos gastos={gastosFiltrados} modificarGasto={modificarGasto} categorias={categorias} />
        </>
      )}
    </div>
  );
}