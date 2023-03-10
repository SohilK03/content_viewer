import { GET_CARDS } from "../Constants/CardConstants";

const initialState = {
  cards_array: undefined,
  loading: false,
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CARD_LOADING":
      return { ...state, loading: true };
    case GET_CARDS:
      return { ...state, cards_array: action.payload, loading: false };

    default:
      return state;
  }
};

export default cardsReducer;
