import Header from "./Header";
import Footer from "./Footer";
import "./Title.css";

export default function Title({ currentLevel, changePage }) {
  return (
    <>
      <Header />
      <h1 id="jumping-text">
        <span>S</span>
        <span>O</span>
        <span>K</span>
        <span>O</span>
        <span>B</span>
        <span>A</span>
        <span>L</span>
        <span>L</span>
      </h1>

      <button id="PLAY" onClick={() => changePage("Game")}>
        {currentLevel === 0 ? "PLAY!" : "CONTINUE"}
      </button>
      <button id="LEVELS" onClick={() => changePage("Levels")}>
        Levels
      </button>
      <button id="CONTROLS" onClick={() => changePage("Controls")}>
        Controls
      </button>
      <Footer />
    </>
  );
}
