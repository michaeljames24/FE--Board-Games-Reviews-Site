import {Link} from "react-router-dom";
import { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';

export default function Header(props) {

    const { setCategoryFilter } = useContext(CategoryContext);

    function viewCategory(category) {
        setCategoryFilter(category);
        //nagivate to category path. Then in Reviews component, look at categoryFilter state and decide what api function to call.
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
                <div className="reviewVotes">votes: {props.review.votes}</div>
            </div>
        );

    } else if (props.category) {
        
        return (
            <div className="categoryCard">
                <Link to={{pathname: `/categories/${props.category.slug}`}}><button className="categorySlug" onClick={() => {viewCategory(props.category.slug)}}>{props.category.slug}</button></Link>
                <br />
                <div className="categoryDesc">{props.category.description}</div>
            </div>
        )

    }


}
