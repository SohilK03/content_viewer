import { GET_CATEGORIES } from "../Constants/CategoryConstants";

const initialState = {
  category_array: undefined,
  loading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CATEGORY_LOADING": 
      return { ...state, loading: true };
    
    case GET_CATEGORIES: 
      return { ...state, loading: false, category_array: action.payload };
    
    default: 
      return state;
    
  }
};
export default categoryReducer;
