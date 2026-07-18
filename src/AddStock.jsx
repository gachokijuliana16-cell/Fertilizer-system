import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./AddStock.css";


function AddStock() {


  const [fertilizerType, setFertilizerType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [supplier, setSupplier] = useState("");



  async function addStock(e) {

    e.preventDefault();



    const { error } = await supabase

      .from("fertilizer-stock")

      .insert([

        {

          fertilizer_type: fertilizerType,

          quantity_received: Number(quantity),

          quantity_available: Number(quantity),

          unit_price: Number(unitPrice),

          supplier: supplier

        }

      ]);



    if(error){

      alert(error.message);

    }else{


      alert("Fertilizer stock added successfully!");


      setFertilizerType("");

      setQuantity("");

      setUnitPrice("");

      setSupplier("");


    }


  }





  return (

    <div className="add-stock-page">


      <div className="add-stock-card">


        <div className="logo">

          🌱

        </div>



        <h1>

          Tea SACCO Fertilizer Management System

        </h1>



        <h2>

          Add Fertilizer Stock

        </h2>




        <form onSubmit={addStock}>


          <input

            type="text"

            placeholder="Fertilizer Type"

            value={fertilizerType}

            onChange={(e)=>setFertilizerType(e.target.value)}

            required

          />



          <input

            type="number"

            placeholder="Quantity Received (Bags)"

            value={quantity}

            onChange={(e)=>setQuantity(e.target.value)}

            required

          />



          <input

            type="number"

            placeholder="Unit Price (KSh)"

            value={unitPrice}

            onChange={(e)=>setUnitPrice(e.target.value)}

            required

          />



          <input

            type="text"

            placeholder="Supplier"

            value={supplier}

            onChange={(e)=>setSupplier(e.target.value)}

            required

          />




          <button type="submit">

            Add Stock

          </button>



        </form>


      </div>


    </div>

  );


}


export default AddStock;