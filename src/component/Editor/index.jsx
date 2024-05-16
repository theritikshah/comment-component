import React, { useState, forwardRef } from "react";
import styles from "./editor.module.scss";

const Editor = forwardRef(
  ({ onSubmit, currentUser, cta = "Send", placeholder = "" }, ref) => {
    const [value, setValue] = useState();

    function onChange(e) {
      setValue(e.target.value);
    }

    const Avatar = currentUser?.image.png?.substring(1);

    return (
      <div className={styles.container}>
        <img className={styles.user_avatar} srcSet={Avatar} alt="" />
        <textarea
          onChange={onChange}
          value={value}
          name="comment"
          id="comment-input"
          ref={ref}
          placeholder={placeholder}
        ></textarea>
        <button
          className={styles.send}
          onClick={() => {
            onSubmit(value);
            setValue("");
          }}
        >
          {cta}
        </button>
      </div>
    );
  }
);

export default Editor;
