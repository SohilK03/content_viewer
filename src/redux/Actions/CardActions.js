import { GET_CARDS } from "../Constants/CardConstants";
import api from "../../api";

export const getCards = () => (dispatch) => {
  dispatch({ type: "SET_CARD_LOADING" });
  api
    .get("/cards")
    .then((res) => dispatch({ type: GET_CARDS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addCard = (data, category, category_array) => (dispatch) => {
  //   dispatch({ type: "SET_CARD_LOADING" });
  api
    .post("/cards", { ...data })
    .then((res) => {
      if (!category_array.includes(category)) {
        api
          .post("/categories", { name: category })
          .then(dispatch(getCards()))
          .catch((err) => console.log(err));
      } else dispatch(getCards());
      // console.log(res.data);
      // window.location.href = "/";
    })
    .catch((err) => console.log(err));
};
export const editCard = (id, data, category, category_array) => (dispatch) => {
  api
    .put(`/cards/${id}`, { ...data })
    .then((res) => {
      if (!category_array.includes(category)) {
        api
          .post("/categories", { name: category })
          .then(dispatch(getCards()))
          .catch((err) => console.log(err));
      } else dispatch(getCards());
    })
    .catch((err) => console.log(err));
};
export const deleteCard = (id) => (dispatch) => {
  api
    .delete(`/cards/${id}`)
    .then(dispatch(getCards()))
    .catch((err) => console.log(err));
  // window.location.href = "/";
};
