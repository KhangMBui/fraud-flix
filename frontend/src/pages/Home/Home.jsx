import "./Home.css";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

function Home() {
  const { isLoggedIn, handleLogout } = useAuth();
  const scrollRefs = useRef([]);
  const scrollIntervals = useRef([]);
  const [movies, setMovies] = useState([]);

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
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/movies/getAllMovies"
        );
        console.log("Fetched Movies:", response.data);
        setMovies(response.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    fetchMovies();
  }, []);

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

  const groupedMovies = sections.map((section) => {
    return {
      title: section.title,
      movies: movies.filter((movie) =>
        movie.Genres.some((genre) => genre.name === section.genre)
      ),
    };
  });

  const username = localStorage.getItem("username");

  return (
    <div className="pageContainer">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="welcome-text">
        <span className="welcome-label">Welcome, </span>
        <span className="username">{username}</span>
      </div>
      <div className="pageContent">
        {groupedMovies.map((group, index) => (
          <div key={index} className="showsContainer">
            <h1 className="title">{group.title}</h1>
            <div
              ref={(el) => (scrollRefs.current[index] = el)}
              className="shows"
            >
              {group.movies.map((movie, imgIndex) => (
                <Link to={`/movie/${movie.id}`} key={imgIndex} className="show">
                  <img src={movie.thumbnail} alt={movie.title} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
