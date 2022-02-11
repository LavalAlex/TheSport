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
import favAdd from "../../Redux/Actions/Favorite";
import { State } from "../../Redux/Reducer/Index";

function Home() {
  const dispatch = useDispatch();
  const { all } = bindActionCreators(actionCreators, dispatch);
  const state: Array<CardComponent> = useSelector((state: State) => state.card);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    all();
  }, []);

  const handleSubmit = () => {
    all();
  };
  
  console.log(state);
  console.log(index);
  return (
    <div>
      <button onClick={handleSubmit}>all</button>
      {state[index] ? (
        <CardHome
          state={state}
          
        />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default Home;
