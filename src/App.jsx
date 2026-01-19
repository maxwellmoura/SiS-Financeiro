import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Months from "./pages/Months";

import ManageMonths from "./pages/ManageMonths";
import ManageCategories from "./pages/ManageCategories";
import Lancamentos from "./pages/Lancamentos";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/meses" element={<Months />} />

        
        <Route path="/gerenciar-meses" element={<ManageMonths />} />
        <Route path="/gerenciar-categorias" element={<ManageCategories />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
      </Routes>
    </Layout>
  );
}
