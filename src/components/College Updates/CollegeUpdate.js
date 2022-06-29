import "./CollegeUpdate.css";
import Collegenews from "./Collegenews";
import TotalUsers from "../Landing Page/TotalUsers";
import { CollegeData } from "./Collegedata";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "../../Global/Context";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PublicIcon from "@mui/icons-material/Public";

export default function CollegeUpdate() {
  const { usersList } = useContext(ContextProvider);

  return (
    <>
      <div>
        <h2 className="Head">COLLEGE UPDATES</h2>
      </div>
      <div className="mainCollege">
        <div className="page_optionsCollege">
          <Link to="/Library" className="Link">
            <div className="library alignementcollege">
              <MenuBookIcon className="option__icons" />
              <h3>E-Library</h3>
            </div>
          </Link>
          <Link to="/" className="Link">
            <div className="tech alignementcollege">
              <HomeIcon className="option__icons" />
              <h3>Home</h3>
            </div>
          </Link>
          <Link to="/TechUpdate" className="Link">
            <div className="collegeUpdates alignementcollege">
              <PublicIcon className="option__icons" />
              <h3>Tech Updates</h3>
            </div>
          </Link>
        </div>
        <div className="bodyCollege">
          {CollegeData.map((news) => (
            <Collegenews
              id={news.id}
              img={news.img}
              title={news.title}
              para={news.para}
            />
          ))}
        </div>
        <div className="total_usersCollege">
          <h3>Users</h3>
          <hr />
          {usersList.map((user) => (
            <TotalUsers
              profName={user.displayName}
              profImg="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185__340.png"
            />
          ))}
        </div>
      </div>
    </>
  );
}
