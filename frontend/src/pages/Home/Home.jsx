import "./Home.css";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  BellFill,
  PersonFill,
  BoxArrowRight,
  BoxArrowLeft,
} from "react-bootstrap-icons";
import Footer from "../../components/Footer/Footer";
import images from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import moviesData from "../../../../backend/services/movies.json";
import axios from "axios";


function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrollRefs = useRef([]);
  const scrollIntervals = useRef([]);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [firstMovie, setFirstMovies] = useState([]);

  useEffect(() => {
    scrollRefs.current.forEach((container, index) => {
      if (container) {
        let scrollSpeed = 8; // Adjust scroll speed
        let intervalId = null; // Store interval ID

        const startScrolling = (direction) => {
          stopScrolling(); // Stop any existing scrolling before starting a new one
          intervalId = setInterval(() => {
            container.scrollLeft += direction * scrollSpeed;
          }, 30); // Adjust timing for smooth scrolling
          scrollIntervals.current[index] = intervalId;
        };

        const stopScrolling = () => {
          if (scrollIntervals.current[index]) {
            clearInterval(scrollIntervals.current[index]);
            scrollIntervals.current[index] = null;
          }
        };

        const handleMouseMove = (event) => {
          const { clientX } = event;
          const { left, right, width } = container.getBoundingClientRect();

          if (clientX < left + width * 0.2) {
            // If mouse is at the left end, scroll left
            startScrolling(-1);
          } else if (clientX > right - width * 0.2) {
            // If mouse is at the right end, scroll right
            startScrolling(1);
          } else {
            stopScrolling(); // Stop scrolling when mouse is not at an edge
          }
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", stopScrolling); // Stop when mouse leaves the container

        return () => {
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("mouseleave", stopScrolling);
          stopScrolling(); // Ensure no memory leaks
        };
      }
    });
  }, []);

  useEffect(() => {
    // Fetch movies from the backend API
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getAllMovies");
        setMovies(response.data);
        if (response.data.length > 0) {
          setFirstMovie(response.data[0]); // Set the first movie
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchMovies();
  }, []);

  // Load movies from movies.json
  useEffect(() => {
    setMovies(moviesData);
  }, []);

  // Effect to check if logged in:
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
  // const getCurrentUsername = async () => {
  //   const token = localStorage.getItem("token");
  //   const response = await axios.get("http://localhost:5000/api/auth/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log("Username: ", response.data.username);
  //   return response.data.username;
  // };

  const sections = [
    { title: "Action", genre: "Action" },
    { title: "Adventure", genre: "Adventure" },
    { title: "Family", genre: "Family" },
    { title: "Comedy", genre: "Comedy" },
    { title: "Horror", genre: "Horror" },
    { title: "Animation", genre: "Animation" },
    { title: "Romance", genre: "Romance" },
    { title: "Drama", genre: "Drama" },
    { title: "Fantasy", genre: "Fantasy" },
    { title: "Science Fiction", genre: "Science Fiction" },
  ];

  const username = localStorage.getItem("username");

  return (
    <div className="pageContainer">
      <div className="navbar">
        <div className="navbarLeft">
          <img src="/images/FraudflixLogo.png" className="logo"></img>
          <div className="navOption">
            <a>Home</a>
            <a>Series</a>
            <a>Movies</a>
          </div>
        </div>
        <div className="navbarRight">
          <Link to="/Search" title="Search">
            <Search size={22} className="navbarButton" />
          </Link>
          <BellFill size={22} className="navbarButton" title="Notifications" />
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
                <BoxArrowLeft
                  size={23}
                  className="navbarButton"
                  title="Login"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="welcome-text">
        <span className="welcome-label">Welcome, </span>
        <span className="username">{username}</span>
      </div>
      <div className="pageContent">
      {sections.map((section, index) => {
          // Filter movies by genre
          const filteredMovies = movies.filter((movie) =>
            movie.genres.includes(section.genre)
          );

          return (
            <div key={index} className="showsContainer">
              <h1 className="title">{section.title}</h1>
              <div
                ref={(el) => (scrollRefs.current[index] = el)}
                className="shows"
              >
                {filteredMovies.map((movie, imgIndex) => (
                  <img
                  key={imgIndex}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use the poster_path for the thumbnail
                  className="show"
                  alt={movie.title}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
