// import Card from './Card';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import * as api from "../data/api";
import { HeaderContext } from '../contexts/HeaderContext';
import Comments from './Comments';

export default function Review(props) {
    const { setHeader } = useContext(HeaderContext);
    const [review, setReview] = useState({});
    const {review_id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // VOTING:
    const [hasVoted, setHasVoted] = useState(null);
    const [voteHistory, setVoteHistory] = useState([null]);

    // REVIEW DATE:
    const reviewDate = new Date(review.created_at);
    const posted_on = `${reviewDate.getDate()}/${reviewDate.getMonth() + 1}/${reviewDate.getFullYear()} - ${reviewDate.getHours()}:${reviewDate.getMinutes()}`;

    useEffect(() => {
        setIsLoading(true);
        api.fetchReviewByID(review_id)
            .then(review => {
                setHeader(`Review ${review_id}`);
                setReview(review);
                setIsLoading(false);
            })
            .catch(() => {
                setHeader("Review Not Found");
                setNotFound(true);
                setIsLoading(false);
            })
    }, [setHeader, review_id]);

    function incrementVotes(num) {
        const votesDisplay = document.getElementById("dynamicVotes");
        const errorMsg = document.getElementById("votingErrorMsg");

        api.patchReviewVotes(review_id, num)
        .then((data) => {console.log("new value in api =" + data.votes)})
            .catch(() => {
                switch (voteHistory) {
                    case "up":
                        votesDisplay.textContent = `Votes: ${review.votes + 1}`;
                        votesDisplay.style.color = "green";
                        errorMsg.style.display = "block";
                        setHasVoted("up");
                        setVoteHistory("up");
                        break;
                    case "down":
                        votesDisplay.textContent = `Votes: ${review.votes - 1}`;
                        votesDisplay.style.color = "red";
                        errorMsg.style.display = "block";
                        setHasVoted("down");
                        setVoteHistory("down");
                        break;
                    default:
                        votesDisplay.textContent = `Votes: ${review.votes}`;
                        votesDisplay.style.color = "black";
                        errorMsg.style.display = "block";
                        setHasVoted(null);
                        setVoteHistory(null);
                }
            });
    }

    function upVote() {
        const votesDisplay = document.getElementById("dynamicVotes");
        const errorMsg = document.getElementById("votingErrorMsg");

        if (hasVoted === null) {
            setVoteHistory("up")
            votesDisplay.textContent = `Votes: ${review.votes + 1}`;
            votesDisplay.style.color = "green";
            errorMsg.style.display = "none";
            setHasVoted("up");
            incrementVotes(1);
        }

        if (hasVoted === "up") {
            setVoteHistory(null);
            votesDisplay.textContent = `Votes: ${review.votes}`;
            votesDisplay.style.color = "black";
            errorMsg.style.display = "none";
            setHasVoted(null);
            incrementVotes(-1);
        }
        if (hasVoted === "down") {
            setVoteHistory("up")
            votesDisplay.textContent = `Votes: ${review.votes + 1}`;
            votesDisplay.style.color = "green";
            errorMsg.style.display = "none";
            setHasVoted("up");
            incrementVotes(2);
        }
    }

    function downVote() {
        const votesDisplay = document.getElementById("dynamicVotes");
        const errorMsg = document.getElementById("votingErrorMsg");

        if (hasVoted === null) {
            setVoteHistory("down")
            votesDisplay.textContent = `Votes: ${review.votes - 1}`;
            votesDisplay.style.color = "red";
            errorMsg.style.display = "none";
            setHasVoted("down");
            incrementVotes(-1);
        }
        if (hasVoted === "down") {
            setVoteHistory(null)
            votesDisplay.textContent = `Votes: ${review.votes}`;
            votesDisplay.style.color = "black";
            errorMsg.style.display = "none";
            setHasVoted(null);
            incrementVotes(1);
        }
        if (hasVoted === "up") {
            setVoteHistory("down")
            votesDisplay.textContent = `Votes: ${review.votes - 1}`;
            votesDisplay.style.color = "red";
            errorMsg.style.display = "none";
            setHasVoted("down");
            incrementVotes(-2);
        }
    }

    return isLoading ? (<p className="loadingMsg" style={{marginTop: "15vh"}}>Loading review...</p>) : notFound ? (<div className="listContainer"><p className="errorMsg" style={{marginTop: "15vh"}}>Review not found.</p></div>) : (
        <>
            <div className="individualReview">
                <div className="reviewDate" style={{marginRight: "auto"}}>{posted_on}</div>
                <div className="reviewTitle">{review.title}</div>
                <div className="reviewUser">{review.owner}</div>
                <div className="reviewBody">{review.review_body}</div>
                <div className="votesRow">
                    <button onClick={() => {upVote()}} className="upVoteBtn">&uarr;</button>
                    <div id="dynamicVotes">Votes: {review.votes}</div>
                    <button onClick={() => {downVote()}} className="downVoteBtn">&darr;</button>
                </div>
                <p id="votingErrorMsg">Sorry, something went wrong. Please check your Internet connection and try again.</p>
            </div>
            <br/>
            <Comments review_id={review_id} />
        </>           
    );

}