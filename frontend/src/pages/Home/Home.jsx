import "./Home.css";
import { useEffect, useRef } from "react";
import { Search, BellFill, PersonFill } from "react-bootstrap-icons";
import Footer from "../../components/Footer/Footer";
import images from "../../assets/images";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const scrollRefs = useRef([]);
  const scrollIntervals = useRef([]);

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

          if (clientX < left + width * 0.1) {
            // If mouse is at the left end, scroll left
            startScrolling(-1);
          } else if (clientX > right - width * 0.9) {
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
    { title: "Horror", images: images.horror },
    { title: "Anime", images: images.anime },
    { title: "Reality Shows", images: images.realityShows },
    { title: "Action", images: images.action },
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
          <Link to="/Search">
            <Search size={22} className="navbarButton" />
          </Link>
          <BellFill size={22} className="navbarButton" />
          <PersonFill size={25} className="navbarButton" />
          <Link to="/Registration" className="regLink">
            Registration
          </Link>
        </div>
      </div>
      <div className="welcome-text">
        <span className="welcome-label">Welcome, </span>
        <span className="username">{username}</span>
      </div>
      <div className="pageContent">
        {sections.map((section, index) => (
          <div key={index} className="showsContainer">
            <h1 className="title">{section.title}</h1>
            <div
              ref={(el) => (scrollRefs.current[index] = el)}
              className="shows"
            >
              {section.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  className="show"
                  alt={`Show ${imgIndex + 1}`}
                />
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
