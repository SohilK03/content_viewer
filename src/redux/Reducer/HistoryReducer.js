import { GET_HISTORY } from "../Constants/HistoryConstants";
const initialState = {
  history_array: [],
  loading: false,
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HISTORY_LOADING":
      return { ...state, loading: true };
    case GET_HISTORY:
      return { ...state, loading: false, history_array: action.payload };
    default: {
      return state;
    }
  }
};
export default historyReducer;
