import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Library.css";
import { ContextProvider } from "../../Global/Context";
import TotalUsers from "../Landing Page/TotalUsers";
import Category from "./Category";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";

function Library() {
  const { usersList } = useContext(ContextProvider);
  const categoryArray = [
    "Computer Science",
    "Mathematics",
    "English Language",
    "Entrepreneurship",
    "Finance",
    "Makaut Organizers",
  ];
  return (
    <>
      <div>
        <h2 className="Head">E-Library</h2>
      </div>
      <div className="mainCollege">
        <div className="page_optionsCollege">
          <Link to="/TechUpdate" className="Link">
            <div className="collegeUpdates alignementcollege">
              <PublicIcon className="option__icons public__icon" />
              <h3>Tech Updates</h3>
            </div>
          </Link>
          <Link to="/" className="Link">
            <div className="tech alignementcollege">
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
        <div className="body__library">
          <div className="categories">
            {categoryArray.map((category) => (
              <Category name={category} />
            ))}
          </div>
        </div>

        <div className="total_usersCollege">
          <h3>Users</h3>
          <hr />
          {usersList?.map((user) => (
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

export default Library;
