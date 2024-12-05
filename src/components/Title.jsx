import Header from "./Header";
import Footer from "./Footer";
import "./Title.css";

export default function Title({ currentLevel, changePage, language }) {
  return (
    <>
      <Header language={language} />
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
        {currentLevel === 0
          ? language === "fr"
            ? "JOUER!"
            : "PLAY!"
          : language === "fr"
          ? "CONTINUER"
          : "CONTINUE"}
      </button>
      <button id="LEVELS" onClick={() => changePage("Levels")}>
        {language === "fr" ? "Niveaus" : "Levels"}
      </button>
      <button id="CONTROLS" onClick={() => changePage("Controls")}>
        {language === "fr" ? "Contrôles" : "Controls"}
      </button>
      <Footer language={language} />
    </>
  );
}
