import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./Farmers.css";


function Farmers() {


  const [farmers, setFarmers] = useState([]);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [membership, setMembership] = useState("");

  const [editId, setEditId] = useState(null);

const [search,setSearch]=useState("");

const [selectedFarmer,setSelectedFarmer]=useState(null);



  useEffect(()=>{

    fetchFarmers();

  },[]);





  async function fetchFarmers(){


    const { data, error } = await supabase

      .from("farmers")

      .select("*")

      .order("id",{ascending:false});



    if(error){

      alert(error.message);

    }else{

      setFarmers(data || []);

    }

  }





  async function saveFarmer(e){


    e.preventDefault();



    if(editId){


      const {error}=await supabase

        .from("farmers")

        .update({

          full_name:name,

          phone_number:phone,

          membership_number:membership

        })

        .eq("id",editId);



      if(error){

        alert(error.message);

      }else{

        alert("Farmer updated successfully!");

      }



    }else{


      const {error}=await supabase

        .from("farmers")

        .insert([

          {

            full_name:name,

            phone_number:phone,

            membership_number:membership

          }

        ]);



      if(error){

        alert(error.message);

      }else{

        alert("Farmer added successfully!");

      }


    }



    clearForm();

    fetchFarmers();


  }





  function editFarmer(farmer){


    setEditId(farmer.id);

    setName(farmer.full_name);

    setPhone(farmer.phone_number);

    setMembership(farmer.membership_number);


  }





  async function deleteFarmer(id){


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this farmer?"
    );



    if(!confirmDelete){

      return;

    }



    const {error}=await supabase

      .from("farmers")

      .delete()

      .eq("id",id);



    if(error){

      alert(error.message);

    }else{

      alert("Farmer deleted successfully!");

      fetchFarmers();

    }


  }





  function clearForm(){


    setName("");

    setPhone("");

    setMembership("");

    setEditId(null);


  }





const filteredFarmers = farmers.filter((farmer)=>

farmer.full_name.toLowerCase().includes(search.toLowerCase()) ||

farmer.phone_number.toLowerCase().includes(search.toLowerCase()) ||

farmer.membership_number.toLowerCase().includes(search.toLowerCase())

); 
  return (

    <div className="farmers-page">


      <h1>
        Tea SACCO Fertilizer Management System
      </h1>




      <div className="farmers-card">


        <h2>

          {editId ? "Edit Farmer" : "Register Farmer"}

        </h2>




        <form onSubmit={saveFarmer}>


          <input

            type="text"

            placeholder="Farmer Full Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            required

          />



          <input

            type="text"

            placeholder="Phone Number"

            value={phone}

            onChange={(e)=>setPhone(e.target.value)}

            required

          />



          <input

            type="text"

            placeholder="Membership Number"

            value={membership}

            onChange={(e)=>setMembership(e.target.value)}

            required

          />



          <button type="submit">

            {editId ? "Update Farmer" : "Add Farmer"}

          </button>


        </form>


      </div>





      <div className="farmers-card">


        <h2>
          Registered Farmers
        </h2>
        <input

type="text"

placeholder="🔍 Search farmer..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="search-box"

/>




        <table>


          <thead>

            <tr>

              <th>Name</th>

              <th>Phone Number</th>

              <th>Membership Number</th>

              <th>Actions</th>

            </tr>

          </thead>




          <tbody>


          {filteredFarmers.map((farmer)=>(


            <tr key={farmer.id}>


              <td>
                {farmer.full_name}
              </td>


              <td>
                {farmer.phone_number}
              </td>


              <td>
                {farmer.membership_number}
              </td>


            <td>

<button
className="view-btn"
onClick={()=>setSelectedFarmer(farmer)}
>
👁 View
</button>

<button
className="edit-btn"
onClick={()=>editFarmer(farmer)}
>
✏️ Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteFarmer(farmer.id)}
>
🗑 Delete
</button>

</td>


            </tr>


          ))}


          </tbody>


        </table>


      </div>

{selectedFarmer && (

<div className="farmer-modal">

<div className="farmer-modal-card">

<h2>👨‍🌾 Farmer Details</h2>

<p><strong>Name:</strong> {selectedFarmer.full_name}</p>

<p><strong>Phone:</strong> {selectedFarmer.phone_number}</p>

<p><strong>Membership:</strong> {selectedFarmer.membership_number}</p>

<button
className="confirm-btn"
onClick={()=>setSelectedFarmer(null)}
>
Close
</button>

</div>

</div>

)}
    </div>

  );

}


export default Farmers;