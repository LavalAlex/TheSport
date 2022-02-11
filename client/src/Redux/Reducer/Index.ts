import { combineReducers } from "redux";
import authReducer from "./Auth";
import homeReducer from "./Home";
import favoriteReducer from "./Favorite";

const reducers = combineReducers({
  session: authReducer,
  card: homeReducer,
  favorite: favoriteReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;
