import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./Dashboard.css";


function Reports(){


const [transactions,setTransactions]=useState([]);
const [stock,setStock]=useState([]);



useEffect(()=>{

loadReports();

},[]);



async function loadReports(){


const {data:transactionData}=await supabase

.from("transactions")

.select("*")

.order("created_at",{ascending:false});


setTransactions(transactionData || []);




const {data:stockData}=await supabase

.from("fertilizer-stock")

.select("*");


setStock(stockData || []);


}





const totalSales = transactions.reduce(

(sum,item)=>

sum + Number(item.payment_amount || 0),

0

);





const totalCredit = transactions.reduce(

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





function downloadSalesPDF(){

const doc = new jsPDF();

doc.text(
"Tea SACCO Fertilizer Sales Report",
20,
20
);

autoTable(doc,{

startY:30,

head:[[
"Farmer",
"Fertilizer",
"Quantity",
"Amount",
"Payment"
]],

body: transactions.map(item=>[
item.farmer_name || "N/A",
item.fertilizer_type || "N/A",
item.quantity || 0,
"KSh " + (item.payment_amount || 0),
item.payment_method || "N/A"
])

});

doc.save("Tea_SACCO_Sales_Report.pdf");

}






function downloadStockCSV(){

const headers = [

"Fertilizer",

"Quantity Available",

"Supplier"

];



const rows = stock.map(item=>[

item.fertilizer_type,

item.quantity_available,

item.supplier

]);



const csvContent =

[headers,...rows]

.map(row=>row.join(","))

.join("\n");



const blob = new Blob(

[csvContent],

{type:"text/csv"}

);



const url = URL.createObjectURL(blob);



const link = document.createElement("a");

link.href=url;

link.download="Stock_Report.csv";


link.click();


}





return(


<div className="dashboard-container">



<div className="welcome-card">

<h2>
📊 SACCO Reports
</h2>

<p>
Business performance overview
</p>

</div>




<button
className="confirm-btn"
onClick={downloadSalesPDF}
>

📄 Download Sales Report

</button>




<button
className="confirm-btn"
onClick={downloadStockCSV}
>

📦 Download Stock Report

</button>







<div className="dashboard-cards">



<div className="card">

<h3>
Total Sales
</h3>

<p>
KSh {totalSales.toLocaleString()}
</p>

</div>




<div className="card">

<h3>
Total Transactions
</h3>

<p>
{transactions.length}
</p>

</div>




<div className="card">

<h3>
Outstanding Credit
</h3>

<p>
KSh {totalCredit.toLocaleString()}
</p>

</div>



</div>







<div className="recent-section">


<h2>
Stock Report
</h2>


<table>

<thead>

<tr>

<th>Fertilizer</th>

<th>Available Bags</th>

<th>Supplier</th>

</tr>

</thead>


<tbody>


{

stock.map((item)=>(

<tr key={item.id}>

<td>
{item.fertilizer_type}
</td>


<td>
{item.quantity_available}
</td>


<td>
{item.supplier}
</td>


</tr>

))

}


</tbody>


</table>


</div>







<div className="recent-section">


<h2>
Sales Report
</h2>


<table>


<thead>

<tr>

<th>Farmer</th>

<th>Fertilizer</th>

<th>Quantity</th>

<th>Amount</th>

<th>Payment</th>

</tr>

</thead>



<tbody>


{

transactions.map((item)=>(


<tr key={item.id}>


<td>
{item.farmer_name}
</td>


<td>
{item.fertilizer_type}
</td>


<td>
{item.quantity}
</td>


<td>
KSh {item.payment_amount}
</td>


<td>
{item.payment_method}
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


export default Reports;