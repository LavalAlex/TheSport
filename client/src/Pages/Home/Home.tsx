import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CardHome from "../../Components/Card/CardHome";
import {
  ICardHome,
  ICard,
  CardComponent,
  Index,
} from "../../Interface/Interfaces";
import { actionCreators } from "../../Redux";
// import favAdd from "../../Redux/Actions/Favorite";
import { State } from "../../Redux/Reducer/Index";
import styles from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const { all } = bindActionCreators(actionCreators, dispatch);
  const state: Array<Object> = useSelector((state: State) => state.card);

  useEffect(() => {
    all();
  }, []);

  
  return (
    <div>  
      {state[0] ? (
        <div key={0}>
        <CardHome/>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default Home;
