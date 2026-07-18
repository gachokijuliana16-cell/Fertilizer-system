import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./Dashboard.css";
import "./BuyFertilizer.css";


function BuyFertilizer() {

  const [farmer, setFarmer] = useState({});
  const [fertilizers, setFertilizers] = useState([]);
  const [selectedFertilizer, setSelectedFertilizer] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
const [mpesaReference, setMpesaReference] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState("");


  useEffect(() => {

    getFarmer();
    getFertilizers();

  }, []);


  async function getFarmer() {

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) return;


    const { data, error } = await supabase

      .from("users")

      .select("*")

       .eq("id", authData.user.id)

      .single();


    if (!error) {

      setFarmer(data);

    }

  }



  async function getFertilizers() {


    const { data, error } = await supabase

      .from("fertilizer-stock")

      .select("*");


    if (!error) {

      setFertilizers(data);

    }

  }



  function calculateTotal() {


    const fertilizer = fertilizers.find(

      item => item.fertilizer_type === selectedFertilizer

    );


    if (fertilizer) {

      setTotalAmount(

        Number(fertilizer.unit_price) * Number(quantity)

      );

    }

  }



  useEffect(()=>{

    calculateTotal();

  },[selectedFertilizer, quantity, fertilizers]);





  async function completePurchase() {


    if(!paymentMethod){

      alert("Please select payment method");

      return;

    }



    const fertilizer = fertilizers.find(

      item => item.fertilizer_type === selectedFertilizer

    );



    if(!fertilizer){

      alert("Select fertilizer");

      return;

    }



    if(quantity > fertilizer.quantity_available){

      alert("Not enough stock available");

      return;

    }




    // Save transaction

    const { error: transactionError } = await supabase

      .from("transactions")

      .insert([{

        farmer_name: farmer.full_name,

        fertilizer_type: fertilizer.fertilizer_type,

        quantity: quantity,

        payment_amount: totalAmount,

        payment_method: paymentMethod,

        phone_number:

paymentMethod === "M-Pesa"

? phoneNumber

: farmer.phone,


mpesa_reference:

paymentMethod === "M-Pesa"

? mpesaReference

: null,

        payment_status:

          paymentMethod === "SACCO Credit"

          ? "Pending"

          : "Paid",

        credit_status:

          paymentMethod === "SACCO Credit"

          ? "Requested"

          : "Not Applicable",

        amount_paid:

          paymentMethod === "Cash" || paymentMethod === "M-Pesa"

          ? totalAmount

          : 0,

        unit_price: fertilizer.unit_price


      }]);



    if(transactionError){

      alert(transactionError.message);

      return;

    }



    // Reduce stock

    await supabase

      .from("fertilizer-stock")

      .update({

        quantity_available:

          fertilizer.quantity_available - quantity

      })

      .eq("id", fertilizer.id);



    setMessage("Purchase completed successfully!");

  }





return (

<div className="buy-container">


<h1>Buy Fertilizer</h1>


<div className="buy-card">


<h3>
Welcome {farmer.full_name}
</h3>



<label>
Select Fertilizer
</label>


<select

value={selectedFertilizer}

onChange={(e)=>setSelectedFertilizer(e.target.value)}

>

<option value="">
Choose fertilizer
</option>


{

fertilizers.map(item=>(

<option key={item.id}>

{item.fertilizer_type}

</option>

))

}


</select>




<label>
Quantity
</label>


<input

type="number"

min="1"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

/>



<h3>

Total: KSh {totalAmount.toLocaleString()}

</h3>



<h3>
Choose Payment Method
</h3>


<div className="payment-buttons">

<button

className={paymentMethod==="M-Pesa" ? "active-payment":""}

onClick={()=>setPaymentMethod("M-Pesa")}

>

📱 M-Pesa

</button>


<button

className={paymentMethod==="Cash" ? "active-payment":""}

onClick={()=>setPaymentMethod("Cash")}

>

💵 Cash

</button>


<button

className={paymentMethod==="SACCO Credit" ? "active-payment":""}

onClick={()=>setPaymentMethod("SACCO Credit")}

>

💳 SACCO Credit

</button>


</div>


<p>

Selected:
{paymentMethod}

</p>
{
  paymentMethod === "M-Pesa" && (

    <div className="payment-details">

      <h3>M-Pesa Payment</h3>

      <label>
        Phone Number
      </label>

<input

type="text"

placeholder="07XXXXXXXX"

value={phoneNumber}

onChange={(e)=>setPhoneNumber(e.target.value)}

/>    


      <label>
        M-Pesa Reference
      </label>

      <input

        type="text"

        placeholder="Enter transaction code"

        value={mpesaReference}

        onChange={(e)=>setMpesaReference(e.target.value)}

      />

    </div>

  )
}



{
  paymentMethod === "Cash" && (

    <div className="payment-details">

      <h3>💵 Cash Payment</h3>

      <p>
        Farmer will pay cash at the warehouse.
      </p>

      <p>
        Warehouse manager will confirm payment.
      </p>

    </div>

  )
}



{
  paymentMethod === "SACCO Credit" && (

    <div className="payment-details">

      <h3>💳 SACCO Credit</h3>

      <p>
        Your credit request will be sent for approval.
      </p>

      <p>
        Available credit will be checked before approval.
      </p>

    </div>

  )
}



<button

className="confirm-btn"

onClick={completePurchase}

>

Confirm Purchase

</button>



<p>

{message}

</p>



</div>


</div>

);


}


export default BuyFertilizer;