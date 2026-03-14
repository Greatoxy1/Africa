import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import World from "./pages/World";
import Technology from "./pages/Technology";
import Sports from "./pages/Sports";
import Politics from "./pages/Politics";
import Business from "./pages/Business";
import BreakingNews from "./components/BreakingNews";
import SubscribeForm from "./components/SubscribeForm";
import Article from "./pages/Article";
function App() {
  return (
    <>
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
  <BreakingNews />
     
    </div>
    <Router>
      <Header />

        <SubscribeForm />
         <Article />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/business" element={<Business />} />
      </Routes>
      
      <Footer />
    </Router>
    </>
  );
}

export default App;