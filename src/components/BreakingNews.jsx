import React, { useEffect, useState } from "react";

function BreakingNews() {
  const [headline, setHeadline] = useState("Loading breaking news...");

  useEffect(() => {
    fetch("http://localhost:5000/news")
      .then((res) => res.json())
      .then((data) => {
        const titles = data.map((n) => n.title).join(" 🔴 ");
        setHeadline(titles);
      })
      .catch(() => {
        setHeadline("Breaking news there are tention in Middle East as ongoing war between Israel ,USA and Iran continues.");
      });
  }, []);

  return (
    <div style={styles.wrapper}>
      <div className="ticker">{headline}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#f329a9",
    color: "white",
    overflow: "hidden",
    whiteSpace: "nowrap",
    padding: "10px 0",
    fontWeight: "bold",
  },
};

export default BreakingNews;