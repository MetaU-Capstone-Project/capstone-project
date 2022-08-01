import "./Navbar.css";
import { Link } from "react-router-dom";

/**
 * Component to display navbar
 */
export default function Navbar() {
  return (
    <div className="navbar-component">
      <Link to={"/home"} className="navbar-link">
        Home
      </Link>
      <Link to={"/search"} className="navbar-link">
        Search
      </Link>
      <Link to={"/groups"} className="navbar-link">
        Groups
      </Link>
      <Link to={"/profile"} className="navbar-link">
        Profile
      </Link>
    </div>
  );
}
