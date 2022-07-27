// import Card from './Card';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import * as api from "../data/api";
import { HeaderContext } from '../contexts/HeaderContext';

export default function Review(props) {
    const { setHeader } = useContext(HeaderContext);
    const [review, setReview] = useState({});
    const {review_id} = useParams();

    const reviewDate = new Date(review.created_at);
    const posted_on = `${reviewDate.getDate()}/${reviewDate.getMonth() + 1}/${reviewDate.getFullYear()} - ${reviewDate.getHours()}:${reviewDate.getMinutes()}`;

    useEffect(() => {
        setHeader(`Review ${review_id}`);
        api.fetchReviewByID(review_id)
            .then(review => {
                setReview(review);
            });
    }, [setHeader, review_id]);

    return (
        <div className="individualReview">
            <div className="reviewDate" style={{marginRight: "auto"}}>{posted_on}</div>
            <div className="reviewTitle">{review.title}</div>
            <div className="reviewUser">{review.owner}</div>
            <div className="reviewBody">{review.review_body}</div>
            <div className="reviewVotes" style={{fontWeight: "bold"}}>Votes: {review.votes}</div>
            <div>
                <button>Up-Vote</button>
                <button>Comment</button>
            </div>
        </div>
    );

}