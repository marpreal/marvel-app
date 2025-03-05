import { Link } from "react-router-dom";
import { NavbarProps } from "./types";
import marvelLogo from "../assets/marvel-logo.png";
import heartIcon from "../assets/state-default.png";
import "../styles/Navbar.css";

function Navbar({ favoritesCount, toggleShowFavorites, resetShowFavorites }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" onClick={resetShowFavorites}>
          <img src={marvelLogo} alt="Marvel Logo" className="logo" />
        </Link>

        <div className="favorites-container" onClick={toggleShowFavorites}>
          <img src={heartIcon} alt="Favorites" className="heart-icon" />
          {favoritesCount > 0 && <span className="favorite-count">{favoritesCount}</span>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
