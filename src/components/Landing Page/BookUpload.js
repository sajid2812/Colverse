import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextProvider } from "../../Global/Context";
import "./BookUpload.css";

const BookUpload = () => {
  const { loader, user, publishBook, bookUploadModel, closeBookUploadModel } =
    useContext(ContextProvider);
  const [title, setTitle] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const addBook = (e) => {
    e.preventDefault();
    publishBook({
      title,
      image: bookImage,
      downloadLink: downloadUrl,
      contributor: user.displayName,
    });

    setTitle("");
    setBookImage("");
    setDownloadUrl("");
    closeBookUploadModel();
  };

  const closeForm = (e) => {
    const className = e.target.getAttribute("class");
    if (className === "book__uploadModel") {
      closeBookUploadModel();
    }
  };

  return (
    <>
      {!loader && user && bookUploadModel ? (
        <div className="book__uploadModel" onClick={closeForm}>
          <div className="uploadBook">
            <h3>Book Details</h3>
            <form onSubmit={addBook}>
              <div className="book__data">
                <label>Title</label>
                <input
                  type="text"
                  className=""
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter the title..."
                  required
                />

                <label>Book Image (optional)</label>
                <input
                  type="text"
                  className=""
                  onChange={(e) => setBookImage(e.target.value)}
                  value={bookImage}
                  placeholder="Enter image url..."
                />
                <label>Download Url</label>
                <input
                  type="text"
                  className=""
                  onChange={(e) => setDownloadUrl(e.target.value)}
                  value={downloadUrl}
                  placeholder="Enter download url..."
                  required
                />
              </div>

              <input
                type="submit"
                value="Add Book"
                className="btn-addBook"
              ></input>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BookUpload;
