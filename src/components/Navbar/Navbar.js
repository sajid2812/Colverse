import "./Navbar.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { ContextProvider } from "../../Global/Context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Navbar() {
  const { user, loader,logout } = useContext(ContextProvider);

  const userLogout = () => {
    logout();
  };
  return (
    <>
      <div className="nav-bar">
        <Link to="/" className="header_name">
          <div className="nav-items">
            <h1>Colverse</h1>
          </div>
        </Link>
        <div className="searchbar nav-items inp">
          <input type="text" className="insideImp" placeholder="Search" />
          <SearchIcon className="searchIcon" />
        </div>
        <div className="nav-items flex_props">
          {!loader && user ? (
            <>
              <AccountCircleIcon className="avatar" />
              <h4>
                {user.displayName}/
                <span className="logout__button" onClick={userLogout}>
                  logout
                </span>
              </h4>
              {/* <ExpandMoreIcon /> */}
            </>
          ) : (
            <Link to="/Login" className="LinkLogin">
              <h4>Register/Login</h4>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
