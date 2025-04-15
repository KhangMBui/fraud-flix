import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

function User() {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
  });

  const [profilePicture, setProfilePicture] = useState("/images/gobby1.jpg"); // Gobby1 by default
  

  useEffect(() => {
    // Coin flip to decide profile picture
    const coinFlip = Math.random() < 0.5 ? "/images/gobby1.jpg" : "/images/gobby2.jpg";
    setProfilePicture(coinFlip);

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
    <div className="profilePage">
      <Header />
      <div className="profileContainer">
        <div className="profileCard">
        <img
            src={profilePicture}
            alt="Profile"
            className="profilePicture"
          />
          <div className="profileDetails">
            <h2>{profile.username}</h2>
            <p>Email: {profile.email}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default User;