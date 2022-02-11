import { ICard, IUserReducer } from "../../Interface/Interfaces";
import ActionTypes from "../Actions/ActionTypes";

const initialState: ICard = {
  idSport:"",
  name:"",
  description: "",
  image:"",
  favorite: false 
};

export default function homeReducer(
  state: ICard = initialState,
  action: IUserReducer
) {
  switch (action.type) {
    case ActionTypes.ALL:
      return action.payload;
    default:
      return state;
  }
}
