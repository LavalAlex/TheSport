import axios from "axios";
import { CardComponent } from "../../Interface/Interfaces";
import { Dispatch } from "redux";
import ActionTypes from "./ActionTypes";

let LOCALHOST: string =
  "http://localhost:5000/fir-2b0d9/us-central1/serve";

export function favAdd(fav: CardComponent) {
  return async (dispatch: Dispatch) => {
    console.log(fav)
    const res = await axios.put(`${LOCALHOST}/favorite/${fav.idSport}`, fav);
    dispatch({type: ActionTypes.FAVORITEADD, payload: {}})
};
}
