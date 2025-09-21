// src/components/PropertyCard.js
import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  const { id, title, price, city, category, image } = property;

  const formatPrice = (num) => (num ? num.toLocaleString("en-IN") : "N/A");

  const defaultImage = "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="property-card">
      <img
        src={image || defaultImage}
        alt={title || "Property Image"}
        className="property-image"
      />
      <div className="property-details">
        <h5 className="property-title">{title || "No Title"}</h5>

        <p className="property-info">
          <strong>Price:</strong> ₹{formatPrice(price)}
        </p>

        {city && (
          <p className="property-info">
            <strong>City:</strong> {city}
          </p>
        )}

        {category && (
          <p className="property-info">
            <strong>Category:</strong> {category}
          </p>
        )}

        <Link to={`/property/${id}`} className="view-details-btn">
          View Details
        </Link>
      </div>

      {/* Styles */}
      <style>{`
        .property-card {
          width: 100%;
          max-width: 280px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          background: #fff;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin: 10px;
        }

        .property-card:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }

        .property-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .property-details {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .property-title {
          margin-bottom: 6px;
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .property-info {
          margin-bottom: 4px;
          font-size: 0.9rem;
        }

        .view-details-btn {
          margin-top: auto;
          padding: 8px 12px;
          background-color: #0d6efd;
          color: #fff;
          border-radius: 5px;
          text-decoration: none;
          text-align: center;
          transition: background 0.2s ease;
        }

        .view-details-btn:hover {
          background-color: #0b5ed7;
        }

        @media (max-width: 768px) {
          .property-card {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
