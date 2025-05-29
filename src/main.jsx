import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Asegurate que App.jsx esté en /components
import "./styles/App.css"; // Ruta a tu CSS principal

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

