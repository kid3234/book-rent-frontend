import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Owners from "./pages/Owners";
// import Books from "./pages/Books";
import theme from "./theme";
import Dashboard from "./pages/Admin/Dashboard";
import Owners from "./pages/Admin/Owners";
import Books from "./pages/Admin/Books";
import BookUpload from "./pages/Owner/BookUpload";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookupload" element={<BookUpload />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
