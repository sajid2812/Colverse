import "./TechUpdate.css";
import Technews from "./Technews";
import TotalUsers from "../Landing Page/TotalUsers";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../Global/Context";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";


export default function TechUpdate() {
  const { usersList } = useContext(ContextProvider);
  const [newsArray, setNewsArray] = useState([]);
  const callAPI = () => {
    fetch(
      "https://newsdata.io/api/1/news?apikey=pub_7398ecd4cbf6753e6187eac820523dabb4a8&category=technology&language=en&country=in,us,gb,ru,cn"
    )
      .then((res) => res.json())
      .then((res) => setNewsArray(res.results));
  };
  useEffect(() => {
    callAPI();
  }, []);

  return (
    <>
      <div>
        <h2 className="Head">TECH UPDATES</h2>
      </div>
      <div className="mainTech">
        <div className="page_optionsTech">
          <Link to="/Library" className="Link">
            <div className="library alignementtech">
              <MenuBookIcon className="option__icons" />
              <h3>E-Library</h3>
            </div>
          </Link>
          <Link to="/" className="Link">
            <div className="tech alignementtech">
              <HomeIcon className="option__icons" />
              <h3>Home</h3>
            </div>
          </Link>
          <Link to="/CollegeUpdate" className="Link">
            <div className="collegeUpdates alignementtech">
              <SchoolIcon className="option__icons" />
              <h3>College Updates</h3>
            </div>
          </Link>
        </div>
        <div className="bodyTech">
          {newsArray.map((news) => (
            <Technews
              img={news.image_url}
              title={news.title}
              para={news.description?.slice(0, 400)}
              url={news.link}
            />
          ))}
        </div>
        <div className="total_userstech">
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
