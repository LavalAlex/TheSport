import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/Index";
import style from "./CardHome.module.css";
import {
  useSprings,
  a,
  useTransition,
  config,
  animated,
  to as interpolate,
} from "react-spring";

import { CardComponent, ICardHome } from "../../Interface/Interfaces";
import styles from "./CardHome.module.css";
// import favAdd from "../../Redux/Actions/Favorite";
import { actionCreators } from "../../Redux";
import { applyMiddleware, bindActionCreators } from "redux";
import { useDrag } from "@use-gesture/react";

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function CardHome() {
  const dispatch = useDispatch();
  const { favAdd } = bindActionCreators(actionCreators, dispatch);
  const state: Array<CardComponent> = useSelector((state: State) => state.card);
  const [index, setIndex] = useState(0);
  const [seeMore, setSeemore] = useState(false);
  const [move, setMove] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const stateHome = state?.filter((e) => e.favorite != true);

  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(stateHome.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      let xCard = 0;
      const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
      if (!active && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit
        xCard = x;
        return {
          x,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!active && gone.size === stateHome.length - move) {
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
      }
      console.log('entraaa')
      if (!active) {
        if (xCard > 0) {
          const fav = {
            idSport: stateHome[stateHome.length - 1 - index].idSport,
            favorite: true,
          };
          setMove(move + 1);
          gone.delete(index);
          favAdd(fav);
        }
      }
    }
  );

  const handleNope = () => {
    setFlipped((lastState) => !lastState);
    setIndex(index + 1);
    bind(index)
    console.log(gone)
  };

  const handleMore = () => {
    if (seeMore) {
      setSeemore(false);
    } else {
      setSeemore(true);
    }
  };

  const handleLike = () => {
    setIndex(index + 1);
    setFlipped((state) => !state);
    console.log(gone)
  };
  console.log(stateHome)
  return (
    <div className={styles.container} key={stateHome[index].idSport}>
      <>
        {props.map(({ x, y, scale }, i) => (
          <animated.div className={styles.deck} key={i} style={{ x, y }}>
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([scale], trans),
              }}
            >
              <div className={styles.card}>
                <div>
                  <div className={styles.overflow}>
                    <img
                      src={stateHome[stateHome.length - 1 - i].strSportThumb}
                      alt="a wallpaper"
                      className={styles.cardImgTop}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h4 className="card-title">
                      {stateHome[stateHome.length - 1 - i].strSport}
                    </h4>
                    <p
                      className={
                        styles.cardText + `${seeMore ? styles.expand : ""}`
                      }
                    >
                      {stateHome[stateHome.length - 1 - i].strSportDescription}
                    </p>

                    <button onClick={handleMore} className={styles.btnMore}>
                      {!seeMore ? "See More..." : "See Less..."}
                    </button>
                  </div>
                  <div className={styles.containerBtns}>
                    <button
                      onClick={(i) => bind(i)} 
                      className={styles.btnNope}
                    ></button>
                    <div className={styles.heartMan}></div>
                    <button
                      onClick={handleLike}
                      className={styles.btnLike}
                    ></button>
                  </div>
                </div>
              </div>
            </animated.div>
          </animated.div>
        ))}
      </>
    </div>
  );
}

export default CardHome;
