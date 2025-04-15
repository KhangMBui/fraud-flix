import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import { Trash3Fill, Recycle, Search } from "react-bootstrap-icons";
import axios from "axios";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [error, setError] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
    setHasLoaded(true);
  }, []);

  // Only save after loading
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  }, [history, hasLoaded]);

  const handleSearch = async (customQuery) => {
    const searchQuery = (customQuery || query).trim();
    if (!searchQuery) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      setResults(response.data);

      // Update history if new
      if (!history.includes(searchQuery)) {
        setHistory((prev) => [searchQuery, ...prev.slice(0, 20)]); // Limit to 10 entries
      }
    } catch (err) {
      console.error("Search failed: ", err);
      // setError("Failed to fetch search results. Please try again.");
    }
    setHistory((prev) => {
      const updated = [
        searchQuery,
        ...prev.filter((item) => item !== searchQuery),
      ];
      return updated.slice(0, 20);
    });
  };

  const handleHistoryClick = (item) => {
    setQuery(item);
    handleSearch(item);
  };

  const handleDelete = (itemToDelete) => {
    setHistory((prev) => prev.filter((item) => item !== itemToDelete));
  };

  const handleClearAll = () => {
    setHistory([]);
  };

  return (
    <>
      <div className="mainContainer">
        <div className="searchContainer">
          <Link to="/">
            <img
              src="/images/FraudflixLogo.png"
              className="logoBackButton"
              alt="Logo"
            />
          </Link>
          <div className="searchBarAndButton">
            <input
              className="searchInput"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="searchButton"
              onClick={() => handleSearch(query)}
            >
              <Search className="icon" />
              Find It!
            </button>
          </div>
          <div className="searchHistory">
            <div className="historyTitleBar">
              <h4>Recent Searches</h4>
              <button className="clearAllButton" onClick={handleClearAll}>
                <Recycle className="icon" />
                Clear All
              </button>
            </div>
            <ul>
              {history.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleHistoryClick(item)} // Only triggers when clicking the <li>, not the button
                  className="historyItem"
                >
                  <span>{item}</span>
                  <button
                    className="deleteHistoryButton"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from bubbling up to the <li>
                      handleDelete(item);
                    }}
                  >
                    <Trash3Fill className="icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="movieContainer">
          {results.map((movie) => (
            <div className="movieCard" key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="movieLink">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="movieThumbnail"
                />{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
