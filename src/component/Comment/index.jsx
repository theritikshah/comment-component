import { useEffect, useState, useRef, forwardRef } from "react";
import Vote from "../Vote";
import Editor from "../Editor";

import styles from "./comment.module.scss";

const Comment = forwardRef(
  (
    {
      className,
      comment,
      currentUser,
      handleReply,
      handleDelete,
      id,
      handleUpdate,
      onEdit,
    },
    ref
  ) => {
    const { score, user, content, createdAt, replyingTo } = comment;
    const [text, setText] = useState();
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updateContent, setUpdateContent] = useState(content);

    const editorRef = useRef(null);

    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, [editorRef, isReplying]);

    const handleReplyClick = () => {
      setIsReplying((isEditing) => {
        if (onEdit) {
          onEdit(!isEditing);
        }
        return !isEditing;
      });

      // handleReply(id);
    };

    const onUpdate = () => {
      handleUpdate(id, updateContent);
      setIsEditing(false);
    };

    const onSubmit = (content) => {
      setIsReplying(false);
      editorRef.current.setText = "";
      handleReply(content, user);
    };

    const isCurrentUser = user.username === currentUser.username;

    const avatarSrc = user.image.png.substring(1);

    const UserCard = ({ userName }) => <h1>{userName}</h1>;

    useEffect(() => {
      const regex = /(?:^|\s)@(\w+)(?=\W|$)/;
      // const regex = /(\B@(\w+))|([^\s]+)|(\s+)/g;
      const parts = content.split(regex); // Split into parts
      const replacedText = parts.map((part, index) => {
        if (index % 2 === 0) {
          return part; // Non-mention part
        } else {
          const username = part?.trim(); // Extract the username

          const onHover = (event) => {};

          return (
            <span
              onMouseOver={onHover}
              className={styles.userMention}
              key={index}
            >
              {" "}
              @{username}
            </span>
          ); // Mention part wrapped in <span>
        }
      });

      setText(replacedText);
    }, [content]);

    return (
      <div
        className={`${styles.container} ${className ? styles[className] : ""}`}
        ref={ref}
      >
        <div className={styles.comment_container}>
          <div className={styles.vote_container}>
            <Vote score={score} />
          </div>
          <div className={styles.comment_info}>
            <img src={avatarSrc} alt="avatar" className="" />
            <h3 className="">{user.username}</h3>
            {isCurrentUser && <span className={styles.tag}>you</span>}
            <span className={styles.createdAt}>{createdAt && createdAt}</span>
          </div>
          <div className={styles.cta}>
            {!isCurrentUser && (
              <button onClick={handleReplyClick} className="">
                <i className={`menu-icon fa-solid fa-reply`}></i>
                Reply
              </button>
            )}
            {isCurrentUser && !isEditing && (
              <>
                <button
                  onClick={() => handleDelete(id)}
                  style={{ color: "var(--Soft-Red)" }}
                >
                  <i
                    style={{ color: "var(--Soft-Red)" }}
                    className={`menu-icon fa-solid fa-trash`}
                  ></i>
                  Delete
                </button>
                <button onClick={() => setIsEditing((edit) => !edit)}>
                  <i className={`menu-icon fa-solid fa-pen`}></i>
                  Edit
                </button>
              </>
            )}
          </div>
          {isEditing ? (
            <>
              <textarea
                value={updateContent}
                onChange={(event) => setUpdateContent(event.target.value)}
              ></textarea>
            </>
          ) : (
            <p className={styles.comment_content}>
              {replyingTo !== undefined ? (
                <span className={styles.userMention}>{`@${replyingTo}`}</span>
              ) : (
                ""
              )}{" "}
              {text}
            </p>
          )}
          {isEditing && (
            <button className={styles.update_button} onClick={onUpdate}>
              Update
            </button>
          )}
        </div>
        {isReplying && (
          <Editor
            ref={editorRef}
            onSubmit={onSubmit}
            currentUser={currentUser}
            cta="Reply"
          />
        )}
      </div>
    );
  }
);

export default Comment;
