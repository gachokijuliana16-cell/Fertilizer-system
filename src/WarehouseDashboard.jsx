import React, { useEffect, useState } from "react";
import "./WarehouseDashboard.css";
import Sidebar from "./Sidebar";
import { supabase } from "./supabaseClient";

function WarehouseDashboard() {
  const [managerName, setManagerName] = useState("Warehouse Manager");
useEffect(() => {
  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("users")
      .select("full_name")
      .eq("auth_user_id", user.id)
      .single();

    if (!error && data) {
      setManagerName(data.full_name);
    }
  }

  loadUser();
}, []); 
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <header className="header">
          <div>
  <h2>Warehouse Dashboard</h2>
  <p style={{ margin: 0, color: "#666" }}>
    Welcome, {managerName}
  </p>
</div>

          <button
            className="logout-btn"
            onClick={() => (window.location.href = "/")}
          >
            Logout
          </button>
        </header>

        <div className="content">

          <div className="cards">

            <div className="card">
              <h4>Total Fertilizer Stock</h4>
              <h2>1,250</h2>
            </div>

            <div className="card">
              <h4>Today's Sales</h4>
              <h2>82 Bags</h2>
            </div>

            <div className="card">
              <h4>Revenue</h4>
              <h2>KSh 246,000</h2>
            </div>

            <div className="card">
              <h4>Registered Farmers</h4>
              <h2>536</h2>
            </div>

          </div>

          <div className="section">

            <h3>Recent Activities</h3>

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>User</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>20 Jul 2026</td>
                  <td>Received 50 Bags of NPK Fertilizer</td>
                  <td>Warehouse Manager</td>
                </tr>

                <tr>
                  <td>20 Jul 2026</td>
                  <td>Sold 30 Bags to Farmer</td>
                  <td>Cashier</td>
                </tr>

                <tr>
                  <td>20 Jul 2026</td>
                  <td>Generated Daily Report</td>
                  <td>Administrator</td>
                </tr>

                <tr>
                  <td>19 Jul 2026</td>
                  <td>Added New Fertilizer Stock</td>
                  <td>Warehouse Manager</td>
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