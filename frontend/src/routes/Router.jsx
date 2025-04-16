import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import SearchPage from "../pages/Search/SearchPage";
import MovieInfo from "../pages/MovieInfo/MovieInfo";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageMovies from "../pages/Admin/ManageMovies";
import Profile from "../pages/Profile/profile";
import ManageGenres from "../pages/Admin/ManageGenres";

const AdminRouter = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Account */}
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />

        {/* Search page */}
        <Route path="/Search" element={<SearchPage />} />

        {/* Movie Info Page*/}
        <Route path="/movie/:id" element={<MovieInfo />} />

        {/* Admin Dashboard */}
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-genres" element={<ManageGenres />} />
        <Route path="/admin/manage-movies" element={<ManageMovies />} />

        {/* Profile Page */}
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
