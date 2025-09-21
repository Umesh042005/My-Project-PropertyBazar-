// src/components/Login.js
import React, { useState } from "react";
import "./Login.css"; // ensure this file exists

export default function Login({ closeModal, setToken }) {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // eye toggle
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    // ✅ Backend expects both username & email for signup
    const body = isLogin
      ? { username: email, password } // login
      : { username: email, email: email, password }; // signup

    try {
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
       if (data.token) {
  localStorage.setItem("token", data.token);

  // ✅ Save email for avatar & owner checks
  localStorage.setItem("email", email);

  if (typeof setToken === "function") setToken(data.token);
  closeModal();
  return;
}
        // Signup success without token
        alert(isLogin ? "Logged in successfully." : "Registered successfully. Please login.");
        if (!isLogin) setIsLogin(true);
      } else {
        alert(data.error || (isLogin ? "Login failed" : "Signup failed"));
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Server error. Check backend or CORS.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="text-center mb-3">{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email / Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
             <input
  type={showPassword ? "text" : "password"}
  className="form-control"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  autoComplete="current-password" // ✅ add this
/>

              <button
                type="button"
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="btn btn-outline-secondary"
                style={{ marginLeft: 8 }}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => {
              setIsLogin(!isLogin);
              setPassword("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <button className="btn btn-secondary w-100 mt-2" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}
