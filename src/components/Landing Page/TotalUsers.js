import "./TotalUsers.css";

export default function TotalUsers(props) {
  const { profName, profImg } = props;
  return (
    <>
      <div className="main">
        <div className="flex">
          <img src={profImg} className="profileImage"></img>
          <h5 className="name">{profName}</h5>
        </div>
      </div>
    </>
  );
}
