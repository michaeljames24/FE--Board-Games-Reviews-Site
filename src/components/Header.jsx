import navigation_icon from '../img/navigation_icon.png';
import {useContext} from 'react';
import { HeaderContext } from '../contexts/HeaderContext';

function showNavigation() {
    const modal = document.getElementById("navigation_modal");
    modal.style.display = "block";
}

export default function Header() {

    const { header } = useContext(HeaderContext);

    return (
        <div className='headerContainer'>
            <img id='navBarIcon' src={navigation_icon} onClick={() => {showNavigation()}} alt='navigation bar icon' />
            <h1 className='header'>{header}</h1>
        </div>
    );
}
