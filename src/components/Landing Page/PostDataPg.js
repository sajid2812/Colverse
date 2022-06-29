import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../Global/Context";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import "./PostDataPg.css";
import Comments from "./Comments";
import Likes from "./Likes";
import { Link } from "react-router-dom";
import TotalLikes from "./TotalLikes";
import { BiUserCircle } from "react-icons/bi";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

export default function PostDataPg() {
  const {
    user,
    setId,
    openShareModel,
    posts,
    commentModel,
    openCommentModel,
    closeCommentModel,
  } = useContext(ContextProvider);

  const toggleCommentForm = () => {
    commentModel ? closeCommentModel() : openCommentModel();
  };

  const openShareForm = (id) => {
    openShareModel();
    setId({ id: id });
  };

  const deletePost = (postId) => {
    deleteDoc(doc(db, "posts", postId));
  };

  return (
    <>
      {posts.map((post) => (
        <div className="main" key={post.id}>
          <div className="flex">
            <div className="user__data">
              <BiUserCircle size="2em" />

              <h5 className="name">{post.username}</h5>
            </div>
            <Link to={`/posts/${post.id}`} className="see__more">
              <span>...</span>
            </Link>
          </div>
          <p>{post.title}</p>
          <div className="main_post">
            <img src={post.image}></img>
          </div>
          <div className="reactions">
            <div className="lcs__container">
              <Likes id={post.id} />

              <BsChat
                className="comment"
                size="1.2em"
                onClick={toggleCommentForm}
              />

              <IoPaperPlaneOutline
                className="share"
                size="1.2em"
                onClick={() => openShareForm(post.id)}
              />
            </div>
            {user?.displayName === post?.username && (
              <MdDelete
                className="dustbin"
                size="1.5em"
                onClick={() => deletePost(post.id)}
              />
            )}
          </div>
          <TotalLikes id={post.id} />
          <Comments
            currentTime={post.currentTime}
            id={post.id}
            showCount={true}
            postOwner = {post.username}
          />
        </div>
      ))}
    </>
  );
}
