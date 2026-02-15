import React from "react";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "48px", color: "#667eea" }}>🍽️ OnokResto</h1>
      <p style={{ fontSize: "20px", color: "#666" }}>
        Your Premium Restaurant Reservation System
      </p>
      <div style={{ marginTop: "40px" }}>
        <button style={{
          background: "#667eea",
          color: "white",
          padding: "15px 30px",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          margin: "10px"
        }}>
          Make a Reservation
        </button>
        <button style={{
          background: "#764ba2",
          color: "white",
          padding: "15px 30px",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          margin: "10px"
        }}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;