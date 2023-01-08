import Header from './components/Header';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import Review from './components/Review';
import Reviews from './components/Reviews';
import Categories from './components/Categories';
import Users from './components/Users';
import Profile from './components/Profile';
import Error from './components/Error';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useEffect, useState} from 'react';
import { CategoryContext } from './contexts/CategoryContext';
import { NotificationContext } from './contexts/NotificationContext';
import { HeaderContext } from './contexts/HeaderContext';

function App() {

  const [categoryFilter, setCategoryFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({});
  const [header, setHeader] = useState("Latest Reviews");

  function closeNotification() {
    document.getElementById("notification_modal").style.display = "none";
    document.getElementById("notification_modal").textContent = "";
  }

  useEffect(() => {
    if (notificationMessage.on) {
      document.getElementById("notification_modal").style.display = "block";
      document.getElementById("notification_modal").textContent = notificationMessage["message"];
      // eslint-disable-next-line
      const notificationTimeout = setTimeout(closeNotification, 7000);
    }
  }, [notificationMessage])

  return (
    <>
      <BrowserRouter>
      <NotificationContext.Provider value={{ notificationMessage, setNotificationMessage }}>
      <HeaderContext.Provider value={{ header, setHeader }}>
      <CategoryContext.Provider value={{ categoryFilter, setCategoryFilter }}>
        <Header />
        <Navigation setCategoryFilter={setCategoryFilter}/>
        <Notification />
        <Routes>
          <Route path="/" element={<Reviews/>}></Route>
          <Route path="/reviews" element={<Reviews/>}></Route>
          <Route path="/reviews/:review_id" element={<Review />}></Route>
          <Route path="/categories" element={<Categories category={{categoryFilter, setCategoryFilter}}/>}></Route>
          <Route path="/categories/:category" element={<Reviews categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Routes>
      </CategoryContext.Provider>
      </HeaderContext.Provider>
      </NotificationContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
