import React, { useState } from "react";
import "./Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleReset(e) {
    e.preventDefault();

    alert(`Password reset link will be sent to:\n\n${email}`);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">🔒</div>

        <h1>Forgot Password</h1>

        <p className="subtitle">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;