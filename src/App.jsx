import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Categories from "./pages/Categories";
import ManageCategories from "./pages/ManageCategories";
import Lancamentos from "./pages/Lancamentos";
import Dashboard from "./pages/Dashboard";
import Months from "./pages/Months";
import ManageMonths from "./pages/ManageMonths";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/gerenciar-categorias" element={<ManageCategories />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
          <Route path="/months" element={<Months />} />
          <Route path="/gerenciar-meses" element={<ManageMonths />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
