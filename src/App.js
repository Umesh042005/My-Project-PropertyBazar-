// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import EditProperty from "./components/EditProperty";
import AddProperty from "./pages/AddProperty";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./components/Login";

import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showModal, setShowModal] = useState(false);

  // Load properties from localStorage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(stored);
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  // Add new property to list
  const handleAdd = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <div className="app-background">
        {/* Logo overlay */}
        <div className="logo-overlay">
          <img src="/Untitled design.png" alt="logo" />
        </div>

        <Navbar />

        {/* Auth buttons */}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          {!token && (
            <button onClick={() => setShowModal(true)}>Login / Signup</button>
          )}
          {token && <button onClick={handleLogout}>Logout</button>}
        </div>

        {showModal && (
          <Login closeModal={() => setShowModal(false)} setToken={setToken} />
        )}

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<PropertyList properties={properties} />}
          />
          <Route
            path="/properties/:category"
            element={<PropertyList properties={properties} />}
          />
          <Route
            path="/properties"
            element={<PropertyList properties={properties} />}
          />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route
            path="/property/add"
            element={
              <AddProperty token={token} onAdd={handleAdd} /> // ✅ pass token here
            }
          />
          <Route
            path="/property/:id"
            element={<PropertyDetail properties={properties} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
