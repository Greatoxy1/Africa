import React from "react";

const categories = [
  "general",
  "business",
  "technology",
  "sports",
  "health",
  "science",
  "entertainment"
];

function CategoryBar({ setCategory }) {
  return (
    <div style={{ display:"flex", gap:"10px", justifyContent:"center", padding:"10px" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          style={{
            padding:"8px 15px",
            border:"none",
            borderRadius:"20px",
            background:"#14e962",
            color:"white",
            cursor:"pointer"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;