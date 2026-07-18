import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./Dashboard.css";


function AdminSidebar(){

const navigate = useNavigate();



async function logout(){

await supabase.auth.signOut();

navigate("/");

}



return(

<div className="admin-sidebar">


<h2>
🌱 Tea SACCO
</h2>


<p>
Admin Panel
</p>



<button onClick={()=>navigate("/admin-dashboard")}>

🏠 Dashboard

</button>



<button onClick={()=>navigate("/fertilizer-stock")}>

📦 Fertilizer Stock

</button>



<button onClick={()=>navigate("/farmers")}>

👨‍🌾 Farmers

</button>



<button onClick={()=>navigate("/transactions")}>

🧾 Transactions

</button>



<button onClick={()=>navigate("/credit-management")}>

💳 Credit Management

</button>



<button onClick={()=>navigate("/reports")}>

📊 Reports

</button>




<button 
className="logout-btn"
onClick={logout}
>

🚪 Logout

</button>



</div>

);


}


export default AdminSidebar;