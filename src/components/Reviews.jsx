import Card from './Card';
import { useState, useEffect, useContext } from 'react';
import * as api from "../data/api";
import { HeaderContext } from '../contexts/HeaderContext';

export default function Reviews(props) {

    const [reviews, setReviews] = useState([]);
    const { setHeader } = useContext(HeaderContext);
    const [isLoading, setIsLoading] = useState(true);
    const [sortedBy, setSortedBy] = useState("sortNewest");
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setNotFound(false);
        setSortedBy("sortNewest");
        if (window.location.pathname !== "/reviews" && window.location.pathname !== "/") {
            setIsLoading(true);
            api.fetchReviewsByCategory(window.location.pathname.split("/")[2])
                .then(reviewData => {
                    setHeader(`Categories/ ${window.location.pathname.split("/")[2]}`);
                    setReviews(reviewData);
                    setIsLoading(false);
                })
                .catch(() => {
                    setHeader("Category Not Found");
                    setNotFound(true);
                    setIsLoading(false);
                })
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
                    if (window.location.pathname !== "/reviews" && window.location.pathname !== "/") {
                        api.fetchReviewsByCategory(window.location.pathname.split("/")[2], "created_at", "DESC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else if (window.location.pathname === "/reviews" || window.location.pathname === "/") {
                        api.fetchReviewsByQuery("created_at", "DESC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        setHeader("Category Not Found");
                        setNotFound(true);
                        setIsLoading(false);
                        break;
                    }
                case "sortOldest":
                    if (window.location.pathname !== "/reviews" && window.location.pathname !== "/") {
                        api.fetchReviewsByCategory(window.location.pathname.split("/")[2], "created_at", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else if (window.location.pathname === "/reviews" || window.location.pathname === "/") {
                        api.fetchReviewsByQuery("created_at", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        setHeader("Category Not Found");
                        setNotFound(true);
                        setIsLoading(false);
                        break;
                    }
                case "sortUser":
                    if (window.location.pathname !== "/reviews" && window.location.pathname !== "/") {
                        api.fetchReviewsByCategory(window.location.pathname.split("/")[2], "owner", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else if (window.location.pathname === "/reviews" || window.location.pathname === "/") {
                        api.fetchReviewsByQuery("owner", "ASC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        setHeader("Category Not Found");
                        setNotFound(true);
                        setIsLoading(false);
                        break;
                    }
                case "sortVotes":
                    if (window.location.pathname !== "/reviews" && window.location.pathname !== "/") {
                        api.fetchReviewsByCategory(window.location.pathname.split("/")[2], "votes", "DESC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else if (window.location.pathname === "/reviews" || window.location.pathname === "/") {
                        api.fetchReviewsByQuery("votes", "DESC")
                            .then(reviewData => {
                                setReviews(reviewData);
                                setIsLoading(false);
                            });
                        break;
                    } else {
                        setHeader("Category Not Found");
                        setNotFound(true);
                        setIsLoading(false);
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
    }, [sortedBy, setHeader]);

    useEffect(() => {
        if (!isLoading && !notFound) {
            const sortBtns = Array.from(document.getElementsByClassName("sortBtn"));
            sortBtns.forEach(btn => {btn.style.backgroundColor = "transparent";});
            document.getElementById(sortedBy).style.backgroundColor = "gainsboro";
        }
    }, [isLoading, notFound, sortedBy]);

    return isLoading ? (<p className='loadingMsg' style={{marginTop: "20vh"}}>Loading Reviews...</p>) : notFound ? (<div className="listContainer"><p className="errorMsg" style={{marginTop: "15vh"}}>Category not found.</p></div>) : (
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
