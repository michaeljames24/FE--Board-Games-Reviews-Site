import {useState, useEffect, useContext} from 'react';
import * as api from "../data/api";
import Card from './Card';
import { HeaderContext } from '../contexts/HeaderContext';

export default function Categories(props) {
    const [categories, setCategories] = useState([]);
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader("Categories");
        api.fetchAllCategories()
            .then(categoryData => {setCategories(categoryData)});
    }, [setHeader]);

    return (
        <div className="listContainer">
            {categories.map((category, index) => {return <Card category={category} key={index}/>})}
        </div>
    );
}