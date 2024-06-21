import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Dropdown, Image } from "react-bootstrap";
import { LogoutModal } from "../Modal/LogoutModal";

export default function NavBar() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        setUser(decoded);
        setShowDropdown(false);
        return;
      }
    } else {
      setUser(null);
      setShowDropdown(false);
    }
  }, [token]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="topnav">
      <div className="start-links">
        <Link
          className={
            location.pathname === "/" ? "head-item active" : "head-item"
          }
          to={"/"}
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/contact" ? "head-item active" : "head-item"
          }
          to={"/contact"}
        >
          Contact
        </Link>
        <Link
          className={
            location.pathname === "/about" ? "head-item active" : "head-item"
          }
          to={"/about"}
        >
          About
        </Link>
      </div>
      <div className="end-links">
        {user && (
          <Dropdown
            align="end"
            show={showDropdown}
            onClose={() => setShowDropdown(false)}
          >
            <Dropdown.Toggle
              style={{ color: "white", fontSize: "20px" }}
              variant="link"
              id="dropdown-custom-components"
              onClick={toggleDropdown}
            >
              <Image
                src={user.picture}
                alt="avatar"
                roundedCircle
                width={50}
                className="avatar-dropdown"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ padding: "5px" }}>
              <Dropdown.Item
                onClick={() => handleDropdownItemClick("/dashboard")}
              >
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item>
                <LogoutModal handleLogout={handleLogout} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!user && (
          <Link
            className={
              location.pathname === "/login" ? "head-item active" : "head-item"
            }
            to={"/login"}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
