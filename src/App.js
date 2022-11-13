import "./styles/App.css";
import { WIDGET, ADD_COMMENT, MSG_ERROR, AUTHOR } from "./utils/constants";
import { initialComments } from "./utils/TestData";
import { useState, useEffect } from "react";
import { setLocalStorage, checkLocalData, getLocalStorage } from "./utils/localStorage";
import TreeCreation from "./components/Tree";
import Comment from "./components/Comment";

function App() {

  let [comments, setComments] = useState(initialComments);
  const [newCommentsValue, setNewCommentsValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (checkLocalData()) {

      setComments(getLocalStorage());
    }
  }, []);

  const createDate = () => {
    const date = new Date();
    const d =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0");
    return d;
  };

  const updateComments = (id, text) => {
    const commentAdditional = {
      id: Date.now(),
      text: text,
      author: AUTHOR,
      children: null,
      likeCount: 0,
      parentId: id,
      createdDate: createDate()
    };
    const updatedComments = [...comments, commentAdditional];
    setComments(updatedComments);
    setLocalStorage(updatedComments);
  };

  const deleteComments = (id) => {
    let remainingValues = comments.filter((item) => {
      if (item.parentId !== id && item.id !== id) {
        return item;
      }
    });

    setComments(remainingValues);
    setLocalStorage(remainingValues);
  };

  const addNewComment = (e) => {
    if (newCommentsValue) {
      const newComment = {
        id: Date.now(),
        text: newCommentsValue,
        author: AUTHOR,
        children: null,
        parentId: null,
        likeCount: 0,
        createdDate: createDate()
      };
      setError(false);
      const allComments = [...comments, newComment];
      setComments(allComments);
      setLocalStorage(allComments);
      // setNewCommentsValue('');
    } else {
      setError(true);
    }
  };

  const editNewComment = (comment, text) => {
    if (text) {
      comments = comments.filter((item) => item.id !== comment.id);

      const editComment = {
        id: comment.id,
        text: text,
        author: comment.author,
        children: comment.children,
        likeCount: comment.likeCount,
        parentId: comment.parentId,
        createdDate: createDate()
      };
      // setError(false);
      const allComments = [editComment, ...comments];
      setComments(allComments);
      setLocalStorage(allComments);
    } else {
      // setError(true);
    }
  };

  const upvoteComment = (comment) => {
    comments = comments.filter((item) => item.id !== comment.id);
    const editComment = {
      id: comment.id,
      text: comment.text,
      author: comment.author,
      children: comment.children,
      likeCount: comment.likeCount + 1,
      parentId: comment.parentId,
      createdDate: createDate()
    };

    const allComments = [editComment, ...comments];
    setComments(allComments);
    setLocalStorage(allComments);
  };

  const commentTree = TreeCreation(comments);

  return (
    <>
      <div className="headingContainer">
        <h1>{WIDGET}</h1>
      </div>
      <div className="subheadingContainer">
        ADD A COMMENT TO GET STARTED
      </div>
      <div className="commentInputContainer">
        <input
          className="commentInput"
          type="text"
          placeholder="Add a comment..."
          onBlur={(e) => (e.target.value = "")}
          onChange={(e) => setNewCommentsValue(e.target.value)}
        />
        <button className="commentSubmitBtn" onClick={(e) => addNewComment(e)}>
          {ADD_COMMENT}
        </button>
        {error && (
          <div style={{ color: "red", fontSize: "12px" }}>{MSG_ERROR}</div>
        )}
      </div>
      <div className="commentsContainer">
        {commentTree.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              updateComments={updateComments}
              deleteComments={deleteComments}
              editNewComment={editNewComment}
              upvoteComment={upvoteComment}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;


/*

Requirements:-
1. The comments section should be responsive and have optimal layout on all screen sizes.
2. A user should be able to read, post, edit & delete comments.
3. A user can reply to a comment, and a reply should be nested inside its parent comment.
4. A user should be able to upvote a comment.
*/
