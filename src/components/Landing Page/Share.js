import "./Share.css";
import React, { useContext, useState } from "react";
import { ContextProvider } from "../../Global/Context";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Share = (props) => {
  const { currentPostId, shareModel, closeShareModel, loader, user } =
    useContext(ContextProvider);

  const closeForm = (e) => {
    const className = e.target.getAttribute("class");
    if (className === "share__model") {
      closeShareModel();
    }
  };
  return (
    <>
      {!loader && user && shareModel ? (
        <div className="share__model" onClick={closeForm}>
          <div className="share__container">
            <div className="share__link">
              <p className="link">{`http://localhost:3000/posts/${currentPostId}`}</p>
              <CopyToClipboard
                text={`http://localhost:3000/posts/${currentPostId}`}
              >
                <button className="copy__button">Copy</button>
              </CopyToClipboard>
            </div>
            <div className="icons__container">
              <FacebookShareButton
                url={`http://localhost:3000/posts/${currentPostId}`}
                quote={""}
              >
                <FacebookIcon
                  logoFillColor="white"
                  className="social__icons"
                ></FacebookIcon>
              </FacebookShareButton>
              <WhatsappShareButton
                title=""
                url={`http://localhost:3000/posts/${currentPostId}`}
              >
                <WhatsappIcon
                  logoFillColor="white"
                  className="social__icons"
                ></WhatsappIcon>
              </WhatsappShareButton>
              <LinkedinShareButton
                quote={""}
                url={`http://localhost:3000/posts/${currentPostId}`}
              >
                <LinkedinIcon
                  logoFillColor="white"
                  className="social__icons"
                ></LinkedinIcon>
              </LinkedinShareButton>
              <EmailShareButton
                title=""
                url={`http://localhost:3000/posts/${currentPostId}`}
              >
                <EmailIcon
                  logoFillColor="white"
                  className="social__icons"
                ></EmailIcon>
              </EmailShareButton>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Share;
