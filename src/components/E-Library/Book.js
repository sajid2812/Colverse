import React, { useEffect } from "react";
import "./Book.css";
import DownloadIcon from "@mui/icons-material/Download";
function Book(props) {
  const { title, imgUrl, downloadLink, contributor } = props;

  return (
    <>
      <div className="book__container">
        <h4 className="book__title">{title}</h4>

        <div className="bookImage__container">
          <img src={imgUrl ? imgUrl : title} className="book__image" />
        </div>

        <div className="download__container">
          <p>
            added
            <br></br>
             by @{contributor}
          </p>
          <a href={downloadLink}>
            <DownloadIcon />
          </a>
        </div>
      </div>
    </>
  );
}

export default Book;

