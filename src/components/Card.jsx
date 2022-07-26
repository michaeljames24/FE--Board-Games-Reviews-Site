export default function Header(props) {
    return (
        <div className="reviewCard">
            <div className="reviewDate">date posted: {props.review.created_at}</div>
            <br />
            <div className="reviewTitle">{props.review.title}</div>
            <div className="reviewUser">{props.review.owner}</div>
            <br />
            <div className="reviewBody">"{props.review.review_body}"</div>
            <br />
            <div className="reviewVotes">votes: {props.review.votes}</div>
        </div>
    );
}
