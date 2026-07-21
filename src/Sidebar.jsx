import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const linkStyle = {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "14px 0",
    fontSize: "18px",
    fontWeight: "500",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        width: "240px",
        background: "#1B5E20",
        color: "white",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🌱 Tea SACCO
      </h2>

      <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

      <Link to="/warehouse-dashboard" style={linkStyle}>
        📊 Dashboard
      </Link>

      <Link to="/fertilizer-stock" style={linkStyle}>
        📦 Stock
      </Link>

      <Link to="/transactions" style={linkStyle}>
        💰 Sales
      </Link>

      <Link to="/farmers" style={linkStyle}>
        👨‍🌾 Farmers
      </Link>

      <Link to="/reports" style={linkStyle}>
        📄 Reports
      </Link>

      <Link to="/credit-management" style={linkStyle}>
        ⚙️ Settings
      </Link>
    </div>
  );
}

export default Sidebar;