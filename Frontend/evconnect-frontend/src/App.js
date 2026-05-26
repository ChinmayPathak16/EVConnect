import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPortal from "./pages/UserPortal";
import OwnerPortal from "./pages/OwnerPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPortal />} />
        <Route path="/owner" element={<OwnerPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;