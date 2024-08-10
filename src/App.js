import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Admin/Dashboard";
import Owners from "./pages/Admin/Owners";
import Books from "./pages/Admin/Books";
import BookUpload from "./pages/Owner/BookUpload";
import OwnewDashboard from "./pages/Owner/Dashboard";
import ProfilePage from "./pages/Owner/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/owner/dashboard" element={<OwnewDashboard />} />
        <Route path="/admin/owners" element={<Owners />} />
        <Route path="/admin/books" element={<Books />} />
        <Route path="/owner/bookupload" element={<BookUpload />} />
        <Route path="/owner/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
