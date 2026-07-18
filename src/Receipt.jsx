import React from "react";
import "./Dashboard.css";


function Receipt(){

  const transaction = JSON.parse(
    localStorage.getItem("receiptData")
  );


  if(!transaction){

    return (

      <div className="receipt-container">

        <div className="receipt-card">

          <h2>
            No receipt information found
          </h2>

        </div>

      </div>

    );

  }



  return (

    <div className="receipt-container">


      <div className="receipt-card">


        <h1>
          🌱 Tea SACCO
        </h1>


        <p className="receipt-title">
          Fertilizer Management System
        </p>


        <hr/>


        <h2>
          Purchase Receipt
        </h2>


        <p>
          <strong>Receipt No:</strong> TRX-{transaction.id}
        </p>


        <p>
          <strong>Farmer:</strong> {transaction.farmer_name}
        </p>


        <hr/>


        <p>
          <strong>Fertilizer:</strong> {transaction.fertilizer_type}
        </p>


        <p>
          <strong>Quantity:</strong> {transaction.quantity} Bags
        </p>


        <p>
          <strong>Amount Paid:</strong> 
          KSh {Number(transaction.payment_amount || 0).toLocaleString()}
        </p>


        <p>
          <strong>Payment Method:</strong> {transaction.payment_method}
        </p>


        <p>
          <strong>Date:</strong> 
          {new Date(transaction.created_at).toLocaleDateString()}
        </p>


        <hr/>


        <h3>
          Thank you for supporting Tea SACCO 🌱
        </h3>


        <p>
          Keep this receipt for your records.
        </p>


        <button 
          onClick={()=>window.print()}
        >

          Print Receipt

        </button>


      </div>


    </div>

  );

}


export default Receipt;