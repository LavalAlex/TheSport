import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/Index";
import style from "./CardHome.module.css";
import { useSpring, animated, useTransition, config } from "react-spring";
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

  const [toggle, set] = useState(false);

  const transitions = useTransition(toggle, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 2000,
    config: config.molasses,
    onRest: () => setMove(false),
  });

  const handleFav = () => {
    var fav = {
      idSport: stateHome[index].idSport,
      favorite: true,
    };
    favAdd(fav);

    setIndex(index + 1);
  };
  const handleNope = () => {
    setIndex(index + 1);
  };
  const handleNext = () => {
    setIndex(index + 1);
    setMove(true);
  };
  const handleMore = () => {
    if (seeMore) {
      setSeemore(false);
    } else {
      setSeemore(true);
    }
  };

  const stateHome = state.filter((e) => e.favorite != true);

  const animation = useSpring({
    backgroundColor: `#${move ? "000" : "FA0"}`,
    color: `#${move ? "FFF" : "000"}`,
  });

  // const animationB = useSpring({
  //   transform:`translatex(${move?-250:0}px)`,
  //   "backgroundColor":"000",
  // })

  const clickHandle = () => {
    setMove((lastState) => !lastState);
  };

  console.log(move);
  return move ? (console.log('hgasf'),
    transitions(({ opacity }, item) => (
      <div className={styles.container} key={stateHome[index].idSport}>
        <animated.div
          className={styles.card}
          style={{
            position: "absolute",
            opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
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
              <p
                className={styles.cardText + `${seeMore ? styles.expand : ""}`}
              >
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
        </animated.div>
      </div>
    ))
  ) : (
    <div className={styles.container} key={stateHome[index].idSport}>
      <animated.div className={styles.card}>
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
      </animated.div>
    </div>
  );
}

export default CardHome;
