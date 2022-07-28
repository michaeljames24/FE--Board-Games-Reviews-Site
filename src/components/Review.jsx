// import Card from './Card';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import * as api from "../data/api";
import { HeaderContext } from '../contexts/HeaderContext';

export default function Review(props) {
    const { setHeader } = useContext(HeaderContext);
    const [review, setReview] = useState({});
    const {review_id} = useParams();

    // VOTING:
    const [hasVoted, setHasVoted] = useState(null);
    const [voteHistory, setVoteHistory] = useState([null]);

    // REVIEW DATE:
    const reviewDate = new Date(review.created_at);
    const posted_on = `${reviewDate.getDate()}/${reviewDate.getMonth() + 1}/${reviewDate.getFullYear()} - ${reviewDate.getHours()}:${reviewDate.getMinutes()}`;

    // DOM:
    const votesDisplay = document.getElementById("dynamicVotes");
    const errorMsg = document.getElementById("votingErrorMsg");

    useEffect(() => {
        setHeader(`Review ${review_id}`);
        api.fetchReviewByID(review_id)
            .then(review => {
                setReview(review);
            });
    }, [setHeader, review_id]);

    function incrementVotes(num) {
        api.patchReviewVotes(review_id, num)
        .then((data) => {console.log("new value in api =" + data.votes)})
            .catch(() => {
                switch (voteHistory) {
                    case "up":
                        votesDisplay.textContent = `Votes: ${review.votes + 1}`;
                        votesDisplay.style.color = "blue";
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

        if (hasVoted === null) {
            setVoteHistory("up")
            votesDisplay.textContent = `Votes: ${review.votes + 1}`;
            votesDisplay.style.color = "blue";
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
            votesDisplay.style.color = "blue";
            errorMsg.style.display = "none";
            setHasVoted("up");
            incrementVotes(2);
        }
    }

    function downVote() {

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

    return (
        <div className="individualReview">
            <div className="reviewDate" style={{marginRight: "auto"}}>{posted_on}</div>
            <div className="reviewTitle">{review.title}</div>
            <div className="reviewUser">{review.owner}</div>
            <div className="reviewBody">{review.review_body}</div>
            <div id="dynamicVotes">Votes: {review.votes}</div>
            <p id="votingErrorMsg">Sorry, something went wrong. Please check your Internet connection and try again.</p>
            <div>
                <button onClick={() => {upVote()}} style={{backgroundColor: "yellowgreen"}}>&uarr; vote</button>
                <button onClick={() => {downVote()}} style={{backgroundColor: "lightcoral"}}>&darr; vote</button>
            </div>
        </div>
    );

}