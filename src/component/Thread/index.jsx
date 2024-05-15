import { useEffect, useState, useRef, useCallback } from "react";
import Comment from "../Comment/index.jsx";
import styles from "./thread.module.scss";

const Thread = ({ id, comment, currentUser, setCommentsArray }) => {
  const { replies = [] } = comment;
  const [updatedReplies, setUpdatedReplies] = useState(replies);
  const [replyBoxHeigth, setReplyBoxHeigth] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const commentRef = useRef(null);
  const replyContainerRef = useRef(null);

  const handleReply = (content, user) => {
    setUpdatedReplies((preReplies) => {
      const reply = {
        id: preReplies.length + 1,
        content,
        score: 0,
        replyingTo: user.username,
        user: currentUser,
      };
      return [...preReplies, reply];
    });
    commentRef.current.scrollIntoView(true);
  };

  const handleDeleteComment = useCallback((id) => {
    setCommentsArray((preComments) =>
      preComments.filter(({ id: preId }) => preId !== id)
    );
  });

  const handleDeleteReply = useCallback((replyId) => {
    setUpdatedReplies((preComments) =>
      preComments.filter(({ id: preId }) => preId !== replyId)
    );
  });

  const handleCommentUpdate = useCallback((id, content) => {
    setCommentsArray((preComments) =>
      preComments.map((comment) => {
        if (comment.id !== id) return comment;
        comment.content = content;
        return comment;
      })
    );
  }, []);
  const handleReplyUpdate = useCallback(
    (id, content) => {
      setUpdatedReplies((preComments) => {
        return preComments.map((comment) => {
          if (comment.id !== id) return comment;
          comment.content = content;
          return comment;
        });
      });
    },
    [updatedReplies]
  );

  useEffect(() => {
    if (!replyContainerRef.current) return;
    const heigth = replyContainerRef.current.clientHeight;
    const commentHeigth = commentRef.current.clientHeight;
    setReplyBoxHeigth(heigth - commentHeigth / 2 + 25 - 15);
  }, [
    isEditing,
    replyContainerRef.current,
    commentRef.current,
    updatedReplies,
  ]);

  return (
    <div className={styles.thread_container}>
      <Comment
        comment={comment}
        handleReply={handleReply}
        id={id}
        currentUser={currentUser}
        handleDelete={handleDeleteComment}
        handleUpdate={handleCommentUpdate}
      />

      {Boolean(updatedReplies?.length) && (
        <div
          className={styles.replies}
          style={{ ["--box-height"]: `${replyBoxHeigth}px` }}
          ref={replyContainerRef}
        >
          {updatedReplies.map((reply, index) => (
            <>
              <Comment
                comment={reply}
                handleReply={handleReply}
                id={reply?.id}
                currentUser={currentUser}
                ref={index == updatedReplies.length - 1 ? commentRef : null}
                handleDelete={handleDeleteReply}
                handleUpdate={handleReplyUpdate}
                key={index}
                className={"reply-box"}
                onEdit={(isEditing) => setIsEditing(isEditing)}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thread;
