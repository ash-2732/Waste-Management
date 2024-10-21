import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import DashBoard from "./pages/user/DashBoard";
import Private from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import UserProfile from "./pages/user/UserProfile";
import ReportWaste from "./pages/user/ReportWaste";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="resident" element={<DashBoard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="reportwaste" element={<ReportWaste />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashBoard />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
