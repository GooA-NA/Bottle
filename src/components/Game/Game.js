import React, { useEffect, useState } from "react";
import bottle from "../../img/Bottle.png";
import styles from "./Game.module.scss";
import soundKiss from '../../sounds/kiss.mp3'
import soundSpinning from '../../sounds/Spinning.mp3'
import kissImg from '../../img/Kiss.png'

const Game = () => {
  const [start, setStart] = useState(false);
  const [bottleStop, setBottleStop] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [kiss, setKiss] = useState(true)
  const [prevPlayer, setPrevPlayer] = useState(0);
  const [counter, setCounter] = useState(0)

  const players = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];

  let newPlayer = 0;
  const playerC = () => {
    setKiss(false)
    setCurrentPlayer(prevPlayer);
    newPlayer = players.filter((player) => {
      return player !== prevPlayer;
    });
    newPlayer = newPlayer[Math.floor(Math.random() * 9)];
    setPrevPlayer(newPlayer)
    let audio = new Audio(soundKiss)
    audio.autoplay = true
    setTimeout(() => {
    setBottleStop(null)
    setKiss(true)
    setCounter(counter+1)
    }, 3000)
  };

  const startGame = () => {
    let audio = new Audio(soundSpinning)
    audio.autoplay = true
    setStart(true);

    setTimeout(() => {
      setStart(false);
      playerC();

      setBottleStop({
        transform: `rotate(${newPlayer}deg)`,
      });
      
    }, 1000);
  };

  return (
    <div className={styles.Game}>
      <div className={styles.counter} >
        <img
          src={kissImg}
          alt="bottle"
        />
        {` x ${counter}`}
      </div>
      <img className={`${styles.kiss} ${kiss ? styles.nonVisible : ""}`} src={kissImg} alt=""></img>
      <button onClick={startGame} disabled={bottleStop}>
        <img
          src={bottle}
          alt="bottle"
          className={`${styles.bottle} ${start ? styles.spinned : ""}`}
          style={bottleStop}
        />
      </button>
      <div className={styles.players}>
        {players.map((player, index) => {
          if(bottleStop){
            if (player === currentPlayer) {
              return <div style={{top: '10%', left: "40%", width: '100px', height: "100px"}} className={styles.currentPlayer} key={index}><img src={require(`../../img/avatar${index+1}.png`)} alt="" /></div>;
            }
            if(player === prevPlayer) {
              return <div style={{top: '10%', left: "60%", width: '100px', height: "100px"}} key={index}><img src={require(`../../img/avatar${index+1}.png`)} alt="" /></div>;
            }
          }
          if(player === prevPlayer){
            return <div key={index} className={styles.currentPlayer} ><img src={require(`../../img/avatar${index+1}.png`)} alt="" /></div>;
          }
          return <div key={index}><img src={require(`../../img/avatar${index+1}.png`)} alt="" /></div>;
        })}
      </div>
        </div>
      );
};

export default Game;
