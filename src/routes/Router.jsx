import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../pages/Account/Registration";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Account */}
        <Route path="/Registration" element={<Registration />} />
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
