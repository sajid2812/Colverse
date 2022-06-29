import React, { useContext, useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ContextProvider } from "../../Global/Context";
import "./Create.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config";
import Picker from "emoji-picker-react";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Create = () => {
  const {
    create,
    model,
    closeModel,
    loader,
    user,
    openDetectModel,
    setDetectMessage,
    closeDetectLoader,
  } = useContext(ContextProvider);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [result, setResult] = useState({});
  const [emojiBoard, setEmojiBoard] = useState(false);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const formData = new FormData();

  const createPost = (e) => {
    e.preventDefault();
    const detectImagesRef = ref(storage, `detectImages/${image.name}`);
    const uploadTask = uploadBytesResumable(detectImagesRef, image);
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
          formData.append("imageURL", downloadURL);
          console.log(formData);
          fetch("http://localhost:8000/detect", {
            method: "post",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              closeDetectLoader();
              // upload logic

              if (data.status === "success") {
                if (
                  data.nudity.raw >=
                  Math.max(data.nudity.partial, data.nudity.safe)
                ) {
                  setDetectMessage({
                    info: "vulgar image detected, can't upload",
                  });
                } else if (
                  data.nudity.partial >=
                  Math.max(data.nudity.raw, data.nudity.safe)
                ) {
                  setDetectMessage({
                    info: "vulgar image detected, change image",
                  });
                } else {
                  setDetectMessage({ info: "post uploaded" });
                  create({ title, image });
                }
              } else {
                setDetectMessage({ info: "please select an image to upload" });
              }
              setResult(data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );

    setTitle("");
    setImage("");
    setEmojiBoard(false);
    closeModel();
    openDetectModel();
  };

  const closeForm = (e) => {
    const className = e.target.getAttribute("class");
    if (className === "model") {
      setEmojiBoard(false);
      closeModel();
    }
  };
  return (
    <>
      {!loader && user && model ? (
        <div className="model" onClick={closeForm}>
          <div className="create">
            <form onSubmit={createPost}>
              <div>
                <input
                  type="text"
                  className="create__input"
                  placeholder="What is in your mind..."
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>
              <div className="create__second">
                <div className="create__second-a">
                  <label htmlFor="file">
                    <CameraAltIcon className="camera" />
                  </label>
                  <input
                    type="file"
                    className="file"
                    id="file"
                    onChange={handleImage}
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
                          setTitle(title + emojiObject?.emoji)
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="create__second-b">
                  <input
                    type="submit"
                    value="Create"
                    className="btn-sweet"
                  ></input>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Create;
