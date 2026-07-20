import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function handleLogin(e) {
  e.preventDefault();

  alert("Login clicked");

  window.location.href = "/warehouse-dashboard";
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <div className="links">

          <button
            type="button"
            onClick={() => window.location.href = "/register"}
          >
            Create Account
          </button>

          <button
            type="button"
            onClick={() => window.location.href = "/forgot-password"}
          >
            Forgot Password?
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;