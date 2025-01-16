import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to WLTH Pay Lite</h1>
        <p>Your secure and efficient payment solution.</p>
        <div className="home-buttons">
          <Link to="/signup" className="btn-primary">Sign Up</Link>
          <Link to="/login" className="btn-secondary">Log In</Link>
        </div>
      </header>
    </div>
  );
};

export default Home;