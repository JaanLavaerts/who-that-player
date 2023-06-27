import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer>
        <span>
          <Link to="/">Game</Link>
        </span>
        <span id="footer">&copy; Jaan Lavaertss </span>
        {/* <span id='leaderboard-footer'><Link to='/highscores'>Leaderboard</Link></span> */}
      </footer>
    </div>
  );
};

export default Footer;
