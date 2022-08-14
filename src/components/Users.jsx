import {useState, useEffect, useContext} from 'react';
import * as api from "../data/api";
import Card from './Card';
import { HeaderContext } from '../contexts/HeaderContext';

export default function Users() {
    const [users, setUsers] = useState([]);
    const { setHeader } = useContext(HeaderContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setHeader("Users");
        api.fetchAllUsers()
            .then(userData => {
                setUsers(userData);
                setIsLoading(false);
            });
    }, [setHeader]);

    return isLoading ? (<p className='loadingMsg' style={{marginTop: "15vh"}}>Loading users...</p>) : (
        <div className="listContainer">
            {users.map((user, index) => {return <Card user={user} key={index}/>})}
        </div>
    );
}
