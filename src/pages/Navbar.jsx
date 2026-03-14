import React from "react";

function Navbar() {
  return (
    <nav style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"15px 30px",
      background:"#d90429",
      color:"white"
    }}>
      <h2>GlobalNews</h2>
      <div>
        Home | World | Technology | Sports
      </div>
    </nav>
  );
}

export default Navbar;