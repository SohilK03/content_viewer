import { GET_HISTORY } from "../Constants/HistoryConstants";

import api from "../../api";
export const getHistory = () => (dispatch) => {
  api
    .get("/history")
    .then((res) => dispatch({ type: GET_HISTORY, payload: res.data }));
};
export const addHistory = (data) => (dispatch) => {
  api
    .post("/history", { ...data })
    .then(dispatch(getHistory()))
    .catch((err) => console.log(err));
};
