import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
      <div>
        <nav className="navbar">
          <Link className="proviser" to="/">Blood Heroes</Link>
        </nav>
      </div>
  );
}