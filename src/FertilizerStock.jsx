import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./FertilizerStock.css";


function FertilizerStock() {


  const [stock, setStock] = useState([]);

  const [search, setSearch] = useState("");



  useEffect(() => {

    fetchStock();

  }, []);




  async function fetchStock() {


    const { data, error } = await supabase

      .from("fertilizer-stock")

      .select("*")

      .order("created_at", { ascending:false });



    if(error){

      alert(error.message);

    }else{

      setStock(data || []);

    }

  }





  async function deleteStock(id) {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fertilizer?"
    );


    if(!confirmDelete){

      return;

    }



    const { error } = await supabase

      .from("fertilizer-stock")

      .delete()

      .eq("id", id);



    if(error){

      alert(error.message);

    }else{

      alert("Fertilizer deleted successfully!");

      fetchStock();

    }

  }





  const totalBags = stock.reduce(

    (sum, item) =>

      sum + Number(item.quantity_available || 0),

    0

  );





  const inventoryValue = stock.reduce(

    (sum, item) =>

      sum +

      Number(item.quantity_available || 0) *

      Number(item.unit_price || 0),

    0

  );





  const filteredStock = stock.filter((item) =>

    item.fertilizer_type

    ?.toLowerCase()

    .includes(search.toLowerCase())

    ||

    item.supplier

    ?.toLowerCase()

    .includes(search.toLowerCase())

  );





  return (


    <div className="stock-page">


      <h1>

        Tea SACCO Fertilizer Management System

      </h1>





      <div className="stock-summary">


        <div className="summary-card">


          <h3>

            Total Bags

          </h3>


          <p>

            {totalBags} Bags

          </p>


        </div>





        <div className="summary-card">


          <h3>

            Inventory Value

          </h3>


          <p>

            KSh {inventoryValue.toLocaleString()}

          </p>


        </div>


      </div>





      <div className="stock-card">


        <h2>

          Fertilizer Stock

        </h2>





        <input

          type="text"

          placeholder="Search fertilizer or supplier..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="search-box"

        />





        <table>


          <thead>


            <tr>


              <th>Fertilizer</th>

              <th>Available Bags</th>

              <th>Unit Price</th>

              <th>Supplier</th>

              <th>Date Received</th>

              <th>Status</th>

              <th>Actions</th>


            </tr>


          </thead>





          <tbody>


          {filteredStock.length > 0 ? (


            filteredStock.map((item)=>(


              <tr key={item.id}>


                <td>

                  {item.fertilizer_type}

                </td>



                <td>

                  {item.quantity_available} Bags

                </td>



                <td>

                  KSh {Number(item.unit_price || 0).toLocaleString()}

                </td>



                <td>

                  {item.supplier}

                </td>



                <td>

                  {item.created_at

                  ? new Date(item.created_at).toLocaleDateString()

                  : "No Date"}

                </td>



                <td>


                  <span

                    className={

                      Number(item.quantity_available) < 20

                      ? "status-low"

                      : "status-available"

                    }

                  >

                    {

                      Number(item.quantity_available) < 20

                      ? "Low Stock"

                      : "Available"

                    }


                  </span>


                </td>




                <td>


                  <button

                    className="delete-btn"

                    onClick={()=>deleteStock(item.id)}

                  >

                    🗑 Delete

                  </button>


                </td>



              </tr>


            ))


          ) : (


            <tr>


              <td colSpan="7"

              style={{textAlign:"center", padding:"20px"}}

              >

                No fertilizer found.

              </td>


            </tr>


          )}


          </tbody>


        </table>


      </div>

<td>

  <button

    className="delete-btn"

    onClick={()=>deleteStock(item.id)}

  >

    🗑 Delete

  </button>

</td>
    </div>


  );


}


export default FertilizerStock;