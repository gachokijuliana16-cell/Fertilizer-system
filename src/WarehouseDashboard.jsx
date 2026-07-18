import RevenueChart from "./RevenueChart";
import StockChart from "./StockChart";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Sidebar from "./Sidebar";
import "./Dashboard.css";


function WarehouseDashboard() {


const [stock, setStock] = useState([]);
const [farmers, setFarmers] = useState(0);
const [transactions, setTransactions] = useState(0);
const [transactionList, setTransactionList] = useState([]);
const [search, setSearch] = useState("");
const [totalRevenue, setTotalRevenue] = useState(0);
const [creditOutstanding, setCreditOutstanding] = useState(0);
const [lowStockItems, setLowStockItems] = useState(0);  
const [managerName, setManagerName] = useState("");



useEffect(() => {

  getDashboardData();
  getManager();

}, []);




async function getManager() {

  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) return;

  const { data: profile, error } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", authData.user.id)
    .single();

  if (!error && profile) {
    setManagerName(profile.full_name);
  }
}
  async function getDashboardData(){



    // Get fertilizer stock

    const { data: stockData, error: stockError } = await supabase

      .from("fertilizer-stock")

      .select("*")

      .order("created_at",{ascending:false});



    if(stockError){

      console.log(stockError.message);

    }else{

      setStock(stockData || []);
      const lowStock = stockData.filter(

item => Number(item.quantity_available) < 20

);

setLowStockItems(lowStock.length);

    }





    // Get farmers count

    const { count: farmerCount, error: farmerError } = await supabase

      .from("farmers")

      .select("id", {count:"exact", head:true});



    if(farmerError){

      console.log(farmerError.message);

    }else{

      setFarmers(farmerCount || 0);

    }





    const { data: transactionData, error: transactionError } =
await supabase
.from("transactions")
.select("*");

if(transactionError){

console.log(transactionError.message);

}else{

setTransactions(transactionData.length);

setTransactionList(transactionData);

const revenue = transactionData.reduce(

(sum,item)=>

sum + Number(item.payment_amount || 0),

0

);

setTotalRevenue(revenue);

const credit = transactionData.reduce(

(sum,item)=>

sum +

(Number(item.payment_amount||0)

-

Number(item.amount_paid||0)),

0

);

setCreditOutstanding(credit);

}

    }



  





  async function handleLogout(){

    await supabase.auth.signOut();

    window.location.href="/";

  }





  const totalBags = stock.reduce(

    (sum,item)=>

      sum + Number(item.quantity_available || 0),

    0

  );





  const inventoryValue = stock.reduce(

    (sum,item)=>

      sum +

      Number(item.quantity_available || 0) *

      Number(item.unit_price || 0),

    0

  );





  const filteredStock = stock.filter((item)=>

    item.fertilizer_type

    ?.toLowerCase()

    .includes(search.toLowerCase())

  );




const today = new Date().toLocaleDateString("en-KE",{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

});
  return (


    <div className="dashboard-container">



      <header className="dashboard-header">


        <h1>

          Tea SACCO Fertilizer Management System

        </h1>



        <button onClick={handleLogout}>

          Logout

        </button>


      </header>





      <Sidebar />
      <div className="welcome-card">

<h2>

Welcome back 👋

</h2>

<h3>{managerName || "Warehouse Manager"}</h3>

<p>Warehouse Manager</p>

<span>

{today}

</span>

</div>





      <div className="dashboard-cards">



        <div className="card">


          <h3>

            Total Fertilizer Stock

          </h3>


          <p>

            {totalBags} Bags

          </p>


        </div>





        <div className="card">


          <h3>

            Farmers

          </h3>


          <p>

            {farmers} Members

          </p>


        </div>





        <div className="card">


          <h3>

            Inventory Value

          </h3>


          <p>

            KSh {inventoryValue.toLocaleString()}

          </p>


        </div>




<div className="card">

  <h3>Transactions</h3>

  <p>{transactions}</p>

</div>

<div className="card">

  <h3>Revenue</h3>

  <p>KSh {totalRevenue.toLocaleString()}</p>

</div>

<div className="card">

  <h3>Outstanding Credit</h3>

  <p>KSh {creditOutstanding.toLocaleString()}</p>

</div>

<div className="card">

  <h3>Low Stock</h3>

  <p>{lowStockItems}</p>

</div>



</div>
<div className="charts-container">

  <RevenueChart revenue={totalRevenue} />

  <StockChart stock={stock} />

</div>


<div className="notifications">  

<h2>

Notifications

</h2>

<p>

🔴 {lowStockItems} fertilizer types are running low.

</p>

<p>

🟡 Outstanding Credit:

KSh {creditOutstanding.toLocaleString()}

</p>

<p>

🟢 Total Revenue:

KSh {totalRevenue.toLocaleString()}

</p>

</div>
      <div className="recent-section">



        <h2>

          Recent Inventory Activities

        </h2>





        <input

          type="text"

          placeholder="Search fertilizer..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="search-box"

        />





        <table>



          <thead>


            <tr>

              <th>Fertilizer</th>

              <th>Quantity</th>

              <th>Supplier</th>

              <th>Date Added</th>


            </tr>


          </thead>





          <tbody>



          {filteredStock.map((item)=>(



            <tr key={item.id}>


              <td>

                {item.fertilizer_type}

              </td>



              <td>

                {item.quantity_available} Bags

              </td>



              <td>

                {item.supplier}

              </td>



              <td>

                {item.created_at

                ? new Date(item.created_at).toLocaleDateString()

                : "No Date"}


              </td>



            </tr>



          ))}



          </tbody>




        </table>



      </div>




    </div>


  );


}

export default WarehouseDashboard;