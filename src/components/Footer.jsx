import React from "react";

function Footer() {
  return (
    <footer style={footerStyle}>
      <p> <a href="https://globbalnews.com">© 2026 GlobbalNews</a></p>
      <p><a href="https://business.globbalnews.com">Business | Contact </a></p>
       <p><a href="https://sports.globbalnews.com">Sports Highligts</a></p>
      <p><a href="https://shop.globbalnews.com">About | Contact | Privacy Policy</a></p>
    </footer>
  );
}

const footerStyle = {
  background: "hsla(71, 81%, 54%, 0.91)",
  color: "white",
  textAlign: "center",
  padding: "20px",
};

export default Footer;