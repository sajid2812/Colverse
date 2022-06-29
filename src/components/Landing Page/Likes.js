import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { db } from "../../config";
import { ContextProvider } from "../../Global/Context";
import "./Likes.css";
const Likes = (props) => {
  const { loader, user, publishLike, deleteLike } = useContext(ContextProvider);

  const [likes, setLikes] = useState(0);
  const [canLike, setCanLike] = useState(true);
  const handleLike = (e) => {
    if (!loader && user) {
      e.preventDefault();

      if (canLike) {
        publishLike({
          id: props.id,
          like: 1,
          liked: true,
        });
      } else {
        deleteLike({
          id: props.id,
        });
        setCanLike(true);
      }
    }
  };

  useEffect(() => {
    //fetch likes from firebase
    const q = query(
      collection(db, "posts", props.id, "likes"),
      orderBy("currentTime", "desc")
    );
    onSnapshot(q, (snp) => {
      setLikes(
        snp.docs.reduce((totalLike, currentObj) => {
          return totalLike + currentObj.data().like;
        }, 0)
      );
    });
  }, []);

  useEffect(() => {
    //fetch likes from firebase
    const q = query(
      collection(db, "posts", props.id, "likes"),
      orderBy("currentTime", "desc")
    );
    onSnapshot(q, (snp) => {
      const likeArray = snp.docs.map((doc) => doc.data());
      for (let userObj of likeArray) {
        if (userObj.username === user.displayName) setCanLike(!userObj.liked);
      }
    });
  }, []);
  return (
    <div className="like__container">
      {canLike ? (
        <ThumbUpIcon className="like like__icon" onClick={handleLike} />
      ) : (
        <ThumbUpIcon className="after__like like__icon" onClick={handleLike} />
      )}

      
    </div>
  );
};

export default Likes;
