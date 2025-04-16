import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./AdminDashboard.css";

/**
 * Admin dashboard page provides a stastical overview of users, movies, and genres with routes to each
 * respective management page.
 */
export default function AdminDashboard() {
  const { isLoggedIn, handleLogout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
    fetchStats();
  }, []);

  const checkAdminStatus = async () => {

  }

  const fetchStats = async () => {

  }

  return (
    <div className="dashboard">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>
    </div>
  )
}