import Header from './components/Header';
import Navigation from './components/Navigation';
import Reviews from './components/Reviews';
import Categories from './components/Categories';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react';
import { CategoryContext } from './contexts/CategoryContext';
import { HeaderContext } from './contexts/HeaderContext';

function App() {

  const [categoryFilter, setCategoryFilter] = useState("");
  const [header, setHeader] = useState("Latest Reviews");

  return (
    <>
      <BrowserRouter>
      <HeaderContext.Provider value={{ header, setHeader }}>
      <CategoryContext.Provider value={{ categoryFilter, setCategoryFilter }}>
        <Header />
        <Navigation setCategoryFilter={setCategoryFilter}/>
        <Routes>
          <Route path="/" element={<Reviews/>}></Route>
          <Route path="/categories" element={<Categories category={{categoryFilter, setCategoryFilter}}/>}></Route>
          <Route path="/categories/:category" element={<Reviews categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>}></Route>
        </Routes>
      </CategoryContext.Provider>
      </HeaderContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
