import React from "react";

const Footer = function() {
  return (
    <footer>
      <div className="floating-links">
        <a
          className="bmc-button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.buymeacoffee.com/acupajoe">
          <img
            src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
            alt="Buy me a coffee"
          />
          <span style={{ marginLeft: "5px" }}>Buy me a coffee</span>
        </a>
      </div>
      <p>
        <a href="https://acupajoe.io">Joseph Schultz</a>
      </p>
      <ul className="menu">
        <li>
          <a href="https://github.com/acupajoe/swatcher">
            <i className="fab fa-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
