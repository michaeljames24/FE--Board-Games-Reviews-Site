import {useContext, useEffect} from 'react';
import { HeaderContext } from '../contexts/HeaderContext';

export default function Profile() {
    const { setHeader } = useContext(HeaderContext);
    useEffect(() => {
        setHeader("Page Not Found");
    }, [setHeader]);

    return (
        <div className="listContainer">
            <div className="errorMsg" style={{marginTop: "15vh"}}>Sorry, that page doesn't seem to exist.</div>
        </div>
    );

}