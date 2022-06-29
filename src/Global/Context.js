// IMPORTS
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../config";
export const ContextProvider = createContext();

// MAIN COMPONENT FUNCTION
const Context = (props) => {
  // use to navigate
  const navigate = useNavigate();

  // user
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // posts array
  const [posts, setPosts] = useState([]);
  // create book upload model

  const [bookUploadModel, setBookUploadModel] = useState(false);
  const openBookUploadModel = () => {
    setBookUploadModel(true);
  };
  const closeBookUploadModel = () => {
    setBookUploadModel(false);
  };
  // create post model
  const [model, setModel] = useState(false);
  const openModel = () => {
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };

  // write something model
  const [writeModel, setWriteModel] = useState(false);

  const openWriteModel = () => {
    setWriteModel(true);
  };

  const closeWriteModel = () => {
    setWriteModel(false);
  };

  //comment model
  const [commentModel, setCommentModel] = useState(false);
  const openCommentModel = () => {
    setCommentModel(true);
  };
  const closeCommentModel = () => {
    setCommentModel(false);
  };

  //share model
  const [shareModel, setShareModel] = useState(false);
  const openShareModel = () => {
    setShareModel(true);
  };
  const closeShareModel = () => {
    setShareModel(false);
  };

  //detect model
  const [detectModel, setDetectModel] = useState(false);
  const [detectLoader, setDetectLoader] = useState(true);
  const [detectInfo, setDetectInfo] = useState("");
  const openDetectModel = () => {
    setDetectModel(true);
  };
  const closeDetectModel = () => {
    setDetectModel(false);
  };

  const setDetectMessage = ({ info }) => {
    setDetectInfo(info);
  };

  const closeDetectLoader = () => {
    setDetectLoader(false);
  };

  const openDetectLoader = () => {
    setDetectLoader(true);
  };

  //current post id
  const [currentPostId, setCurrentPostId] = useState("");
  const setId = ({ id }) => {
    setCurrentPostId(id);
  };

  // handling register
  const register = async (user) => {
    const { username, email, password } = user;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(res.user.auth.currentUser, { displayName: username });
      navigate("/");
    } catch (error) {
       let err = JSON.stringify(error);
       alert(JSON.parse(err).code);
    }
  };

  // handling login
  const login = async (user) => {
    const { email, password } = user;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      let err = JSON.stringify(error);
      alert(JSON.parse(err).code);
    }
  };

  //handling logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // add post to the database
  const create = (data) => {
    const { title, image } = data;
    const imagesRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, image);
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
          // setDoc(doc(db, "posts", image.name), {
          addDoc(collection(db, "posts"), {
            title,
            image: downloadURL,
            username: user.displayName,
            currentTime: serverTimestamp(),
          });
        });
      }
    );
  };

  //publish comment
  const publishComment = async (data) => {
    const { id, comment } = data;

    const docRef = await addDoc(collection(db, "posts", id, "comments"), {
      comment,
      username: user.displayName,
      currentTime: serverTimestamp(),
    });
  };
  // setting book param id
  const [bookParamId, setBookParamId] = useState("");
  const setBookId = ({ id }) => {
    setBookParamId(id);
  };

  const publishBook = async (data) => {
    const { title, image, downloadLink, contributor } = data;

    const docRef = await addDoc(
      collection(db, "books", bookParamId, `${bookParamId}-books`),
      {
        title,
        image,
        downloadLink,
        contributor,
        currentTime: serverTimestamp(),
      }
    );
  };

  //publish write
  const write = async (data) => {
    const { title } = data;
    const docRef = await addDoc(collection(db, "posts"), {
      title,
      username: user.displayName,
      currentTime: serverTimestamp(),
    });
  };

  // publish like
  const publishLike = async (data) => {
    const { id, like, liked } = data;

    await setDoc(doc(db, "posts", id, "likes", user.displayName), {
      like,
      liked,
      username: user.displayName,
      currentTime: serverTimestamp(),
    });
    // console.log(docRef);
  };

  //remove like
  const deleteLike = async (data) => {
    const { id } = data;
    await deleteDoc(doc(db, "posts", id, "likes", user.displayName));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoader(false);
    });

    // fetch posts from firebase
    const q = query(collection(db, "posts"), orderBy("currentTime", "desc"));
    onSnapshot(q, (snp) => {
      setPosts(
        snp.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
          username: doc.data().username,
          currentTime: doc.data().currentTime.seconds,
        }))
      );
    });
  }, []);
  console.log(user);

  // fetching users list from database via server
  const [usersList, setUsersList] = useState([]);
  const callAPI = () => {
    fetch("http://localhost:8000/testAPI")
      .then((res) => res.json())
      .then((res) => setUsersList(res));
  };
  useEffect(() => {
    callAPI();
  }, []);

  // return statement
  return (
    <ContextProvider.Provider
      value={{
        register,
        login,
        user,
        loader,
        logout,
        model,
        openModel,
        closeModel,
        commentModel,
        openCommentModel,
        closeCommentModel,
        create,
        write,
        posts,
        publishComment,
        publishLike,
        publishBook,
        deleteLike,
        writeModel,
        openWriteModel,
        closeWriteModel,
        shareModel,
        openShareModel,
        closeShareModel,
        currentPostId,
        setId,
        usersList,
        bookUploadModel,
        openBookUploadModel,
        closeBookUploadModel,
        setBookId,
        detectModel,
        openDetectModel,
        closeDetectModel,
        detectInfo,
        setDetectMessage,
        detectLoader,
        closeDetectLoader,
        openDetectLoader,
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
