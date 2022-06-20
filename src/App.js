// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import title from "C:/Users/HP/Development/guessing-game/src/title2.png";
import song from "C:/Users/HP/Development/guessing-game/src/lofi.mp3";
import { Howl, Howler } from "howler";

function App() {
  const randomN = generateRandomNumber(0, 30);
  const [answer, setAnswer] = useState("");
  const [randomNumber, setRandomNumber] = useState(randomN);
  const [message, setMesssage] = useState(<h3>Guess a Number</h3>);
  const [attempts, setAttempts] = useState(1);
  const [hintAnswer, setHintAnswer] = useState(100);
  const hint = () => {
    if (randomNumber > hintAnswer) {
      setMesssage(`>${hintAnswer}`);
    } else if (randomNumber < hintAnswer) {
      setMesssage(`<${hintAnswer}`);
    }
  };
  const checkAnswer = () => {
    setHintAnswer(answer);
    if (Number(answer) === randomNumber) {
      // setAttempts(1);
      setRandomNumber(randomN);
      if (attempts == 1) {
        setMesssage(
          <h3>
            You won in
            <br />
            <br />
            {attempts}
            <br />
            <br /> try !
          </h3>
        );
        setAnswer("");
      } else {
        setMesssage(
          <h3>
            You won in
            <br />
            <br />
            {attempts}
            <br />
            <br /> tries !
          </h3>
        );
      }

      setAnswer("");
      setTimeout(() => {
        setMesssage("GUESS A NUMBER");
        setAttempts(1);
      }, 3000);
    } else {
      if (attempts == 3) {
        setTimeout(() => {
          setAttempts(1);
        }, 3000);

        setRandomNumber(randomN);
        setMesssage(
          <h3>
            The number is
            <br />
            <br />
            {randomNumber}
            <br />
            <br /> You lost !
          </h3>
        );
        setAnswer("");

        setTimeout(() => {
          setMesssage("GUESS A NUMBER");
        }, 3000);
      } else {
        setMesssage("guess again");

        setAttempts(attempts + 1);
        setAnswer("");
        console.log("attempt: " + attempts);
      }
    }
  };
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function music() {
    const sound = new Howl({ src: song });
    sound.play();
    Howler.volume(0.5);
  }

  return (
    <div class="window" onLoad={music}>
      <div class="App">
        <p class="attempt">Attempt: {attempts}</p>
        {/* <h1 class="Title">Guessing Game</h1> */}
        <img class="titleimg" src={title} />
        <p class="description">
          Pick a number between 0 and 30 <br /> You will have 3 attempts
        </p>

        {/* {randomNumber} */}
        <input
          class="inputField"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div>
          <button class="GuessBtn" onClick={checkAnswer}>
            Guess
          </button>
          <button class="GuessBtn" onClick={hint}>
            Hint
          </button>
        </div>
      </div>
      <div class="res">
        <h3 class="message">
          {message}
          {/* {randomNumber} */}
        </h3>
      </div>
    </div>
  );
}

export default App;
