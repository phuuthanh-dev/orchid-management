import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer class="py-3 my-4 mb-0" style={{ background: "#333333" }}>
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><Link to={"/"} class="nav-link px-2" style={{ color: "white" }}>Home</Link></li>
        <li class="nav-item"><Link to={"/contact"} class="nav-link px-2" style={{ color: "white" }}>Contact</Link></li>
        <li class="nav-item"><Link to={""} class="nav-link px-2" style={{ color: "white" }}>About</Link></li>
      </ul>
      <p class="text-center" style={{ color: "white" }}>© 2024 Company, Inc</p>
    </footer>
  );
}
