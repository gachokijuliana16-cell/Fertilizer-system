import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  return (

    <div className="sidebar">

      <button onClick={() => navigate("/warehouse-dashboard")}>
        Dashboard
      </button>

      <button onClick={() => navigate("/fertilizer-stock")}>
        Fertilizer Stock
      </button>

      <button onClick={() => navigate("/add-stock")}>
        Add Stock
      </button>

      <button onClick={() => navigate("/farmers")}>
        Farmers
      </button>

      <button onClick={() => navigate("/transactions")}>
        Transactions
      </button>

      <button onClick={() => navigate("/credit-management")}>
        Credit Management
      </button>

      <button onClick={() => navigate("/reports")}>
        Reports
      </button>

    </div>

  );

}

export default Sidebar;