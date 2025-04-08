import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";

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
      </Routes>
    </Router>
  );
};

export default AppRouter;
