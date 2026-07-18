import AdminSidebar from "./AdminSidebar";
import AdminStockChart from "./AdminStockChart";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./Dashboard.css";
import AdminRevenueChart from "./AdminRevenueChart";


function AdminDashboard(){

const [stock,setStock]=useState([]);
const [farmers,setFarmers]=useState(0);
const [transactions,setTransactions]=useState([]);
const [revenue,setRevenue]=useState(0);
const [credit,setCredit]=useState(0);
const [lowStock,setLowStock]=useState(0);



useEffect(()=>{

loadAdminData();

},[]);



async function loadAdminData(){


const {data:stockData,error:stockError}=await supabase
.from("fertilizer-stock")
.select("*");


if(stockError){

console.log(stockError.message);

}
else if(stockData){

setStock(stockData);


const low = stockData.filter(

item => Number(item.quantity_available) < 20

);


setLowStock(low.length);

}





const {count:farmersCount}=await supabase

.from("farmers")

.select("id",{count:"exact",head:true});


setFarmers(farmersCount || 0);






const {data:transactionData,error:transactionError}=await supabase

.from("transactions")

.select("*")

.order("created_at",{ascending:false});



if(transactionError){

console.log(transactionError.message);

}
else if(transactionData){


setTransactions(transactionData);



const totalRevenue = transactionData.reduce(

(sum,item)=>

sum + Number(item.payment_amount || 0),

0

);


setRevenue(totalRevenue);





const outstandingCredit = transactionData.reduce(

(sum,item)=>{


if(item.payment_method==="SACCO Credit"){

return sum +

(

Number(item.payment_amount || 0)

-

Number(item.amount_paid || 0)

);

}


return sum;


},

0

);



setCredit(outstandingCredit);


}


}





const totalStock = stock.reduce(

(sum,item)=>

sum + Number(item.quantity_available || 0),

0

);





return(

<div className="dashboard-container">
<AdminSidebar />    



<div className="welcome-card">

<h2>
Admin Dashboard 👋
</h2>

<p>
Tea SACCO Management Panel
</p>

</div>





<div className="dashboard-cards">



<div className="card">

<h3>
📦 Total Stock
</h3>

<p>
{totalStock} Bags
</p>

</div>





<div className="card">

<h3>
👨‍🌾 Farmers
</h3>

<p>
{farmers}
</p>

</div>





<div className="card">

<h3>
💰 Revenue
</h3>

<p>
KSh {revenue.toLocaleString()}
</p>

</div>





<div className="card">

<h3>
💳 Credit
</h3>

<p>
KSh {credit.toLocaleString()}
</p>

</div>





<div className="card">

<h3>
🧾 Transactions
</h3>

<p>
{transactions.length}
</p>

</div>





<div className="card">

<h3>
⚠️ Low Stock
</h3>

<p>
{lowStock}
</p>

</div>




</div>





<AdminRevenueChart 
transactions={transactions}
/>
<AdminStockChart 
stock={stock}
/>






<div className="recent-section">


<h2>
Recent Fertilizer Transactions
</h2>



<table>


<thead>

<tr>

<th>Farmer</th>

<th>Fertilizer</th>

<th>Quantity</th>

<th>Amount</th>

<th>Payment</th>

<th>Date</th>

</tr>

</thead>



<tbody>


{

transactions.slice(0,5).map((item)=>(


<tr key={item.id}>


<td>
{item.farmer_name}
</td>


<td>
{item.fertilizer_type}
</td>


<td>
{item.quantity} Bags
</td>


<td>
KSh {Number(item.payment_amount || 0).toLocaleString()}
</td>


<td>
{item.payment_method}
</td>


<td>
{new Date(item.created_at).toLocaleDateString()}
</td>


</tr>


))

}


</tbody>


</table>


</div>





</div>

);


}


export default AdminDashboard;