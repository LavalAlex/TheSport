import { IUser, IUserReducer } from "../../Interface/Interfaces";
import ActionTypes from "../Actions/ActionTypes";

const initialState: IUser = { email: "", avatar: "" };

export default function authReducer(
  state: IUser = initialState,
  action: IUserReducer,
) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return action.payload?.email ? action.payload : {};

    case ActionTypes.LOGOUT:
      return {};

    case ActionTypes.SINGUP:
      return action.payload?.email ? action.payload : {};

    case ActionTypes.AUTH:
      return action.payload?.email ? action.payload : {};
    
    default:
      return state;
  }
}
