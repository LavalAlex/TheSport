import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/Index";
import style from "./CardHome.module.css";
import { useSpring, animated } from "react-spring";
import { CardComponent, ICardHome } from "../../Interface/Interfaces";
import styles from "./CardHome.module.css";
// import favAdd from "../../Redux/Actions/Favorite";
import { actionCreators } from "../../Redux";
import { bindActionCreators } from "redux";




function CardHome() {
  const dispatch = useDispatch();
  const { favAdd } = bindActionCreators(actionCreators, dispatch);
  const state: Array<CardComponent> = useSelector((state: State) => state.card);
  const [index, setIndex] = useState(0);
  

  const handleFav = () => {
    var fav = {
      idSport:stateHome[index].idSport,
      favorite: true,

    };
    favAdd(fav);

    setIndex(index + 1);
  };
  const handleNope = () => {
    setIndex(index +1)
  }
  const handleNext = () =>{
    setIndex(index +1)
  }

  const stateHome = state.filter(e => e.favorite != true)
 
  return (
    <div className={styles.container} key={stateHome[index].idSport}>
      <div className={styles.card}>
        <div className={styles.overflow}>
          <img
            src={stateHome[index].strSportThumb}
            alt="a wallpaper"
            className={styles.cardImgTop}
          />
        </div>
        <div className={styles.cardBody}>
          <h4 className="card-title">{stateHome[index].strSport}</h4>
          <p className={styles.cardText}>{stateHome[index].strSportDescription}</p>
          <a
           
            target="_blank"
            className="btn btn-outline-secondary border-0"
            
          >
            More...
          </a>
        </div>
        <button onClick={handleNope}>Nope</button>
        <button onClick={handleFav}>Like</button>
      </div>       
    </div>
  );
}

export default CardHome;
