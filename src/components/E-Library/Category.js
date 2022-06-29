import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";
const Category = (props) => {
  return (
    <>
      <Link to={`/Library/${props.name}`} className="category__link">
        <div className="category__container">
          <h2>{props.name}</h2>
          <h2>{">"}</h2>
        </div>
      </Link>
    </>
  );
};

export default Category;
