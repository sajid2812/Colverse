import React, { useContext } from "react";
import { ContextProvider } from "../../Global/Context";
import "./DetectLoader.css";

const DetectLoader = () => {
  const {openDetectLoader, detectLoader, closeDetectModel, detectInfo, detectModel } =
    useContext(ContextProvider);

  const closeForm = (e) => {
    closeDetectModel();
    openDetectLoader();
  };
  return (
    <>
      {detectModel ? (
        <div className="model">
          {detectLoader ? (
            <div className="loader__component">
              <h3>Detecting Image, Please wait...</h3>
              <div className="loader"></div>
            </div>
          ) : (
            <div className="loader__component">
              <h3>{detectInfo}</h3>
              <button onClick={closeForm}>Close</button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DetectLoader;
