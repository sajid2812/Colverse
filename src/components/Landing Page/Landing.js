import "./Landing.css";
import PostDataPg from "./PostDataPg";
import TotalUsers from "./TotalUsers";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CreateIcon from "@mui/icons-material/Create";
import PollIcon from "@mui/icons-material/Poll";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "../../Global/Context";
export default function Landing() {
  const { usersList, openModel, openWriteModel } = useContext(ContextProvider);
  const openPostForms = () => {
    openModel();
  };

  const openWriteForms = () => {
    openWriteModel();
  };
  return (
    <>
      <div className="container">
        <div className="posting_buttons">
          <div className="postsPhoto flexStyle" onClick={openWriteForms}>
            <CreateIcon className="icon" />
            <h5>Write Something </h5>
          </div>
          <div className="postsText flexStyle" onClick={openPostForms}>
            <FileUploadIcon className="icon" />
            <h5>Create Post</h5>
          </div>
          <div className="postsPoll flexStyle">
            <PollIcon className="icon" />
            <h5>Add Poll</h5>
          </div>
        </div>

        <div className="main_container">
          <div className="page_options">
            <Link to="/CollegeUpdate" className="Link">
              <Link to="/TechUpdate" className="Link">
                <div className="tech alignement">
                  <PublicIcon className="option__icons public__icon" />

                  <h3>Tech Updates</h3>
                </div>
              </Link>
              <Link to="/Library" className="Link">
                <div className="library alignement">
                  <MenuBookIcon className="option__icons menubook__icon" />
                  <h3>E-Library</h3>
                </div>
              </Link>
              <div className="collegeUpdates alignement">
                <SchoolIcon className="option__icons school__icon" />
                <h3>College Updates</h3>
              </div>
            </Link>
          </div>
          <div className="post_container">
            <PostDataPg />
          </div>
          <div className="total_users">
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
      </div>
    </>
  );
}
