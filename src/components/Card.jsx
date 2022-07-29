import {Link} from "react-router-dom";
import { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';

export default function Card(props) {

    const { setCategoryFilter } = useContext(CategoryContext);

    function viewCategory(category) {
        setCategoryFilter(category);
    }

    if (props.review) {

        const trimmedBody = props.review.review_body.length > 100 ? props.review.review_body.slice(0,(props.review.review_body.indexOf(" ", 95))) + "…" : props.review.review_body;

        return (
            <div className="reviewCard">
                <div className="reviewDate">date posted: {props.review.created_at}</div>
                <br />
                <div className="reviewTitle">{props.review.title}</div>
                <div className="reviewUser">{props.review.owner}</div>
                <br />
                <div className="reviewBody">"{trimmedBody}"</div>
                <br />
                <div className="reviewRowFive">
                    <div className="reviewVotes">votes: {props.review.votes}</div>
                    <Link to={{pathname: `/reviews/${props.review.review_id}`}}><button className="reviewViewBtn">View Review</button></Link>
                </div>
            </div>
        );

    } 

    if (props.category) {
        
        return (
            <div className="categoryCard">
                <Link to={{pathname: `/categories/${props.category.slug}`}}><button className="categorySlug" onClick={() => {viewCategory(props.category.slug)}}>{props.category.slug}</button></Link>
                <br />
                <div className="categoryDesc">{props.category.description}</div>
            </div>
        )

    }

    if (props.comment) {

        const commentDate = new Date(props.comment.created_at);
        const posted_on = `${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()} - ${commentDate.getHours()}:${commentDate.getMinutes()}`;

        return (
            <div className="commentCard">
                <div className="commentDate">{posted_on}</div>
                <div className="commentAuthor">{props.comment.author}</div>
                <div className="commentBody">{props.comment.body}</div>
                <div className="commentCardRowFour">
                    <div className="commentVotes">Votes: {props.comment.votes}</div>
                    {props.comment.author === "default_user123" && <button className="delCommentBtn" onClick={() => {props.setCommentToDelete(props.comment.comment_id)}}>delete</button>}
                </div>
            </div>
        )
    }

}
