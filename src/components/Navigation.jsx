function closeNavigation() {
    const modal = document.getElementById("navigation_modal");
    modal.style.display = "none";
    // const icon = document.getElementById("navBarIcon");
    // icon.style.display = "block";
}

export default function Navigation() {
    return (
        <div id="navigation_modal">
            <div className="navigation_bar">
                <span className="close_navigation_btn" onClick={ () => {closeNavigation()}} >&times;</span>
                <div className="navItem">Reviews</div>
                <div className="navItem">Categories</div>
                <div className="navItem">Users</div>
                <div className="navItem">Profile</div>
            </div>
        </div>
    )
}
