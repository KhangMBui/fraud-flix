import { useState, useEffect } from "react";
import "./SearchPage.css";
import Footer from "../../components/Footer/Footer";
import { Trash3Fill, Recycle, Search } from "react-bootstrap-icons";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

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

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const updated = [trimmed, ...prev.filter((item) => item !== trimmed)];
      return updated.slice(0, 20);
    });

    setQuery("");
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
          <div className="searchBarAndButton">
            <input
              className="searchInput"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="searchButton" onClick={handleSearch}>
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
                <li key={index} className="historyItem">
                  <span>{item}</span>
                  <button
                    className="deleteHistoryButton"
                    onClick={() => handleDelete(item)}
                  >
                    <Trash3Fill className="icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="movieContainer"></div>
      </div>
    </>
  );
}

export default SearchPage;
