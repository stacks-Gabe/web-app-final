import "./Title.css";
import Footer from "./Footer";

export default function Title({ currentLevel, changePage }) {
  return (
    <>
      <h1 id="jumping-text">
        <span>S</span><span>o</span><span>k</span><span>o</span><span>B</span><span>a</span><span>l</span><span>l</span>
      </h1>

      <button id = 'PLAY' onClick={() => changePage("Game")}>
        {currentLevel === 0 ? "PLAY!" : "CONTINUE"}
      </button>
      <button id = 'LEVELS' onClick={() => changePage("Levels")}>Levels</button>
      <button id = 'SETTINGS' onClick={() => changePage("Settings")}>Settings</button>
      <Footer />
    </>
  );
}
