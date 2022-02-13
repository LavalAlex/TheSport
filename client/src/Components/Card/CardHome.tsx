import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/Index";
import style from "./CardHome.module.css";
import { useSpring, a, useTransition, config } from "react-spring";
import { CardComponent, ICardHome } from "../../Interface/Interfaces";
import styles from "./CardHome.module.css";
// import favAdd from "../../Redux/Actions/Favorite";
import { actionCreators } from "../../Redux";
import { applyMiddleware, bindActionCreators } from "redux";

function CardHome() {
  const dispatch = useDispatch();
  const { favAdd } = bindActionCreators(actionCreators, dispatch);
  const state: Array<CardComponent> = useSelector((state: State) => state.card);
  const [index, setIndex] = useState(0);
  const [seeMore, setSeemore] = useState(false);
  const [move, setMove] = useState(true);
  const [flipped, setFlipped] = useState(false);


  const handleNope = () => {
    setFlipped((lastState) => !lastState);
    setIndex(index + 1);
  };

  const handleMore = () => {
    if (seeMore) {
      setSeemore(false);
    } else {
      setSeemore(true);
    }
  };

  const stateHome = state.filter((e) => e.favorite != true);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleNext = () => {
    setIndex(index + 1);
    setFlipped((state) => !state);
  };

  return (
    <div>
    {!flipped? 
    <div className={styles.container} key={stateHome[index].idSport}>
      <a.div
        className={styles.card}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <div>
          <div className={styles.overflow}>
            <img
              src={stateHome[index].strSportThumb}
              alt="a wallpaper"
              className={styles.cardImgTop}
            />
          </div>
          <div className={styles.cardBody}>
            <h4 className="card-title">{stateHome[index].strSport}</h4>
            <p className={styles.cardText + `${seeMore ? styles.expand : ""}`}>
              {stateHome[index].strSportDescription}
            </p>

            <button onClick={handleMore} className={styles.btnMore}>
              {!seeMore ? "See More..." : "See Less..."}
            </button>
          </div>
          <div className={styles.containerBtns}>
            <button onClick={handleNope} className={styles.btnNope}></button>
            <div className={styles.heartMan}></div>
            <button onClick={handleNext} className={styles.btnLike}></button>
          </div>
        </div>
      </a.div>
    </div>:

    <div className={styles.container} key={stateHome[index].idSport}>
    <a.div
      className={styles.card}
      style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
    >
      <div>
        <div className={styles.overflow}>
          <img
            src={stateHome[index].strSportThumb}
            alt="a wallpaper"
            className={styles.cardImgTop}
          />
        </div>
        <div className={styles.cardBody}>
          <h4 className="card-title">{stateHome[index].strSport}</h4>
          <p className={styles.cardText + `${seeMore ? styles.expand : ""}`}>
            {stateHome[index].strSportDescription}
          </p>

          <button onClick={handleMore} className={styles.btnMore}>
            {!seeMore ? "See More..." : "See Less..."}
          </button>
        </div>
        <div className={styles.containerBtns}>
          <button onClick={handleNope} className={styles.btnNope}></button>
          <div className={styles.heartMan}></div>
          <button onClick={handleNext} className={styles.btnLike}></button>
        </div>
      </div>
    </a.div>
  </div>
  }
  </div>
  );
}

export default CardHome;
