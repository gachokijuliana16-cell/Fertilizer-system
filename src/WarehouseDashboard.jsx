import React from "react";

function WarehouseDashboard() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Warehouse Dashboard</h1>
      <p>🎉 Login and routing are working successfully!</p>

      <button onClick={() => window.location.href = "/"}>
        Logout
      </button>
    </div>
  );
}

export default WarehouseDashboard;