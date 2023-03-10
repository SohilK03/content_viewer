import { GET_CATEGORIES } from "../Constants/CategoryConstants";
import api from "../../api";

export const getCategories = () => (dispatch) => {
  dispatch({ type: "SET_CATEGORY_LOADING" });
  api
    .get("/categories")
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_CATEGORIES, payload: res.data });
    })
    .catch((err) => console.log(err));
};
