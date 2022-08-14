import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';

function closeNavigation() {
    const modal = document.getElementById("navigation_modal");
    modal.style.display = "none";
}

export default function Navigation() {
    
    const { setCategoryFilter } = useContext(CategoryContext);

    return (
        <div id="navigation_modal">
            <div className="navigation_bar">
                <span className="close_navigation_btn" onClick={ () => {closeNavigation()}} >&times;</span>
                <div className="navItem"><Link to="/reviews" onClick={ () => {setCategoryFilter(""); closeNavigation()}}>Reviews</Link></div>
                <div className="navItem"><Link to="/categories" onClick={ () => {closeNavigation()}}>Categories</Link></div>
                <div className="navItem"><Link to="/users" onClick={ () => {closeNavigation()}}>Users</Link></div>
                <div className="navItem"><Link to="/profile" onClick={ () => {closeNavigation()}}>Profile</Link></div>
            </div>
        </div>
    )
}
