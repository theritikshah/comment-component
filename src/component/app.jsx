import React from "react";
import MainComment from "./MainComment";
import Avatar from "../images/avatars/image-juliusomo.png";
import { useState, useEffect } from "react";
import Editor from "./Editor";

const App = () => {
  const [commentsArray, setCommentsArray] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetch("/data.json")
      .then((data) => data.json())
      .then((data) => {
        setCommentsArray(data.comments);
        setCurrentUser(data.currentUser);
      });
  }, []);

  function handleReply(id) {
    // console.log(commentsArray.filter(()=>(comment[] )))
    setCommentsArray((pre) =>
      pre.filter((c, i) => {
        return i !== id;
      })
    );
  }

  function handleSubmit(value) {
    const comment = {
      user: { ...currentUser },
      content: value,
      score: 0,
      replies: [],
    };
    setCommentsArray((pre) => [...pre, comment]);
    console.log(commentsArray);
  }

  return (
    <div>
      {commentsArray.map((comment, i) => (
        <MainComment
          id={i}
          handleReply={handleReply}
          comment={comment}
          key={i}
          index={i}
          currentUser={currentUser}
        />
      ))}

      {currentUser && (
        <Editor onSubmit={handleSubmit} currentUser={currentUser} />
      )}
    </div>
  );
};

export default App;
