// src/components/Header/Header.js
import { Link } from "react-router-dom";
import {
  Search,
  BellFill,
  PersonFill,
  BoxArrowRight,
  BoxArrowLeft,
} from "react-bootstrap-icons";
import "./Header.css";

function Header({ isLoggedIn, handleLogout }) {
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <Link to="/">
          <img src="/images/FraudflixLogo.png" className="logo" alt="Logo" />
        </Link>
        {/* <div className="navOption">
          <a href="/">Home</a>
          <a>Series</a>
          <a>Movies</a>
        </div> */}
      </div>
      <div className="navbarRight">
        <Link to="/Search" title="Search">
          <Search size={22} className="navbarButton" />
        </Link>
        {/* <BellFill size={22} className="navbarButton" title="Notifications" /> */}
        <PersonFill size={25} className="navbarButton" title="Profile" />
        <div className="auth-option">
          {isLoggedIn ? (
            <BoxArrowRight
              onClick={handleLogout}
              size={23}
              className="navbarButton"
              title="Logout"
            />
          ) : (
            <Link to="/Login" className="register-link">
              <BoxArrowLeft size={23} className="navbarButton" title="Login" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
