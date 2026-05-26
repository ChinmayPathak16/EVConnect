import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>EVConnect</h1>
      <h2>Select Portal</h2>

      <button
        onClick={() => navigate("/user")}
        style={{
          padding: "15px 30px",
          margin: "20px",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        User Portal
      </button>

      <button
        onClick={() => navigate("/owner")}
        style={{
          padding: "15px 30px",
          margin: "20px",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        Owner Portal
      </button>
    </div>
  );
}

export default HomePage;