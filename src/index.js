import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App.jsx";
import { createRoot } from "react-dom/client";
import "./style.scss";

const root = document.getElementById("root");

createRoot(root).render(<App />);
