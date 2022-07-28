import { useState, useEffect } from 'react';
import * as api from "../data/api";
import Card from './Card';

export default function Comments({review_id}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
            console.log(newComment);
            api.postComment(review_id, newComment)
                .then(() => {
                    api.fetchCommentsByReviewID(review_id)
                        .then((updatedComments) => {
                            setIsLoading(false);
                            setComments(updatedComments);
                        })
                });
        }
    }, [review_id, newComment]);

    function postComment() {
        const commentField = document.getElementById("commentField");
        if (commentField.value) {
            setIsLoading(true);
            commentField.style.border = "1px solid black";
            setNewComment({
                username: "default_user123", 
                body: commentField.value
            })
            commentField.value = "";
        } else {
            commentField.style.border = "1px solid red";
        }
    }

    return (
        isLoading ? (<p className='loadingMsg'>Loading comments...</p>) : (
            <div className="commentsList">
                <h4>Comments:</h4>
                {comments.map((comment) => {return <Card comment={comment} key={comment.comment_id}/>})}
                {comments.length === 0 && <p id="noCommentsMsg">Be the first to comment on this review.</p>}
                <h5 style={{marginTop: "2vh"}}>Commenting as default_user123 (Default User)</h5>
                <div className="commentForm">
                    <input type="text" id="commentField" ></input>
                    <button onClick={postComment} id="commentBtn">Comment</button>
                </div>
             </div>
        )
    )
}