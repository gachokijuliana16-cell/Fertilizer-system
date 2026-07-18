import Receipt from "./Receipt";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

import WarehouseDashboard from "./WarehouseDashboard";
import FarmerDashboard from "./FarmerDashboard";
import AdminDashboard from "./AdminDashboard";
import BuyFertilizer from "./BuyFertilizer";

import AddStock from "./AddStock";
import FertilizerStock from "./FertilizerStock";
import Farmers from "./Farmers";
import Transactions from "./Transactions";
import CreditManagement from "./CreditManagement";
import Reports from "./Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/buy-fertilizer" element={<BuyFertilizer />} />
        <Route path="/warehouse-dashboard" element={<WarehouseDashboard />} />

        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/add-stock" element={<AddStock />} />

        <Route path="/fertilizer-stock" element={<FertilizerStock />} />

        <Route path="/farmers" element={<Farmers />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/credit-management" element={<CreditManagement />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/receipt" element={<Receipt />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;