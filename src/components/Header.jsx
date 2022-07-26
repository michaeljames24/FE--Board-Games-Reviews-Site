import navigation_icon from '../img/navigation_icon.png';

function showNavigation() {
    // const icon = document.getElementById("navBarIcon");
    // icon.style.display = "none";
    const modal = document.getElementById("navigation_modal");
    modal.style.display = "block";
}

export default function Header() {
    return (
        <div className='headerContainer'>
            <img id='navBarIcon' src={navigation_icon} onClick={() => {showNavigation()}} alt='navigation bar icon' />
            <h1 className='header'>Latest Reviews</h1>
        </div>
    );
}
