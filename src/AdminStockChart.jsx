import React from "react";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



function AdminStockChart({stock}){


const data = {


labels: stock.map(
(item)=>item.fertilizer_type
),


datasets:[

{

label:"Stock Available",

data:stock.map(

(item)=>Number(item.quantity_available || 0)

),

backgroundColor:[

"#1b5e20",
"#388e3c",
"#66bb6a",
"#9ccc65",
"#c5e1a5"

],

borderColor:"#ffffff",

borderWidth:2

}

]


};



return(

<div className="chart-card">

<h2>
Stock Distribution
</h2>


<Pie data={data}/>


</div>

);


}


export default AdminStockChart;