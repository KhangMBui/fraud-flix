import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

function User() {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    password: "********", // Masked password
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profileContainer">
      <div className="profileCard">
        <img
          src="/images/defaultProfile.png" // Generic profile picture
          alt="Profile"
          className="profilePicture"
        />
        <div className="profileDetails">
          <h2>{profile.username}</h2>
          <p>Email: {profile.email}</p>
          <p>Password: {profile.password}</p>
        </div>
      </div>
    </div>
  );
}

export default User;