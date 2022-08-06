import Card from './Card';
import { useState, useEffect, useContext } from 'react';
import * as api from "../data/api";
import { HeaderContext } from '../contexts/HeaderContext';

export default function Reviews(props) {

    const [reviews, setReviews] = useState([]);
    const { setHeader } = useContext(HeaderContext);
    const [isLoading, setIsLoading] = useState(true);
    const [sortedBy, setSortedBy] = useState("sortNewest");

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

    useEffect(() => {
        if (sortedBy) {
            setIsLoading(true);
            switch (sortedBy) {
                case "sortNewest":
                    if (props.categoryFilter) {
                        api.fetchReviewsByCategory(props.categoryFilter, "created_at", "DESC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        api.fetchReviewsByQuery("created_at", "DESC")
                        .then(reviewData => {
                            setReviews(reviewData);
                            setIsLoading(false);
                        });
                        break;
                    }
                case "sortOldest":
                    if (props.categoryFilter) {
                        api.fetchReviewsByCategory(props.categoryFilter, "created_at", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        api.fetchReviewsByQuery("created_at", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    }
                case "sortUser":
                    if (props.categoryFilter) {
                        api.fetchReviewsByCategory(props.categoryFilter, "owner", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        api.fetchReviewsByQuery("owner", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    }
                case "sortVotes":
                    if (props.categoryFilter) {
                        api.fetchReviewsByCategory(props.categoryFilter, "votes", "DESC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        api.fetchReviewsByQuery("votes", "DESC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    }
                default:
                    api.fetchAllReviews()
                        .then(reviewData => {
                            setReviews(reviewData);
                            setIsLoading(false);
                        });
            }
        }
    }, [sortedBy]);

    useEffect(() => {
        if (!isLoading) {
            const sortBtns = Array.from(document.getElementsByClassName("sortBtn"));
            sortBtns.forEach(btn => {btn.style.backgroundColor = "transparent";});
            document.getElementById(sortedBy).style.backgroundColor = "gainsboro";
        }
        // eslint-disable-next-line
    }, [isLoading]);

    return isLoading ? (<p className='loadingMsg' style={{marginTop: "20vh"}}>Loading Reviews...</p>) : (
        <div className="listContainer">
            <div className="sortMenu">
                <p style={{marginRight: "5vh"}}>&uarr;&darr;</p>
                <button className="sortBtn" id="sortNewest" onClick={() => {setSortedBy("sortNewest")}} style={{backgroundColor: "gainsboro"}}>Newest</button>
                <button className="sortBtn" id="sortOldest" onClick={() => {setSortedBy("sortOldest")}}>Oldest</button>
                <button className="sortBtn" id="sortUser" onClick={() => {setSortedBy("sortUser")}}>User</button>
                <button className="sortBtn" id="sortVotes" onClick={() => {setSortedBy("sortVotes")}}>Votes</button>
            </div>
            {reviews.map(review => {return <Card review={review} key={review.review_id}/>})}
        </div>
    );
}
