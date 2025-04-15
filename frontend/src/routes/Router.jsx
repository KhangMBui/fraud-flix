import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import SearchPage from "../pages/Search/SearchPage";
import MovieInfo from "../pages/MovieInfo/MovieInfo";
import AdminDashboard from "../pages/Admin/AdminDashboard";

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
        <Route path="/admin/" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
