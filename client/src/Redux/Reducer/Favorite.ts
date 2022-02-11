import ActionTypes from "../Actions/ActionTypes";
import { IUser, IUserReducer } from "../../Interface/Interfaces";

const initialState: IUser = { email: "", avatar: "" };

export default function favoriteReducer(
  state: IUser = initialState,
  action: IUserReducer
) {
  switch (action.type) {
    case ActionTypes.FAVORITEADD:
      return action.payload?.email ? action.payload : {};
    default:
      return state;
  }
}
