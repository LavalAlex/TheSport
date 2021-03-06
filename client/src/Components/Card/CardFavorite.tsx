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

function CardFavorite() {
    const dispatch = useDispatch();
    const { favAdd } = bindActionCreators(actionCreators, dispatch);
    const state: Array<CardComponent> = useSelector((state: State) => state.card);
    const [index, setIndex] = useState(0);
  const [seeMore, setSeemore] = useState(false);
    
  
    const handleDelte = () => {
      var fav = {
        idSport:stateHome[index].idSport,
        favorite: false,
  
      };
      favAdd(fav);
  
      setIndex(index + 1);
    };
  
    const handleNext = () =>{
      setIndex(index +1)
    }
    const handleMore = () => {
      if (seeMore) {
        setSeemore(false);
      } else {
        setSeemore(true);
      }
    };

    const stateHome = state.filter(e => e.favorite == true)

    return (
      <div className={styles.containerFav}>
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
            <p className={styles.cardText + `${seeMore ? styles.expand : ""}`}>{stateHome[index].strSportDescription}</p>
            <button
            onClick={handleMore}
            className={styles.btnMore}
          >
            {!seeMore?"See More..." : "See Less..."}
          </button>
          </div>
          <div className={styles.containerBtns}>
          <button onClick={handleDelte} className={styles.btnDelete}></button>
          <div className={styles.heartMan}></div>
          <button onClick={handleNext} className={styles.btnNext}></button>

          </div>
        </div>       
      </div>
       <div className={styles.container} key={stateHome[index].idSport}>
       <div className={styles.cardFav}>
         <div className={styles.overflow}>
           <img
             src={stateHome[index].strSportThumb}
             alt="a wallpaper"
             className={styles.cardImgTop}
           />
         </div>
         <div className={styles.cardBody}>
           <h4 className="card-title">{stateHome[index].strSport}</h4>
           <p className={styles.cardText + `${seeMore ? styles.expand : ""}`}>{stateHome[index].strSportDescription}</p>
           <button
           onClick={handleMore}
           className={styles.btnMoreFav}
         >
           {!seeMore?"See More..." : "See Less..."}
         </button>
         </div>
         <div className={styles.containerBtns}>
         <button onClick={handleDelte} className={styles.btnDelete}></button>
         <div className={styles.heartMan}></div>
         <button onClick={handleNext} className={styles.btnNext}></button>

         </div>
       </div>       
     </div>
     </div>
    );
  }
  
  export default CardFavorite;
  