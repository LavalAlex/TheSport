import axios from "axios";
import { Dispatch } from "redux";
import ActionTypes from "./ActionTypes";
import { ICard } from "../../Interface/Interfaces";

let LOCALHOST: string = "http://localhost:5000/fir-2b0d9/us-central1/serve";

export function all(){
    return async (dispatch: Dispatch) => {
        const res = await axios.get(`${LOCALHOST}/favorite`);
        dispatch({type: ActionTypes.ALL, payload: res.data || {} });
    }
}