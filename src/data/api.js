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

export const patchReviewVotes = (review_id, num) => {
  return api.patch(`/reviews/${review_id}`, {inc_votes: num})
    .then(({ data }) => {
      return data.review;
    })
};

export const fetchCommentsByReviewID = (review_id) => {
  return api.get(`/reviews/${review_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
};

export const postComment = (review_id, comment) => {
  return api.post(`/reviews/${review_id}/comments`, comment)
    .then(({ data }) => {
      return data.comment;
    })
    .catch((err) => {
      console.log(err);
    })
};