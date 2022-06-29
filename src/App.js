import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import Library from "./Library";
import CollegeUpdate from "./components/College Updates/CollegeUpdate";
import TechUpdate from "./components/Tech Updates/TechUpdate";
import Library from "./components/E-Library/Library";
import Landing from "./components/Landing Page/Landing";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/Signup";
import Context from "./Global/Context";
import Create from "./components/Landing Page/Create";
import Write from "./components/Landing Page/Write";
import Post from "./components/Landing Page/Post";
import Share from "./components/Landing Page/Share";
import Books from "./components/E-Library/Books";
import BookUpload from "./components/Landing Page/BookUpload";
import Detection from "./components/Detection/Detection";
import DetectLoader from "./components/Landing Page/DetectLoader";
function App() {
  return (
    <div className="App">
      <Context>
        <Navbar />
        <Create />
        <Write />
        <Share />
        <BookUpload />
        <DetectLoader/>

        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/TechUpdate" element={<TechUpdate />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/CollegeUpdate" element={<CollegeUpdate />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/Library/:id" element={<Books />} />
          <Route path="/Detection" element={<Detection />} />
        </Routes>
      </Context>
    </div>
  );
}

export default App;
