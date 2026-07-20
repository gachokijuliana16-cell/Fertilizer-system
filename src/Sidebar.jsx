import React from "react";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        background: "#1B5E20",
        color: "white",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2>🌱 Tea SACCO</h2>

      <hr />

      <p style={{ marginTop: "25px", cursor: "pointer" }}>
        📊 Dashboard
      </p>

      <p style={{ cursor: "pointer" }}>
        📦 Stock
      </p>

      <p style={{ cursor: "pointer" }}>
        💰 Sales
      </p>

      <p style={{ cursor: "pointer" }}>
        👨‍🌾 Farmers
      </p>

      <p style={{ cursor: "pointer" }}>
        📄 Reports
      </p>

      <p style={{ cursor: "pointer" }}>
        ⚙️ Settings
      </p>
    </div>
  );
}

export default Sidebar;