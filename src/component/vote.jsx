import React, { useState } from "react";

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
    <div className="vote-button">
      <button
        className={`upvote ${vote > score ? "active" : ""}`}
        onClick={handleUpVote}
      >
        +
      </button>
      <span className={`vote-count`}>{vote}</span>
      <button
        className={`upvote ${vote < score ? "active" : ""}`}
        onClick={handledownVote}
      >
        -
      </button>
    </div>
  );
};

export default Vote;
