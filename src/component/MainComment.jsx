import Vote from "./vote";

const MainComment = ({ handleReply, id, index, comment }) => {
  const { score, user, content, createdAt } = comment;

  const handleReplyClick = () => {
    handleReply(id);
  };

  const avatarSrc = user.image.png.substring(1);
  const regex = /(?:^|\s)@(\w+)(?=\s)/g;
  const replacedText = content.replace(regex, (match, username) => {
    return <span>@${username}</span>;
  });

  console.log(JSON.stringify(replacedText));

  return (
    <div data-id={index} className="block parent-comment">
      <div className="vote">
        <Vote score={score} />
      </div>
      <section className="comment">
        <div className="header">
          <div className="profile">
            <img src={avatarSrc} alt="avatar" className="avatar" />
            <h3 className="user-name">{user.username}</h3>
            <span className="comment-duration">{createdAt && createdAt}</span>
          </div>
          <div className="reply-button">
            <button
              data-id={index}
              onClick={handleReplyClick}
              className="replyButton"
            >
              <i className={`menu-icon fa-solid fa-reply`}></i>
              Reply
            </button>
            <i className="menu-icon fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="text-comment">
          <p className="comment">{replacedText}</p>
        </div>
      </section>
    </div>
  );
};

export default MainComment;
