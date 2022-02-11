import React, { useState } from "react";
import style from "./CardHome.module.css";
import { useSpring, animated } from "react-spring";
import { CardComponent, ICardHome } from "../../Interface/Interfaces";
import styles from "./CardHome.module.css";

function CardHome( state: Array<CardComponent>) {
  const [index, setIndex] = useState(0);
  setIndex(ind);

  const handlerFav = () => {
    var fav = {
      strSport: state[index].strSport,
      strSportThumb: state[index].strSportThumb,
      strSportDescription: state[index].strSportDescription,
      favorite: true,
    };
    favAdd(fav);

    setIndex(index + 1);
  };
  return (
    <div className={styles.container} key={id}>
      <div className={styles.card}>
        <div className={styles.overflow}>
          <img
            src={imageSource}
            alt="a wallpaper"
            className={styles.cardImgTop}
          />
        </div>
        <div className={styles.cardBody}>
          <h4 className="card-title">{title}</h4>
          <p className={styles.cardText}>{description}</p>
          <a
            href="#!"
            target="_blank"
            className="btn btn-outline-secondary border-0"
            rel="noreferrer"
          >
            Go to Soccer
          </a>
        </div>
        <button>Nope</button>
        <button>Like</button>
      </div>
    </div>
  );
}

export default CardHome;
