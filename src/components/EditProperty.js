import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProperty() {
  const { id } = useParams(); // property id from URL
  const navigate = useNavigate();

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

 const API_URL = process.env.REACT_APP_API_URL;

useEffect(() => {
  axios
    .get(`${API_URL}/api/properties/${id}`)
    .then((res) => {
      setProperty(res.data);
    })
    .catch((err) => {
      console.error("Error fetching property:", err);
      alert("Error fetching property details!");
    });
}, [id]);


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

    try {
      const formData = new FormData();
      formData.append("title", property.title);
      formData.append("description", property.description);
      formData.append("price", property.price);
      formData.append("city", property.city);
      formData.append("location", property.location);
      formData.append("category", property.category);
      formData.append("contact", property.contact);
      if (image) formData.append("image", image);
const API_URL = process.env.REACT_APP_API_URL;
      await axios.put(
        `${API_URL}/api/properties/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property updated successfully!");
      navigate(`/property/${id}`);
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Error updating property!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={property.title || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={property.description || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Price (INR)</label>
          <input
            type="number"
            name="price"
            value={property.price || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <select
            name="city"
            value={property.city || ""}
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
            value={property.location || ""}
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
            value={property.category || ""}
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
            value={property.contact || ""}
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
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Update Property
        </button>
      </form>
    </div>
  );
}

export default EditProperty;
