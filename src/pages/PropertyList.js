// src/components/PropertyList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";

import { useParams, useLocation } from "react-router-dom";

function PropertyList() {
  const { category } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // ✅ yahan pe "q" ki jagah "search" nikalna hai
  const keyword = queryParams.get("search");

  const [properties, setProperties] = useState([]);
 const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    let url = `${API_URL}/api/properties`;

    if (category) {
      url += `?category=${category}`;
    } else if (keyword) {
      url += `?search=${keyword}`;
    }

    axios
      .get(url)
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, [category, keyword]);

  return (
    <div className="container mt-4">
      <h2>
        Property Listings{" "}
        {category && ` - ${category.charAt(0).toUpperCase() + category.slice(1)}`}
        {keyword && ` - Results for "${keyword}"`}
      </h2>

      {properties.length === 0 ? (
        <p className="text-center mt-4">No properties found.</p>
      ) : (
        <div className="row g-4">
          {properties.map((p) => (
            <div key={p.id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyList;
