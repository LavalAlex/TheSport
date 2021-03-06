import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../Redux/Reducer/Index";

export const store = createStore(reducers, applyMiddleware(thunk));
