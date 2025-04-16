import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BellFill,
  PersonFill,
  BoxArrowRight,
  BoxArrowLeft,
  Gear
} from "react-bootstrap-icons";
import "./Header.css";

function Header({ isLoggedIn, handleLogout }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    /**
     * A link to the Admin Dashboard is rendered if the logged in user has admin status.
     */
    const checkAdminStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const tokenData = JSON.parse(atob(token.split(".")[1]));
          setIsAdmin(tokenData.isAdmin);
        } catch (e) {
          console.error("Failed to Authenticate Token:", e);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, [isLoggedIn]);

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
        <Link to="/Profile" className="navbarButton" title="Profile">
          <PersonFill size={25} className="navbarButton" title="Profile" />
        </Link>
        {isAdmin && (
          <Link to="/admin/dashboard" className="navbarButton" title="Admin Dashboard">
            <Gear size={22} className="navbarButton" title="Admin Dashboard" />
          </Link>
        )}
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
