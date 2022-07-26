import Card from './Card';
import { useState, useEffect, useContext } from 'react';
import * as api from "../data/api";
import { HeaderContext } from '../contexts/HeaderContext';

export default function Reviews(props) {

    const [reviews, setReviews] = useState([]);
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        if (props.categoryFilter) {
            setHeader(`Categories/ ${props.categoryFilter}`);
            api.fetchReviewsByCategory(props.categoryFilter)
                .then(reviewData => {setReviews(reviewData)});
        } else {
            setHeader("Latest Reviews");
            api.fetchAllReviews()
                .then(reviewData => {setReviews(reviewData)});
        }
    }, [props.categoryFilter, setHeader]);

    return (
        <div className="listContainer">
            {reviews.map(review => {return <Card review={review} key={review.review_id}/>})}
        </div>
    );
}
