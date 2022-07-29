import {useState, useEffect, useContext} from 'react';
import * as api from "../data/api";
import Card from './Card';
import { HeaderContext } from '../contexts/HeaderContext';

export default function Categories(props) {
    const [categories, setCategories] = useState([]);
    const { setHeader } = useContext(HeaderContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setHeader("Categories");
        api.fetchAllCategories()
            .then(categoryData => {
                setCategories(categoryData);
                setIsLoading(false);
            });
    }, [setHeader]);

    return isLoading ? (<p className='loadingMsg' style={{marginTop: "15vh"}}>Loading categories...</p>) : (
        <div className="listContainer">
            {categories.map((category, index) => {return <Card category={category} key={index}/>})}
        </div>
    );
}