import axios from "axios";
import { CardComponent } from "../../Interface/Interfaces";
import { Dispatch } from "redux";
import ActionTypes from "./ActionTypes";

let LOCALHOST: string =
  "http://localhost:5000/fir-2b0d9/us-central1/serve/auth";

export default function favAdd(fav: CardComponent) {
  return async (dispatch: Dispatch) => {
    const res = await axios.post(`${LOCALHOST}/favorite`, fav);
    dispatch({type: ActionTypes.FAVORITEADD, payload: res.data})
};
}
