import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import FornecedorCadastro from "./pages/FornecedorCadastro";
import FornecedorLista from "./pages/FornecedorLista";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/fornecedores"
          element={<FornecedorLista />}
        />

        <Route
          path="/fornecedores/novo"
          element={<FornecedorCadastro />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}