import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // fixed import

function Header() {
  return (
    <header className="header">
      <h1 className="logo">GlobbalNews.com</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/world">World</Link>
        <Link to="/Technology">Technology</Link>
        <Link to="/Sports">Sports</Link>
        <Link to="/politics">Politics</Link>
        <Link to="/business">Business</Link>
      </nav>
    </header>
  );
}

export default Header;