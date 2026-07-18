import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./Login.css";


function Login() {


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");



  async function handleLogin(e){

    e.preventDefault();



    const {data,error} = await supabase.auth.signInWithPassword({

      email,

      password

    });



    if(error){

      alert(error.message);

      return;

    }



    const {data:userData,error:userError} = await supabase

      .from("users")

      .select("role")

      .eq("id", data.user.id)

      .single();



    if(userError){

      alert(userError.message);

      return;

    }



    if(userData.role === "farmer"){

      window.location.href="/farmer-dashboard";

    }

    else if(userData.role === "warehouse_manager"){

      const { data: profile, error } = await supabase
  .from("users")
  .select("role")
  .eq("id", data.user.id)
  .single();


if(error){

  console.log(error.message);

  return;

}


if(profile.role === "admin"){

  window.location.href="/admin-dashboard";

}

else if(profile.role === "warehouse"){

  window.location.href="/warehouse-dashboard";

}

else if(profile.role === "farmer"){

  window.location.href="/farmer-dashboard";

}

    }

    else if(userData.role === "admin"){

      window.location.href="/admin-dashboard";

    }

    else{

      alert("Role not assigned.");

    }



  }



  return (

    <div className="login-container">


      <div className="login-card">


        <div className="logo">
          🌱
        </div>



        <h1>
          Tea SACCO Fertilizer Management System
        </h1>



        <form onSubmit={handleLogin}>


          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />



          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />



          <button type="submit">

            Login

          </button>



        </form>




        <div className="links">


          <button

            type="button"

            onClick={()=>window.location.href="/register"}

          >

            Create Account

          </button>




          <button

            type="button"

            onClick={()=>window.location.href="/forgot-password"}

          >

            Forgot Password?

          </button>



        </div>


      </div>


    </div>

  );


}


export default Login;