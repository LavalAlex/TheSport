import axios from "axios";
import { Dispatch } from "redux";
import { IUser, IUserLogin, IUserRegister } from "../../Interface/Interfaces";
import ActionTypes from "./ActionTypes";

let LOCALHOST: string =
  "http://localhost:5000/fir-2b0d9/us-central1/serve/auth";

export function login(user: IUserLogin) {
  return async (dispatch: Dispatch) => {
    const res = await axios.post<{
      msg: string;
      user: IUser;
     
    }>(`${LOCALHOST}/login`, user);

    dispatch({ type: ActionTypes.LOGIN, payload: res.data });
  };
}

export function signup(user: IUserRegister) {
  return async (dispatch: Dispatch) => {
    const res = await axios.post<{ user: IUser }>(`${LOCALHOST}/signup`, user);

    dispatch({ type: ActionTypes.SINGUP, payload: res.data });
  };
}

export function logout() {
  return async (dispatch: Dispatch) => {
    const res = await axios.get(`${LOCALHOST}/logout`);

    dispatch({ type: ActionTypes.LOGOUT, payload: {} });
  };
}

export function auth() {
  return async (dispatch: Dispatch) => {
    const res = await axios.get(`${LOCALHOST}`);
    dispatch({type:ActionTypes.AUTH, payload:res?.data || {}})
   }
}

export function  loginFacebook() {
  return async (dispatch: Dispatch) => {
    const res = await axios.get(`${LOCALHOST}/facebook`);
    dispatch({type:ActionTypes.LOGINFACEBOOK, payload:res?.data || {}});
  };
};

export function  loginGoogle() {
  return async (dispatch: Dispatch) => {
    const res = await axios.get(`${LOCALHOST}/google`);
    dispatch({type:ActionTypes.LOGINGOOGLE, payload:res?.data || {}})
  }
}
