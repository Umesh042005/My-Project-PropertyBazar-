// src/pages/PropertyDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
 const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required to view property details");
      navigate("/");
      return;
    }


    axios
     .get(`${API_URL}/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching property");
        setLoading(false);
        navigate("/"); // go back to home if error
      });
  }, [id, navigate]);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    if (!window.confirm("Are you sure you want to delete this property?")) return;

    axios
       .delete(`${API_URL}/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Property deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting property");
      });
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!property) return <p className="text-center mt-4">Property not found.</p>;

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: "700px", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ height: "350px", overflow: "hidden" }}>
          <img
            src={property.image || "https://via.placeholder.com/400x250?text=No+Image"}
            alt={property.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="card-body">
          <h3 className="card-title mb-3">{property.title}</h3>
          <p><strong>Description:</strong><br />{property.description || "N/A"}</p>
          <p><strong>Price:</strong> ₹{property.price || "N/A"}</p>
          <p><strong>City:</strong> {property.city || "N/A"}</p>
          <p><strong>Location:</strong> {property.location || "N/A"}</p>
          <p><strong>Category:</strong> {property.category || "N/A"}</p>
          <p><strong>Contact:</strong> {property.contact || "N/A"}</p>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button className="btn btn-primary" onClick={() => navigate(`/edit-property/${id}`)}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
