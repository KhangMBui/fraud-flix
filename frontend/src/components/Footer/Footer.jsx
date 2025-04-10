import "./Footer.css";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer-social">
          <Facebook size={24} />
          <Twitter size={24} />
          <Instagram size={24} />
          <Youtube size={24} />
        </div>
        <p className="footer-text">
          &copy; 2025 Fraudflix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
