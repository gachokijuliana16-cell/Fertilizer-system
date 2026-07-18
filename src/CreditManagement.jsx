import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./CreditManagement.css";


function CreditManagement() {


  const [credits, setCredits] = useState([]);



  useEffect(()=>{

    fetchCredits();

  },[]);




  async function fetchCredits(){


    const { data, error } = await supabase

      .from("transactions")

      .select("*")

      .eq("payment_method","Credit")

      .order("created_at",{ascending:false});



    if(error){

      alert(error.message);

    }else{

      setCredits(data || []);

    }


  }







  async function markAsPaid(id){


    const { error } = await supabase

      .from("transactions")

      .update({

        credit_status:"Paid",

        amount_paid:

        credits.find(item=>item.id===id)?.payment_amount


      })

      .eq("id",id);




    if(error){

      alert(error.message);

    }else{

      alert("Credit payment completed!");

      fetchCredits();

    }


  }







  return (


    <div className="credit-page">


      <h1>
        Tea SACCO Fertilizer Management System
      </h1>



      <div className="credit-card">


        <h2>
          Farmer Credit Management
        </h2>




        <table>


          <thead>


            <tr>

              <th>Farmer</th>

              <th>Fertilizer</th>

              <th>Total Amount</th>

              <th>Amount Paid</th>

              <th>Balance</th>

              <th>Status</th>

              <th>Action</th>


            </tr>


          </thead>





          <tbody>


          {credits.length > 0 ? (


            credits.map((item)=>(


              <tr key={item.id}>


                <td>
                  {item.farmer_name}
                </td>



                <td>
                  {item.fertilizer_type}
                </td>




                <td>
                  KSh {Number(item.payment_amount).toLocaleString()}
                </td>




                <td>
                  KSh {Number(item.amount_paid || 0).toLocaleString()}
                </td>





                <td>

                  KSh {

                    (

                      Number(item.payment_amount || 0)

                      -

                      Number(item.amount_paid || 0)

                    ).toLocaleString()

                  }

                </td>





                <td>


                  <span

                    className={

                      item.credit_status==="Paid"

                      ?

                      "paid"

                      :

                      "pending"

                    }

                  >


                    {

                    item.credit_status==="Paid"

                    ?

                    "Paid"

                    :

                    "Pending"

                    }


                  </span>


                </td>






                <td>


                {

                item.credit_status !== "Paid" && (


                  <button

                    onClick={()=>markAsPaid(item.id)}

                  >

                    Mark as Paid

                  </button>


                )


                }


                </td>




              </tr>


            ))


          ) : (


            <tr>


              <td

              colSpan="7"

              style={{textAlign:"center"}}

              >

                No credit records found.

              </td>


            </tr>


          )}



          </tbody>


        </table>


      </div>


    </div>


  );


}


export default CreditManagement;