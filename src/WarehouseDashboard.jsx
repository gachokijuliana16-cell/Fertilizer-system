import Sidebar from "./Sidebar";
import React from "react";

function WarehouseDashboard() {
  return (
    <div
  style={{
    display: "flex",
    background: "#f5f7fa",
    minHeight: "100vh",
  }}
>
  <Sidebar />

<div style={{ flex: 1 }}>
      {/* Header */}
      <header
        style={{
          background: "#2e7d32",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>🌱 Tea SACCO Fertilizer Management System</h2>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            background: "white",
            color: "#2e7d32",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </header>

      {/* Dashboard */}
      <div style={{ padding: "30px" }}>
        <h1>Warehouse Dashboard</h1>
        <p>Welcome, Warehouse Manager.</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <h3>Total Stock</h3>
            <h2>1,250 Bags</h2>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <h3>Today's Sales</h3>
            <h2>82 Bags</h2>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <h3>Revenue</h3>
            <h2>KSh 246,000</h2>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <h3>Low Stock Alerts</h3>
            <h2>4 Products</h2>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          }}
        >
          <h2>Recent Activities</h2>

          <table style={{ width: "100%", marginTop: "20px" }}>
            <thead>
              <tr>
                <th align="left">Date</th>
                <th align="left">Activity</th>
                <th align="left">User</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>20 Jul 2026</td>
                <td>50 bags received</td>
                <td>Warehouse Manager</td>
              </tr>

              <tr>
                <td>20 Jul 2026</td>
                <td>30 bags sold</td>
                <td>Cashier</td>
              </tr>

              <tr>
                <td>20 Jul 2026</td>
                <td>Inventory Report Generated</td>
                <td>Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default WarehouseDashboard;