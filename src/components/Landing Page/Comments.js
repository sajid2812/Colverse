import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../config";
import { ContextProvider } from "../../Global/Context";
import "./Comments.css";

import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import moment from "moment";

import { TiDelete } from "react-icons/ti";

const Comments = (props) => {
  const { loader, user, publishComment, closeCommentModel, commentModel } =
    useContext(ContextProvider);
  const [state, setState] = useState("");
  const [comments, setComments] = useState([]);
  const [emojiBoard, setEmojiBoard] = useState(false);
  const [commentId, setCommentId] = useState([]);

  const postComment = (e) => {
    e.preventDefault();

    if (state) {
      publishComment({ id: props.id, comment: state });
      setState("");
      setEmojiBoard(false);
      closeCommentModel();
    }
  };

  const deleteComment = (commentId) => {
    console.log(commentId);
    deleteDoc(doc(db, "posts", props.id, "comments", commentId));
    console.log("hello");
  };

  useEffect(() => {
    //fetch comments from firebase
    const q = query(
      collection(db, "posts", props.id, "comments"),
      orderBy("currentTime", "desc")
    );
    onSnapshot(q, (snp) => {
      // console.log(snp.docs.map((doc) => doc.id));
      setComments(snp.docs.map((doc) => doc.data()));
      setCommentId(snp.docs.map((doc) => doc.id));
    });
  }, []);

  return (
    <div className="comments">
      {props.showCount
        ? comments.map(
            (comment, index) =>
              index < 2 && (
                <div className="comments__container" key={commentId[index]}>
                  <div className="comments__info">
                    <div className="comments__container-name">
                      {comment.username}
                    </div>
                    <div className="comments__container-msg">
                      {comment.comment}
                    </div>
                  </div>
                  {(user?.displayName === comment?.username ||
                    user?.displayName === props?.postOwner) && (
                    <span
                      className="delete__comment"
                      onClick={() => deleteComment(commentId[index])}
                    >
                      delete
                    </span>
                  )}
                </div>
              )
          )
        : comments.map((comment, index) => (
            <div className="comments__container" key={commentId[index]}>
              <div className="comments__info">
                <div className="comments__container-name">
                  {comment.username}
                </div>
                <div className="comments__container-msg">{comment.comment}</div>
              </div>
              {(user?.displayName === comment?.username ||
                user?.displayName === props?.postOwner) && (
                <span
                  className="delete__comment"
                  onClick={() => deleteComment(commentId[index])}
                >
                  delete
                </span>
              )}
            </div>
          ))}

      <Link to={`/posts/${props.id}`} className="viewComments__link">
        <div className="comments__container view__comments">
          {props.showCount &&
            (comments.length < 2 ? (
              <span>View all comments</span>
            ) : (
              <span>View all {comments.length} comments</span>
            ))}
        </div>
      </Link>

      {props.currentTime && (
        <span className="post__date">
          {moment(props.currentTime * 1000)
            .format("MMMM D")
            .toUpperCase()}
        </span>
      )}

      <div className="comments__section">
        {!loader && user && commentModel ? (
          <form onSubmit={postComment}>
            <input
              type="text"
              className="comment__input"
              placeholder="Add a comment..."
              onChange={(e) => setState(e.target.value)}
              value={state}
              required
            />

            <span onClick={() => setEmojiBoard(!emojiBoard)}>
              <EmojiEmotionsIcon />
            </span>
            {emojiBoard ? (
              <div>
                <Picker
                  pickerStyle={{ boxShadow: "none" }}
                  onEmojiClick={(e, emojiObject) =>
                    setState(state + emojiObject?.emoji)
                  }
                />
              </div>
            ) : (
              ""
            )}

            <SendIcon className="send__icon" onClick={postComment} />
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comments;
