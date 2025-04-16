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

  /**
   * Checks if the user has admin status.
   */
  const checkAdminStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      if (!tokenData.isAdmin) {
        navigate("/");
      }
    } catch (e) {
      console.error("Failed to Validate Admin Prvileges:", e);
      navigate("/login");
    }
  };

  /**
   * Retrieves general statistics for each entity (Users, Movies, Genres).
   */
  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
      setError(null);
    } catch (e) {
      console.error("Failed to Retrieve Dashboard Statistics:", e);
      setError("Failed to Retrieve Dashboard Statistics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        {error && <div className="error">{error}</div>}
        <div className="dashboard-content">
          <div className="stats">
            <h2>Database Statistics</h2>
            {loading ? (
              <div className="loading-bar">Retrieving Statistics</div>
            ) : stats ? (
              <div className="stats-table">
                <div className="stats-card">
                  <div className="stat-value">{stats.allUsers}</div>
                  <div className="stat-header">Total Users</div>
                </div>
                <div className="stats-card">
                  <div className="stat-value">{stats.allMovies}</div>
                  <div className="stat-header">Total Movies</div>
                </div>
                <div className="stats-card">
                  <div className="stat-value">{stats.allGenres}</div>
                  <div className="stat-header">Total Genres</div>
                </div>
              </div>
            ) : (
              <div className="data-not-found">No Data Retrieved</div>
            )}
          </div>
          <div className="entity-management">
            <h2>System Management</h2>
            <div className="management-cards">
              <Link to="/admin/manage-users" className="management-card">
                <div className="card-icon user-icon">Manage Users</div>
                <div className="card-title">Update & Delete User Accounts</div>
              </Link>
              <Link to="/admin/manage-movies" className="management-card">
                <div className="card-icon user-icon">Manage Media</div>
                <div className="card-title">Update & Delete Movies/Shows</div>
              </Link>
              <Link to="/admin/manage-genres" className="management-card">
                <div className="card-icon user-icon">Manage Genres</div>
                <div className="card-title">View Genres & Modify Descriptions</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}