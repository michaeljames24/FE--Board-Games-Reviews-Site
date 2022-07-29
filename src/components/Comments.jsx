import { useState, useEffect, useContext } from 'react';
import * as api from "../data/api";
import Card from './Card';
import { NotificationContext } from '../contexts/NotificationContext';

export default function Comments({review_id}) {
    const { setNotificationMessage } = useContext(NotificationContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [commentValue, setCommentValue] = useState("");
    

    useEffect(() => {
        setIsLoading(true);
        api.fetchCommentsByReviewID(review_id)
            .then((updatedComments) => {
                setIsLoading(false);
                setComments(updatedComments);
            })

    }, [review_id]);

    useEffect(() => {
        if (newComment.body) {
            setIsLoading(true);
            api.postComment(review_id, newComment)
                .then(() => {
                    api.fetchCommentsByReviewID(review_id)
                        .then((updatedComments) => {
                            setIsLoading(false);
                            setComments(updatedComments);
                        })
                });
        }
    // eslint-disable-next-line
    }, [newComment]);




    useEffect(() => {
        if (commentToDelete) {
            setIsLoading(true);
            console.log(commentToDelete + " has been deleted.")
            api.deleteCommentByID(commentToDelete)
                .then(() => {
                    api.fetchCommentsByReviewID(review_id)
                        .then((updatedComments) => {
                            setIsLoading(false);
                            setComments(updatedComments);
                            setNotificationMessage({on: true, message: `Comment ${commentToDelete} deleted.`});
                        })
                });
        }
    }, [commentToDelete]);




    function autoScroll() {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
          });
    }

    function updateComment(e) {
        setCommentValue(e.target.value);
    }

    function postComment(e) {
        const commentField = document.getElementById("commentField");

        e.preventDefault(); 

        if (commentValue.match(/./) !== null) {
            setIsLoading(true);
            commentField.style.border = "1px solid black";
            setNewComment({
                username: "default_user123", 
                body: commentValue
            })
            setCommentValue("");
        } else {
            commentField.style.border = "1px solid red";
            document.getElementById("commentErrorMsg").style.display = "block";
        }
    }

    return isLoading ? (<p className='loadingMsg'>Loading comments...</p>) : (
        <div className="commentsList">
            <div className="commentsHeader">
                <h4>Comments:</h4>
                <button className="commentScrollBtn" onClick={autoScroll}>Post Comment &darr;</button>
            </div>
            {comments.map((comment) => {return <Card comment={comment} setCommentToDelete={setCommentToDelete} key={comment.comment_id}/>})}
            {comments.length === 0 && <p id="noCommentsMsg">Be the first to comment on this review.</p>}
            <h5 style={{marginTop: "2vh"}}>Commenting as default_user123 (Default User)</h5>
            <form className="commentForm">
                <textarea type="text" value={commentValue} id="commentField" onChange={(e) => {updateComment(e)}}></textarea>
                <input type="submit" value="Comment" onClick={(e) => {postComment(e)}} id="commentBtn"/>
            </form>
            <p id="commentErrorMsg" style={{display: "none"}}>Please write a comment first.</p>
        </div>
    )
}

