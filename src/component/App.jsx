import React from "react";
import Avatar from "../images/avatars/image-juliusomo.png";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import styles from "./app.module.scss";
import Thread from "./Thread";

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
  }

  return (
    <div className={styles.container}>
      {commentsArray.map((comment, i) => (
        <Thread
          id={comment.id}
          handleReply={handleReply}
          comment={comment}
          key={i}
          index={i}
          currentUser={currentUser}
          setCommentsArray={setCommentsArray}
        />
      ))}

      {currentUser && (
        <Editor onSubmit={handleSubmit} currentUser={currentUser} />
      )}
    </div>
  );
};

export default App;
