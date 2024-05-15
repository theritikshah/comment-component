import React, { useState } from "react";
import styles from "./vote.module.scss";

const Vote = ({ score }) => {
  const [vote, setVote] = useState(score);

  const handleUpVote = () => {
    setVote((preVote) => {
      if (preVote > score) {
        return score;
      } else {
        return score + 1;
      }
    });
  };
  const handledownVote = () => {
    setVote((preVote) => {
      if (preVote < score) {
        return score;
      } else {
        return score - 1;
      }
    });
  };
  return (
    <div className={`${styles.votebutton}`}>
      <button
        className={`${styles.upvote} ${vote > score ? styles.active : ""}`}
        onClick={handleUpVote}
      >
        +
      </button>
      <span className={`${styles.votecount}`}>{vote}</span>
      <button
        className={`${styles.upvote} ${vote < score ? styles.active : ""}`}
        onClick={handledownVote}
      >
        -
      </button>
    </div>
  );
};

export default Vote;
