import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Pencil, Trash2 } from "lucide-react";
import "./AdminDashboard.css"; // Import the CSS file

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log(decodedToken);
      const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>General Stats</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Users count</th>
              <th>Movies count</th>
              <th>Genres count</th>
              <th className="text-right"></th>
            </tr>
          </thead>
          <tbody>
            {stats && (
              <tr>
                <td>{stats.allUsers}</td>
                <td>{stats.allMovies}</td>
                <td>{stats.allGenres}</td>
                <td className="text-right">
                  {/* Add any actions buttons here if needed */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <h2>User Management</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "admin" : "user"}</td>
                <td className="text-right">
                  <button className="icon-btn edit" title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button
                    className="icon-btn delete"
                    title="Delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
