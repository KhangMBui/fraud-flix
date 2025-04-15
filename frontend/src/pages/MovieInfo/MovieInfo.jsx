/**
 * Account Registration Page, instructs a user to register an email with a valid username and password.
 */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieInfo.css";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function MovieInfo() {
  const { id } = useParams();
  console.log("id: ", id);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movie = await axios.get(
          `http://localhost:5000/api/movies/getMovie/${id}`
        );
        setMovie(movie.data);
        console.log("Fetched movie:", movie.data);
      } catch (err) {
        console.error("Error fetching the movie: ", err);
      }
    }
    fetchMovie();
  }, [id]);

  return (
    <div className="page-layout">
      <Header />
      <div className="movie-info-page">
        {!movie ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movie-info-container">
            <div className="movie-header">
              <img
                className="movie-poster"
                src={movie.thumbnail}
                alt={movie.title}
              />
              <div className="movie-details">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="release-date">
                  <strong>Release Date:</strong>{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <div className="description">
                  <h2>Description</h2>
                  <p>{movie.description}</p>
                </div>
                {movie.Genres && (
                  <div className="genres">
                    <h3>Genres</h3>
                    <ul>
                      {movie.Genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MovieInfo;
