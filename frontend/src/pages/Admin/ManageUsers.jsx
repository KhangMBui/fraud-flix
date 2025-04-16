import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import "./ManageUsers.css"; // Import the CSS file

export default function ManageUsers() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    isAdmin: false,
  });

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });
        setUsers(users.filter((u) => u.id !== id));
        // Call fetchStats() to update users count.
        fetchStats();
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete user:", err);
        Swal.fire(
          "Error!",
          "Failed to delete the user. Please try again.",
          "error"
        );
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (userId) => {
    const token = localStorage.getItem("token");
    const originalUser = users.find((u) => u.id === userId);
    const hasChanged =
      editedUser.email !== originalUser.email ||
      editedUser.username !== originalUser.username ||
      editedUser.isAdmin !== originalUser.isAdmin;

    // If nothing was changed, just exit editing state
    if (!hasChanged) {
      setEditingUserId(null);
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to update this user's information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `http://localhost:5000/api/admin/users/${userId}`,
          editedUser,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEditingUserId(null);
        fetchUsers(); // refresh updated list
      } catch (err) {
        console.error("Error updating user:", err);
        Swal.fire({
          title: "Update Failed",
          text: err.response?.data?.error || "An unexpected error occurred.",
          icon: "error",
        });
      }
    } else {
      setEditingUserId(null);
      return;
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
                <td className="text-right"></td>
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
              <th>Email</th>
              <th>Usernamez</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) =>
              editingUserId === user.id ? (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                      className="email-edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="username"
                      value={editedUser.username}
                      onChange={handleChange}
                      className="username-edit-input"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="isAdmin"
                      checked={editedUser.isAdmin}
                      onChange={handleChange}
                      className="admin-edit-checkbox"
                    />
                  </td>
                  <td>
                    <button
                      className="save-button"
                      onClick={() => handleSave(user.id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.isAdmin ? "Admin" : "User"}</td>
                  <td>
                    <button
                      className="icon-btn edit"
                      title="Edit"
                      onClick={() => handleEdit(user)}
                    >
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
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
