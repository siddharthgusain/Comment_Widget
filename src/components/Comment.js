import { useState } from "react";
import { ADD, AUTHOR, CANCEL, DELETE, MSG_ERROR, REPLY, SUPER_USER, EDIT, ADMIN_USER } from "../utils/constants";
import "../styles/Comment.css";
import icon from "../assets/icon.png";
import chat from "../assets/chat.png";
import unliked from "../assets/unliked.png";
import deleteComment from "../assets/deleteComment.png";
import editComment from "../assets/editComment.png";

export default function Comment({ comment, updateComments, deleteComments, editNewComment, upvoteComment }) {

    const nestedComments = (comment.children || []).map((comment) => {
        return (
            <Comment
                key={comment.id}
                comment={comment}
                updateComments={updateComments}
                deleteComments={deleteComments}
                editNewComment={editNewComment}
                upvoteComment={upvoteComment}
                type="child"
            />
        );
    });

    const [isReplyClicked, setIsReplyClicked] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [inputVal, setInput] = useState('');
    const [messageError, setMessageError] = useState(false);
    const [editmessageError, setEditMessageError] = useState(false);
    const [editInputVal, setEditInput] = useState('');

    const onClickReply = (e) => {
        setMessageError(false);
        setInput('');
        setIsReplyClicked(!isReplyClicked);
    }

    const onEditClick = (text) => {
        setEditInput(text);
        setIsEditClicked(!isEditClicked);
    }

    const onInput = (e) => {
        setInput(e.target.value);
    }

    const onEditInput = (e) => {
        setEditInput(e.target.value);
    }

    const addComments = () => {
        if (inputVal) {
            updateComments(comment.id, inputVal);
            setIsReplyClicked(!isReplyClicked);
            setMessageError(false);
        } else {
            setMessageError(true);
        }
    }

    const editComments = (comment) => {
        if (editInputVal) {
            editNewComment(comment, editInputVal);
            setIsEditClicked(!isEditClicked);
            setEditMessageError(false);
        } else {
            setEditMessageError(true);
        }
    }

    const likeComment = (comment) => {
        upvoteComment(comment);
    }

    return (

        <div className="commentContainer">
            <div className='innerContainer'>
                <div className="authorImage">
                    <img src={icon}></img>
                </div>
                <div className="detailsContainer">
                    <div className="commentDetails">
                        <div className="author">
                            {comment.author}
                        </div>
                        <div>{comment.createdDate}</div>
                        <div className='text'>{comment.text}</div>
                    </div>

                    <div className="commentOptions">
                        <div className="likeIconContainer" onClick={(e) => likeComment(comment)}>
                            <img src={unliked} width="20px" height="20px"></img>
                            <p>{comment.likeCount}</p>
                        </div>
                        {!isEditClicked && !isReplyClicked && (AUTHOR === comment.author)
                            &&
                            <button className="edit" onClick={(e) => onEditClick(comment.text)}>
                                <img src={editComment}></img>
                                {EDIT}
                            </button>}
                        {
                            !isReplyClicked && !isEditClicked
                            &&
                            <button className="reply" onClick={(e) => onClickReply(e)}>
                                <img src={chat}></img>
                                {REPLY}
                            </button>
                        }
                        {!isReplyClicked && !isEditClicked && (AUTHOR === comment.author || ADMIN_USER)
                            &&
                            <button className="delete" onClick={() => deleteComments(comment.id)}>
                                <img src={deleteComment}></img>
                                {DELETE}
                            </button>}
                    </div>
                </div>
            </div>
            {isReplyClicked &&
                <div>
                    <input type='text' placeholder='Add Reply' onChange={(e) => onInput(e)} />
                    <button className='comments' onClick={(e) => addComments(e)}>{ADD}</button>
                    <button className='cancel' onClick={(e) => setIsReplyClicked(!isReplyClicked)}>{CANCEL}</button>
                    {messageError && <div style={{ color: 'red', fontSize: '12px' }}>{MSG_ERROR}</div>}
                </div>
            }
            {isEditClicked &&
                <div>
                    <input type='text' placeholder='Edit comment' defaultValue={editInputVal} onChange={(e) => onEditInput(e)} />
                    <button className='comments' onClick={(e) => editComments(comment)}>{ADD}</button>
                    <button className='cancel' onClick={(e) => setIsEditClicked(!isEditClicked)}>{CANCEL}</button>
                    {editmessageError && <div style={{ color: 'red', fontSize: '12px' }}>{MSG_ERROR}</div>}
                </div>
            }

            {nestedComments}
        </div>

    );
}