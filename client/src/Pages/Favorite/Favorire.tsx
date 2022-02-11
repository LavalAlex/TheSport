import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CardFavorite from "../../Components/Card/CardFavorite";
import CardHome from "../../Components/Card/CardHome";
import { actionCreators } from "../../Redux";
import { State } from "../../Redux/Reducer/Index";

export default function Favorite(){
    const dispatch = useDispatch();
  const { all } = bindActionCreators(actionCreators, dispatch);
  const state: Array<Object> = useSelector((state: State) => state.card);

  useEffect(() => {
    all();
  }, []);
    return(
        <div>   {state[0] ? (
            <CardFavorite/>
          ) : (
            <div>Cargando...</div>
          )}</div>
    )
}