import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import SearchPage from "../pages/Search/SearchPage";

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
      </Routes>
    </Router>
  );
};

export default AppRouter;
