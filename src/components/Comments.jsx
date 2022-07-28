import { useState, useEffect } from 'react';
import * as api from "../data/api";
import Card from './Card';

export default function Comments({review_id}) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.fetchCommentsByReviewID(review_id)
            .then((reviews) => {
                setComments(reviews);
                if (reviews === []) {document.getElementById("noCommentsMsg").style.display = "block";}
            })

    }, [review_id]);

    return (
        <div className="commentsList">
            <h4>Comments:</h4>
            {comments.map((comment) => {return <Card comment={comment} key={comment.comment_id}/>})}
            <p id="noCommentMsg" style={{display: "none"}}>Nobody has commented on this review yet.</p>
        </div>
    )
}