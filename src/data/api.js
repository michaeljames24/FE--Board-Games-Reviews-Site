import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-mb-board-games.herokuapp.com/api",
});

export const fetchAllReviews = () => {
  return api.get(`/reviews`).then(({ data }) => {
    return data;
  });
};