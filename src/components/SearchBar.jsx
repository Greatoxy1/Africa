import React, { useState } from "react";

function SearchBar({ setQuery }) {
  const [text, setText] = useState("");

  const search = (e) => {
    e.preventDefault();
    setQuery(text);
  };

  return (
    <form onSubmit={search} style={{ textAlign:"center", margin:"20px" }}>
      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Search news..."
        style={{ padding:"10px", width:"250px" }}
      />

      <button style={{ padding:"10px", marginLeft:"10px" }}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;