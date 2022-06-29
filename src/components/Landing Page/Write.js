import "./Write.css";
import React, { useContext, useState } from "react";
import { ContextProvider } from "../../Global/Context";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Write = () => {
  const { write, writeModel, closeWriteModel, loader, user } =
    useContext(ContextProvider);
  const [title, setTitle] = useState("");

  const [emojiBoard, setEmojiBoard] = useState(false);

  const createPost = (e) => {
    e.preventDefault();
    write({ title });
    setTitle("");
    setEmojiBoard(false);
    closeWriteModel();
  };

  const closeForm = (e) => {
    const className = e.target.getAttribute("class");
    if (className === "model") {
      setEmojiBoard(false);
      closeWriteModel();
    }
  };
  return (
    <>
      {!loader && user && writeModel ? (
        <div className="model" onClick={closeForm}>
          <div className="write">
            <form onSubmit={createPost}>
              <div>
                <textarea
                  type="text"
                  className="write__input"
                  placeholder="What's happening?"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>
              <div className="btn-container">
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

                <input
                  type="submit"
                  value="Post"
                  className="btn-submit"
                ></input>
              </div>
            </form>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Write;
