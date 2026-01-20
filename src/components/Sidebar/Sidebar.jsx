import React from "react";
import { Link } from "react-router-dom";
import {
  FaList,
  FaCog,
  FaChartBar,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import "./sidebar.css";

import Header from "../Header/Header";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <Header />
        <ul>
          <li>
            <Link className="nav-link" to="/dashboard">
              <FaChartBar className="fa" /> Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/categorias">
              <FaList className="fa" /> Categorias
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/gerenciar-categorias">
              <FaCog className="fa" /> Gerenciar Categorias
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/lancamentos">
              <FaClipboardList className="fa" /> Lançamentos
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/gerenciar-meses">
              <FaCog className="fa" /> Gerenciar Meses
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/months">
              <FaCalendarAlt  className="fa"/> Meses
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
