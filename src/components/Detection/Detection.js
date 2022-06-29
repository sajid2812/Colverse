import React, { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import FormData from "form-data";
import { storage } from "../../config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Detection = () => {
  const [img, setImg] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [result, setResult] = useState({});
  const handleImage = (e) => {
    setImg(e.target.files[0]);
  };

  const formData = new FormData();
  useEffect(() => {
    console.log("useEffect running");
    formData.append("imageURL", imageURL);
    fetch("http://localhost:8000/detect", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageURL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(img);
    const detectImagesRef = ref(storage, `detectImages/${img.name}`);
    const uploadTask = uploadBytesResumable(detectImagesRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " % done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <>
      {result.status === "success" ? "good" : "bad"}
      <form onSubmit={handleSubmit}>
        <div className="create__second-a">
          <input type="file" onChange={handleImage} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Detection;
