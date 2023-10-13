import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div
      className="footer-container"
      style={{
        display:
          useLocation().pathname.indexOf("capstoneportfolio") !== -1
            ? "none"
            : "block",
      }}
    >
      <div className="contact-container">
        <div>
          <a href={useLocation().pathname === "/" ? "#" : "/"}>
            <img
              height="120px"
              src={require("../assets/images/MNpx2.png")}
              className="img1"
              alt="MN"
            />
          </a>
        </div>
        <div className="text-container">
          <div className="text">
            <p className="footer-text">Contact me via LinkedIn</p>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/martin-nastevski/"
              rel="noreferrer"
            >
              <i id="text-icon-linkedin" className="fab fa-linkedin" />
            </a>
          </div>
          <div className="text">
            <p className="footer-text">Site Repository</p>
            <a
              target="_blank"
              href="https://github.com/martinnaste/martinnaste.github.io"
              rel="noreferrer"
            >
              <i id="text-icon-github" className="fab fa-github" />
            </a>
          </div>
        </div>
      </div>
      <div>
        <small className="website-rights">
          Martin Nastevski Copyright 2022
        </small>
      </div>
    </div>
  );
}

export default Footer;
