import React from "react";
import "../../App.css";
import About from "../About";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const globalNavigateToCapstone = () => {
    navigate("/capstone");
  };

  window.GLOBALNAVTOCAPSTONE = globalNavigateToCapstone;
  return (
    <>
      <HeroSection />
      <Cards />
      <About />
    </>
  );
}

export default Home;
