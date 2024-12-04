import "./Title.css";
import Footer from "./Footer";

export default function Title({ currentLevel, changePage }) {
  return (
    <>
      <h1>SokoBall</h1>
      <button onClick={() => changePage("Game")}>
        {currentLevel === 1 ? "PLAY!" : "CONTINUE"}
      </button>
      <button onClick={() => changePage("Levels")}>Levels</button>
      <button onClick={() => changePage("Settings")}>Settings</button>
      <Footer />
    </>
  );
}
