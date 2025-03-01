import "./App.css";
import { Search, BellFill, PersonFill } from "react-bootstrap-icons";

function App() {
  const sections = [
    {
      title: "Trending Now",
      images: [
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
      ],
    },
    {
      title: "Popular on Netflix",
      images: [
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
      ],
    },
    {
      title: "Watch it again",
      images: [
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
        "./../public/images/strangerThings.avif",
      ],
    },
    // Add more sections as needed
  ];
  return (
    <div className="pageContainer">
      <div className="navbar">
        <div className="navbarLeft">
          <img src="./../public/images/netflixlogo.png" className="logo"></img>
          <a>Home</a>
          <a>Series</a>
          <a>Movies</a>
        </div>
        <div className="navbarRight">
          {/* <a>User Options</a>
          <a>User Options 2</a> */}
          <Search size={20} color="white" />
          <BellFill size={20} color="white" />
          <PersonFill size={20} color="white" />
        </div>
      </div>
      <div className="pageContent">
        {sections.map((section, index) => (
          <div key={index} className="showsContainer">
            <h1 className="title">{section.title}</h1>
            <div className="shows">
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
    </div>
  );
}

export default App;
