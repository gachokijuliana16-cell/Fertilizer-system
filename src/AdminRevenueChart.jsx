import React from "react";
import { Bar } from "react-chartjs-2";

import {
Chart as ChartJS,
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
} from "chart.js";


ChartJS.register(
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
);



function AdminRevenueChart({transactions}){


const data = {

labels: transactions.map(
(item)=>item.fertilizer_type
),


datasets:[

{

label:"Revenue (KSh)",

data: transactions.map(
(item)=>Number(item.payment_amount || 0)
),

backgroundColor:[
"#2e7d32",
"#43a047",
"#66bb6a",
"#81c784",
"#a5d6a7"
],

borderColor:"#1b5e20",

borderWidth:2

}

]

};



return (

<div className="chart-card">

<h2>
Sales Revenue
</h2>


<Bar data={data}/>


</div>

);


}


export default AdminRevenueChart;