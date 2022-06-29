import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { ContextProvider } from "../../Global/Context";
import TotalUsers from "../Landing Page/TotalUsers";
import Book from "./Book";
import "./Books.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../config";
import PublicIcon from "@mui/icons-material/Public";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";

const Books = () => {
  const { setBookId, user, publishBook, usersList, openBookUploadModel } =
    useContext(ContextProvider);
  const { id } = useParams();

  const [booksArray, setBooksArray] = useState([]);

  useEffect(() => {
    // fetch books from firebase
    const q = query(
      collection(db, "books", id, `${id}-books`),
      orderBy("currentTime", "desc")
    );
    onSnapshot(q, (snp) => {
      setBooksArray(
        snp.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
          downloadLink: doc.data().downloadLink,
          contributor: doc.data().contributor,
        }))
      );
    });
  }, []);

  const openUploadForm = () => {
    setBookId({ id });
    openBookUploadModel();
  };

  return (
    <div>
      <div className="heading__container">
        <h2 className="">{id}</h2>
        <div className="uploadBook__container" onClick={openUploadForm}>
          <FileUploadIcon />
          <h5>Upload Book</h5>
        </div>
      </div>
      <div className="mainCollege">
        <div className="page_optionsCollege">
          <Link to="/Library" className="Link">
            <div className="library alignementcollege">
              <MenuBookIcon className="option__icons menubook__icon" />
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
              <PublicIcon className="option__icons public__icon" />
              <h3>Tech Updates</h3>
            </div>
          </Link>
        </div>
        <div className="body__library">
          <div className="books">
            {booksArray.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                imgUrl={book.image}
                downloadLink={book.downloadLink}
                contributor={book.contributor}
              />
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
    </div>
  );
};

export default Books;
