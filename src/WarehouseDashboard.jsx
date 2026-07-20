import RevenueChart from "./RevenueChart";
import StockChart from "./StockChart";

import React, { useEffect, useState } from "react";
import "./WarehouseDashboard.css";
import Sidebar from "./Sidebar";
import { supabase } from "./supabaseClient";

function WarehouseDashboard() {
  const [managerName, setManagerName] = useState("Warehouse Manager");
  const [totalStock, setTotalStock] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [todaySales, setTodaySales] = useState(0);
  const [stock, setStock] = useState([]);
  const [lowStock, setLowStock] = useState(0);

  useEffect(() => {
    loadUser();
    loadDashboardData();
  }, []);

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

  async function loadDashboardData() {
    // Total Stock
    const { data: stock } = await supabase
  .from("fertilizer-stock")
  .select("fertilizer_type, quantity_available");

  if (stock) {
  setStock(stock);

  const total = stock.reduce(
    (sum, item) => sum + Number(item.quantity_available || 0),
    0
  );

  setTotalStock(total);

  const low = stock.filter(
    (item) => Number(item.quantity_available) < 20
  );

  setLowStock(low.length);
}

    // Farmers Count
    const { count } = await supabase
      .from("farmers")
      .select("*", { count: "exact", head: true });

    setFarmerCount(count || 0);

    // Transactions
    const { data: transactions } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (transactions) {
      setRecentActivities(transactions.slice(0, 5));

      const totalRevenue = transactions.reduce(
        (sum, item) => sum + Number(item.payment_amount || 0),
        0
      );

      setRevenue(totalRevenue);

      const today = new Date().toLocaleDateString();

      const bagsSoldToday = transactions.reduce((sum, item) => {
        const transactionDate = item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "";

        if (transactionDate === today) {
          return sum + Number(item.quantity || 0);
        }

        return sum;
      }, 0);

      setTodaySales(bagsSoldToday);
    }
  }

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

            <p
              style={{
                marginTop: "6px",
                color: "#888",
                fontSize: "14px",
              }}
            >
              {new Date().toLocaleDateString("en-KE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </header>

        <div className="content">
          <div className="cards">
            <div className="card">
              <h4>Total Fertilizer Stock</h4>
              <h2>{totalStock} Bags</h2>
            </div>

            <div className="card">
              <h4>Today's Sales</h4>
              <h2>{todaySales} Bags</h2>
            </div>

            <div className="card">
              <h4>Revenue</h4>
              <h2>KSh {revenue.toLocaleString()}</h2>
            </div>

            <div className="card">
              <h4>Registered Farmers</h4>
              <h2>{farmerCount}</h2>
            </div>
          </div>
          <div className="card">
  <h4>Low Stock Alerts</h4>
  <h2>{lowStock}</h2>
</div>
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
    margin: "30px 0",
  }}
>
  <RevenueChart revenue={revenue} />
  <StockChart stock={stock} />
</div>

         <div className="section">
  <h3>Notifications</h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      marginTop: "20px",
    }}
  >
    <div
      style={{
        background: "#fff3cd",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h4>🔴 Low Stock</h4>
      <p>{lowStock} fertilizer type(s) need restocking.</p>
    </div>

    <div
      style={{
        background: "#d1fae5",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h4>💰 Revenue</h4>
      <p>KSh {revenue.toLocaleString()}</p>
    </div>

    <div
      style={{
        background: "#dbeafe",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h4>📦 Total Stock</h4>
      <p>{totalStock} Bags Available</p>
    </div>

    <div
      style={{
        background: "#ede9fe",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h4>👥 Farmers</h4>
      <p>{farmerCount} Registered Farmers</p>
    </div>
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
                {recentActivities.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      {item.fertilizer_type || "Transaction"}
                    </td>

                    <td>
                      {item.payment_method || "System"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDashboard;