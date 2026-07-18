import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./Dashboard.css";

function FarmerDashboard() {

  const [userName, setUserName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
  const [creditBalance, setCreditBalance] = useState(0);
  const [purchases, setPurchases] = useState(0);
  const [receipts, setReceipts] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);


  useEffect(() => {

    loadFarmerData();

  }, []);



  async function loadFarmerData() {


    const { data: authData } = await supabase.auth.getUser();


    if (!authData.user) return;



    const { data: profile, error: profileError } = await supabase

  .from("users")

  .select("full_name,email,phone")

  .eq("id", authData.user.id)

  .single();



    if (profileError) {

      console.log(profileError.message);

      return;

    }



    setUserName(profile.full_name);
setEmail(profile.email);
setPhone(profile.phone);



    // Get farmer transactions

    const { data: transactions, error: transactionError } = await supabase

      .from("transactions")

      .select("*")

      .eq("farmer_name", profile.full_name)

      .order("created_at", { ascending: false });



    if (transactionError) {

      console.log(transactionError.message);

      return;

    }



    if (transactions) {


      // Number of purchases

      setPurchases(transactions.length);



      // Number of receipts

      setReceipts(transactions.length);



      // Store purchase history

      setPurchaseHistory(transactions);



      // Calculate credit balance

      const credit = transactions.reduce(

        (total, item) => {


          if (item.payment_method === "SACCO Credit") {


            return total +

              (

                Number(item.payment_amount || 0)

                -

                Number(item.amount_paid || 0)

              );

          }


          return total;


        },

        0

      );


      setCreditBalance(credit);


    }


  }





const today = new Date().toLocaleDateString("en-KE", {

  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",

});


function viewReceipt(transaction){

  localStorage.setItem(
    "receiptData",
    JSON.stringify(transaction)
  );

  window.location.href="/receipt";

}




  return (

    <div className="dashboard-container">


<div className="profile-card">

  <div className="profile-icon">
    👨‍🌾
  </div>


  <div>

    <h2>
      Farmer Profile
    </h2>

    <p>
      Name: {userName}
    </p>

    <p>
      Phone: {phone}
    </p>

    <p>
      Email: {email}
    </p>

<span>
  Active Farmer Account ✓
</span>

  </div>


</div>
      <div className="welcome-card">


        <h2>
          Welcome Back 👋
        </h2>


        <h3>
          {userName}
        </h3>


        <p>
          Farmer
        </p>



        <button

          onClick={() => window.location.href="/buy-fertilizer"}

        >

          Buy Fertilizer

        </button>



        <span>
          {today}
        </span>


      </div>





      <div className="dashboard-cards">


<div className="card">

  <div className="card-icon">
    🛒
  </div>

  <h3>
    My Purchases
  </h3>

  <p>
    {purchases}
  </p>

  <span>
    Fertilizer Orders
  </span>

</div>



<div className="card">

  <div className="card-icon">
    💳
  </div>

  <h3>
    Credit Balance
  </h3>

  <p>
    KSh {creditBalance.toLocaleString()}
  </p>

  <span>
    Outstanding Credit
  </span>

</div>



<div className="card">

  <div className="card-icon">
    🧾
  </div>

  <h3>
    Receipts
  </h3>

  <p>
    {receipts}
  </p>

  <span>
    Payment Records
  </span>

</div>



      </div>





      <div className="recent-section">


        <h2>
          My Purchase History
        </h2>



        <table>


          <thead>


            <tr>

              <th>Fertilizer</th>

              <th>Quantity</th>

              <th>Amount</th>

              <th>Payment</th>

              <th>Date</th>
              <th>Action</th>


            </tr>


          </thead>




          <tbody>


          {

            purchaseHistory.map((item)=>(


              <tr key={item.id}>


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


<td>

<button
  className="receipt-btn"
  onClick={() => viewReceipt(item)}
>

  View Receipt

</button>

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


export default FarmerDashboard;