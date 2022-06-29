import "./Post.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config";
import Likes from "./Likes";
import Comments from "./Comments";
import CommentIcon from "@mui/icons-material/Comment";
import TelegramIcon from "@mui/icons-material/Telegram";
import { ContextProvider } from "../../Global/Context";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import TotalLikes from "./TotalLikes";
import { BiUserCircle } from "react-icons/bi";

const Post = () => {
  const { id } = useParams();
  const {
    setId,
    openShareModel,
    commentModel,
    openCommentModel,
    closeCommentModel,
  } = useContext(ContextProvider);
  const [postData, setPostData] = useState({});
  const toggleCommentForm = () => {
    commentModel ? closeCommentModel() : openCommentModel();
  };

  const openShareForm = (e) => {
    console.log(e);
    openShareModel();
    setId({ id: id });
  };
  useEffect(() => {
    const q = query(doc(db, "posts", id));
    onSnapshot(q, (snp) => {
      console.log(snp.data());
      setPostData(snp.data());
    });
  }, []);

  return postData.image ? (
    <div className="post__container" key={id}>
      <div className="col-1">
        <div className="user__container">
          <BiUserCircle size="1.5em" className="user__img" />

          <h5 className="username">{postData.username}</h5>
        </div>

        <div className="image__container">
          <img className="post__image" src={postData?.image}></img>
        </div>

        <div className="post__reactions">
          <Likes id={id} />

          <BsChat
            className="comment"
            size="1.2em"
            onClick={toggleCommentForm}
          />

          <IoPaperPlaneOutline
            className="share"
            size="1.2em"
            onClick={openShareForm}
          />
        </div>

        <TotalLikes id={id} />

        <div className="post__comments">
          <Comments id={id} postOwner={postData.username} />
        </div>
      </div>
      <div className="col-2">
        <div className="col-2__info">
          <h2>Title</h2>
          <p className="post__title">{postData.title}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="post__container" key={id}>
      <div className="col-1">
        <div className="user__container">
          <BiUserCircle size="1.5em" className="user__img" />

          <h5 className="username">{postData.username}</h5>
        </div>


        <div className="image__container">
          <h2>Title</h2>
          <p className="post__title">{postData.title}</p>
        </div>

        <div className="post__reactions">
          <Likes id={id} />

          <BsChat
            size="1.2em"
            className="comment"
            onClick={toggleCommentForm}
          />

          <IoPaperPlaneOutline
            size="1.2em"
            className="share"
            onClick={openShareForm}
          />
        </div>
        <TotalLikes id={id} />
      </div>

      <div className="col-2">
        <h2 className="comment__heading">Comments</h2>
        <Comments id={id} postOwner={postData.username} />
      </div>
    </div>
  );
};

export default Post;
