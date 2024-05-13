import React, { useState } from "react";

const Editor = ({ onSubmit, currentUser }) => {
  const [value, setValue] = useState();

  function onChange(e) {
    setValue(e.target.value);
  }

  console.log(currentUser);

  const Avatar = currentUser?.image.png?.substring(1);

  return (
    <div className="block submit-comment">
      <img className="user-avatar" srcSet={Avatar} alt="" />
      <textarea
        onChange={onChange}
        value={value}
        name="comment"
        id="comment-input"
        cols=""
        rows=""
      ></textarea>
      <button className="send" onClick={() => onSubmit(value)}>
        SEND
      </button>
    </div>
  );
};

export default Editor;
