import "./Register.css";
import React, { useState } from "react";
import { supabase } from "./supabaseClient";


function Register() {


  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");





  async function handleRegister(e) {

    e.preventDefault();



    const { data, error } = await supabase.auth.signUp({

      email,
      password,

    });



    if (error) {

      alert(error.message);
      return;

    }



    const { error: userError } = await supabase

      .from("users")

      .insert([
{
  id: crypto.randomUUID(),

  auth_user_id: data.user.id,

  full_name: fullName,

  email: email,

  phone: phone,

  role: "farmer"
}

      ]);



    if (userError) {

      alert(userError.message);
      return;

    }



    alert("Registration successful!");


    setFullName("");
    setPhone("");
    setEmail("");
    setPassword("");


    window.location.href="/";


  }



  return (

    <div className="register-container">


      <div className="register-card">


        <div className="logo">
          🌱
        </div>



        <h1>
          Tea SACCO Fertilizer Management System
        </h1>



        <h2>
          Create Account
        </h2>



  <form onSubmit={handleRegister}>

  <input
    type="text"
    placeholder="Full Name"
    value={fullName}
    onChange={(e)=>setFullName(e.target.value)}
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
    Register
  </button>

</form>


      </div>


    </div>

  );

}


export default Register;