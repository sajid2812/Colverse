import "./Technews.css";

export default function Technews(props) {
  const { id, img, title, para, url } = props;
  return (
    <>
      <div className="MainContent">
        {img ? <img src={img} className="image"></img> : ""}

        <p className="paratech">
          <h3 className="NewsHead">
            <a href={url}>{title}</a>
          </h3>
          {para} ...
          <a href={url} className="SeeMore">
            see more
          </a>
        </p>
      </div>
    </>
  );
}
