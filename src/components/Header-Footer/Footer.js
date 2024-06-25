import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-3 my-4 mb-0" style={{ background: "#333333" }}>
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to={"/"} className="nav-link px-2" style={{ color: "white" }}>Home</Link></li>
        <li className="nav-item"><Link to={"/contact"} className="nav-link px-2" style={{ color: "white" }}>Contact</Link></li>
        <li className="nav-item"><Link to={""} className="nav-link px-2" style={{ color: "white" }}>About</Link></li>
      </ul>
      <p className="text-center" style={{ color: "white" }}>© 2024 Phung Huu Thanh, Inc</p>
    </footer>
  );
}
