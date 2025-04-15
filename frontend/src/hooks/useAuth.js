/**
 * useAuth is a custom React hook that manages basic authentication state.
 *
 * It checks whether a user is logged in by verifying the presence of a token
 * in localStorage when the component using the hook mounts. It provides:
 *
 * - `isLoggedIn`: a boolean indicating the user's login status.
 * - `handleLogout`: a function that clears the token and redirects to the login page.
 *
 * This hook is designed to be reused across multiple pages to simplify auth logic.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/Login");
  };

  return { isLoggedIn, handleLogout };
}
