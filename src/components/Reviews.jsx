import Card from './Card';
import { useState, useEffect } from 'react';
import * as api from "../data/api";

export default function Reviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        api.fetchAllReviews()
            .then(reviewData => {setReviews(reviewData)});
    }, []);

    return (
        <div className="listContainer">
            {reviews.map(review => {return <Card review={review} key={review.review_id}/>})}
        </div>
    );
}
