import "./styles/App.css";
import { WIDGET, ADD_COMMENT } from "./utils/constants";

function App() {

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
        />
        <button className="commentSubmitBtn">
          {ADD_COMMENT}
        </button>
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
