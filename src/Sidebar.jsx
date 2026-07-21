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

      <Link
        to="/warehouse-dashboard"
        style={linkStyle}
        onMouseOver={(e) => (e.target.style.color = "#A5D6A7")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        📊 Dashboard
      </Link>

      <Link
        to="/stock"
        style={linkStyle}
        onMouseOver={(e) => (e.target.style.color = "#A5D6A7")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        📦 Stock
      </Link>

      <Link
        to="/sales"
        style={linkStyle}
        onMouseOver={(e) => (e.target.style.color = "#A5D6A7")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        💰 Sales
      </Link>

      <Link
        to="/farmers"
        style={linkStyle}
        onMouseOver={(e) => (e.target.style.color = "#A5D6A7")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        👨‍🌾 Farmers
      </Link>

      <Link
        to="/reports"
        style={linkStyle}
        onMouseOver={(e) => (e.target.style.color = "#A5D6A7")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        📄 Reports
      </Link>

      <Link
        to="/settings"
        style={linkStyle}
        onMouseOver={(e) => (e.target.style.color = "#A5D6A7")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        ⚙️ Settings
      </Link>
    </div>
  );
}

export default Sidebar;