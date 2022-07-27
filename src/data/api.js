import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-mb-board-games.herokuapp.com/api",
});

export const fetchAllReviews = () => {
  return api.get(`/reviews`).then(({ data }) => {
    return data;
  });
};

export const fetchAllCategories = () => {
  return api.get(`/categories`).then(({ data }) => {
    return data;
  });
};

export const fetchReviewsByCategory = (category) => {
  return api.get(`/reviews?category=${category}`).then(({ data }) => {
    return data;
  });
};

export const fetchReviewByID = (review_id) => {
  return api.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};