import { combineReducers } from "redux";
import cardsReducer from "./CardsReducer";
import categoryReducer from "./CategoryReducer";
import historyReducer from "./HistoryReducer";
export default combineReducers({
  cards: cardsReducer,
  categories: categoryReducer,
  history: historyReducer,
});
