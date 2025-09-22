// src/pages/AddProperty.js
import React, { useState } from "react";

function AddProperty({ token, onAdd }) { // receive token from App.js
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    location: "",
    category: "",
    contact: "",
  });
  const [image, setImage] = useState(null);

  const categories = [
    "Apartments",
    "Houses",
    "Land",
    "Commercial",
    "PG & Hostels",
    "Office",
    "Shops",
  ];

  const cityOptions = {
    Bhopal: ["Hoshangabad Road", "Indrapuri", "Arera Colony"],
    Indore: ["Vijay Nagar", "MG Road", "Palasia"],
    Delhi: ["Laxmi Nagar", "Dwarka", "Rohini"],
    Mumbai: ["Bandra", "Andheri", "Juhu"],
    Pune: ["Baner", "Kothrud", "Viman Nagar"],
    Bangalore: ["Electronic City", "Whitefield", "MG Road"],
  };

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
      ...(e.target.name === "city" && { location: "" }),
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Use token passed from App.js
    if (!token) {
      alert("Please login first!");
      return;
    }

    const formData = new FormData();
    Object.keys(property).forEach((key) => formData.append(key, property[key]));
    if (image) formData.append("image", image);
const API_URL = process.env.REACT_APP_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // use token here
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        alert(`Error: ${text}`);
        return;
      }

      const text = await res.text();
      alert(text);

      // reset form
      setProperty({
        title: "",
        description: "",
        price: "",
        city: "",
        location: "",
        category: "",
        contact: "",
      });
      setImage(null);

      // notify parent to update properties list
      if (typeof onAdd === "function") onAdd({ ...property, id: Date.now() });
    } catch (error) {
      console.error(error);
      alert("Error uploading property!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Price (INR)</label>
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            className="form-control"
            required
            min="1000"
            max="100000000"
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <select
            name="city"
            value={property.city}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">-- Select City --</option>
            {Object.keys(cityOptions).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <select
            name="location"
            value={property.location}
            onChange={handleChange}
            className="form-control"
            required
            disabled={!property.city}
          >
            <option value="">-- Select Location --</option>
            {property.city &&
              cityOptions[property.city].map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={property.category}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contact"
            value={property.contact}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
