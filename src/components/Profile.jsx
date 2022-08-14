import {useContext, useEffect} from 'react';
import { HeaderContext } from '../contexts/HeaderContext';

export default function Profile() {
    const { setHeader } = useContext(HeaderContext);
    useEffect(() => {
        setHeader("Profile");
    }, [setHeader]);

    return (
        <div className="listContainer">
            <div>default_user123 (Default User)</div>
            <img className="userAvatar" src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} alt="Your avatar"></img>
        </div>
    );

}