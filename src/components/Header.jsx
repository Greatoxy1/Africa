import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#111", color: "white", padding: "15px" }}>
      <h1>GlobbalNews</h1>
      <nav>
        <Link to="/" style={{ color: "white", margin: "0 10px" }}>Home</Link>
        <Link to="/world" style={{ color: "white", margin: "0 10px" }}>World</Link>
        <Link to="/technology" style={{ color: "white", margin: "0 10px" }}>Technology</Link>
        <Link to="/sports" style={{ color: "white", margin: "0 10px" }}>Sports</Link>
        <Link to="/politics" style={{ color: "white", margin: "0 10px" }}>Politics</Link>
        <Link to="/business" style={{ color: "white", margin: "0 10px" }}>Business</Link>
      </nav>
    </header>
  );
}

export default Header;