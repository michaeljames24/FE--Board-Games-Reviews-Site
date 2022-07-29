import Card from './Card';
import { useState, useEffect, useContext } from 'react';
import * as api from "../data/api";
import { HeaderContext } from '../contexts/HeaderContext';

export default function Reviews(props) {

    const [reviews, setReviews] = useState([]);
    const { setHeader } = useContext(HeaderContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props.categoryFilter) {
            setIsLoading(true);
            setHeader(`Categories/ ${props.categoryFilter}`);
            api.fetchReviewsByCategory(props.categoryFilter)
                .then(reviewData => {
                    setReviews(reviewData);
                    setIsLoading(false);
                });
        } else {
            setHeader("Latest Reviews");
            api.fetchAllReviews()
                .then(reviewData => {
                    setReviews(reviewData);
                    setIsLoading(false);
                });
        }
    }, [props.categoryFilter, setHeader]);

    return isLoading ? (<p className='loadingMsg' style={{marginTop: "20vh"}}>Loading Reviews...</p>) : (
        <div className="listContainer">
            {reviews.map(review => {return <Card review={review} key={review.review_id}/>})}
        </div>
    );
}
