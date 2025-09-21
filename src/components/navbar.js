import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Login from "./Login";
import CategoryBar from "./CategoryBar";

export default function Navbar({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null); // store logged-in user
  const navigate = useNavigate();

  // check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setUser({ token, email });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/properties?search=${encodeURIComponent(search)}`);
    } else {
      navigate(`/properties`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null); // reset user state
    navigate("/");
  };

  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-primary" href="/">
              PropertyBazar
            </a>

            <form className="d-flex flex-grow-1 me-2" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Find your fav.. property with PropertyBazar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => setShowCategories(!showCategories)}
              >
                Categories
              </button>

              {user ? (
                <>
                  {/* Avatar */}
                  <div
                    className="avatar me-2"
                    title={user.email}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                    onClick={() => navigate("/profile")}
                  >
                    {user.email.charAt(0)}
                  </div>

                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              )}

              {/* Sell Property button */}
              <button
                className="btn btn-warning fw-bold"
                onClick={() => {
                  if (user) {
                    navigate("/property/add");
                  } else {
                    setShowLogin(true);
                  }
                }}
              >
                + Sell Property
              </button>
            </div>
          </div>
        </nav>

        {showCategories && <CategoryBar />}
      </div>

      <div className={`page-content ${showCategories ? "with-category" : ""}`}>
        {children}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLogin(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Login
                  closeModal={() => setShowLogin(false)}
                  setToken={(token) => {
                    const email = localStorage.getItem("email");
                    setUser({ token, email });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
