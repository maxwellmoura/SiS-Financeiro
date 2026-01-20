import React from "react";
import "./Header.css";
import MarcaSiS from "../../img/MarcaSis.png";

const Header = () => {
  return (
    <header className="header">
      <img src={MarcaSiS} alt="SiS Financeiro" className="sidebar-logo" />
    </header>
  );
};

export default Header;