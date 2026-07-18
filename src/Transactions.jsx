import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./Transactions.css";


function Transactions() {


  const [transactions, setTransactions] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);

  const [farmerName, setFarmerName] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");



  useEffect(()=>{

    fetchTransactions();
    fetchFertilizers();

  },[]);





  async function fetchTransactions(){

    const {data,error}=await supabase

      .from("transactions")

      .select("*")

      .order("created_at",{ascending:false});


    if(error){

      alert(error.message);

    }else{

      setTransactions(data || []);

    }

  }





  async function fetchFertilizers(){

    const {data,error}=await supabase

      .from("fertilizer-stock")

      .select("*");


    if(error){

      alert(error.message);

    }else{

      setFertilizers(data || []);

    }

  }





  function handleFertilizerChange(e){

    const selected=e.target.value;

    setFertilizerType(selected);


    const fertilizer=fertilizers.find(

      item=>item.fertilizer_type===selected

    );


    if(fertilizer){

      setUnitPrice(Number(fertilizer.unit_price || 0));

    }

  }





  const totalAmount=

    Number(quantity || 0) * unitPrice;







  async function addTransaction(e){

    e.preventDefault();


    let status="Completed";
    let creditStatus=null;



    if(paymentMethod==="M-Pesa STK Push"){

      status="Pending";

    }



    if(paymentMethod==="Credit"){

      status="Pending";

      creditStatus="Pending";

    }





    const {data:fertilizer,error:stockError}=await supabase

      .from("fertilizer-stock")

      .select("*")

      .eq("fertilizer_type",fertilizerType)

      .limit(1)

      .maybeSingle();





    if(stockError){

      alert(stockError.message);

      return;

    }





    if(Number(fertilizer.quantity_available)<Number(quantity)){


      alert("Not enough fertilizer available.");

      return;


    }





    const remainingStock=

      Number(fertilizer.quantity_available)-Number(quantity);





    const {error:updateError}=await supabase

      .from("fertilizer-stock")

      .update({

        quantity_available:remainingStock

      })

      .eq("id",fertilizer.id);





    if(updateError){

      alert(updateError.message);

      return;

    }







    const {error}=await supabase

      .from("transactions")

      .insert([{


        farmer_name:farmerName,

        fertilizer_type:fertilizerType,

        unit_price:unitPrice,

        quantity:Number(quantity),

        payment_amount:totalAmount,

        payment_method:paymentMethod,


        phone_number:

        paymentMethod==="M-Pesa STK Push"

        ? phoneNumber

        : null,


        payment_status:status,

        credit_status:creditStatus,


        amount_paid:

        paymentMethod==="Credit"

        ? Number(amountPaid || 0)

        : totalAmount


      }]);





    if(error){

      alert(error.message);


    }else{


      alert("Transaction saved successfully!");



      setFarmerName("");

      setFertilizerType("");

      setUnitPrice(0);

      setQuantity("");

      setPaymentMethod("");

      setPhoneNumber("");

      setAmountPaid("");



      fetchTransactions();

      fetchFertilizers();


    }


  }







  return (

    <div className="transactions-page">


      <h1>
        Tea SACCO Fertilizer Management System
      </h1>



      <div className="transaction-card">


        <h2>
          Record Fertilizer Sale
        </h2>



        <form onSubmit={addTransaction}>



          <input

            type="text"

            placeholder="Farmer Name"

            value={farmerName}

            onChange={(e)=>setFarmerName(e.target.value)}

            required

          />





          <select

            value={fertilizerType}

            onChange={handleFertilizerChange}

            required

          >

            <option value="">

              Select Fertilizer

            </option>


            {fertilizers.map((item)=>(

              <option

                key={item.id}

                value={item.fertilizer_type}

              >

                {item.fertilizer_type}

              </option>

            ))}


          </select>





          <input

            type="text"

            value={`KSh ${unitPrice.toLocaleString()}`}

            readOnly

          />





          <input

            type="number"

            placeholder="Quantity (Bags)"

            value={quantity}

            onChange={(e)=>setQuantity(e.target.value)}

            required

          />





          <input

            type="text"

            value={`KSh ${totalAmount.toLocaleString()}`}

            readOnly

          />






          <div className="payment-section">


            <h3>
              Select Payment Method
            </h3>



            <div className="payment-options">



              <button

              type="button"

              className={paymentMethod==="M-Pesa STK Push" ? "active-payment":""}

              onClick={()=>setPaymentMethod("M-Pesa STK Push")}

              >

              📱 M-Pesa STK Push

              </button>




              <button

              type="button"

              className={paymentMethod==="Cash" ? "active-payment":""}

              onClick={()=>setPaymentMethod("Cash")}

              >

              💵 Cash

              </button>




              <button

              type="button"

              className={paymentMethod==="Credit" ? "active-payment":""}

              onClick={()=>setPaymentMethod("Credit")}

              >

              📄 Credit

              </button>



            </div>


          </div>







          {paymentMethod==="M-Pesa STK Push" && (

            <input

              type="text"

              placeholder="M-Pesa Phone Number"

              value={phoneNumber}

              onChange={(e)=>setPhoneNumber(e.target.value)}

              required

            />

          )}






          {paymentMethod==="Credit" && (

            <input

              type="number"

              placeholder="Amount Paid"

              value={amountPaid}

              onChange={(e)=>setAmountPaid(e.target.value)}

            />

          )}






          <button type="submit">

            Save Transaction

          </button>




        </form>


      </div>


    </div>

  );

}


export default Transactions;