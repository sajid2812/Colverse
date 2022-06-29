import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config";
import "./TotalLikes.css";

const TotalLikes = (props) => {
  const [likes, setLikes] = useState(0);

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
  return (
    <div className="like__count">
      {likes < 2 ? `${likes} like` : `${likes} likes`}
    </div>
  );
};

export default TotalLikes;
