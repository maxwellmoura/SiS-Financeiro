import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isActive = (p) =>
    location.pathname === p ? "nav-link active" : "nav-link";

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Controle Financeiro Pessoal</h1>

        <nav className="app-nav">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/categorias" className={isActive("/categorias")}>
            Categorias
          </Link>
          <Link to="/meses" className={isActive("/meses")}>
            Meses
          </Link>

         
          <Link to="/gerenciar-meses" className={isActive("/gerenciar-meses")}>
            Gerenciar Meses
          </Link>
          <Link
            to="/gerenciar-categorias"
            className={isActive("/gerenciar-categorias")}
          >
           Gerenciar Categorias
          </Link>
          <Link to="/lancamentos" className={isActive("/lancamentos")}>
            Lançamentos
          </Link>
        </nav>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        Desenvolvido por Maxwell Moura - 2025
      </footer>
    </div>
  );
}
