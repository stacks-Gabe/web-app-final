import Header from "./Header";
import Footer from "./Footer";
import "./Levels.css";
import ReturnButton from "./ReturnButton";

export default function Levels({ levelProgress, setCurrentLevel, changePage }) {
  return (
    <>
      <Header />
      <h1>Levels</h1>
      <button onClick={() => _enterGame(0, setCurrentLevel, changePage)}>
        1
      </button>
      <button
        onClick={() => _enterGame(1, setCurrentLevel, changePage)}
        disabled={levelProgress < 1}
      >
        2
      </button>
      <button
        onClick={() => _enterGame(2, setCurrentLevel, changePage)}
        disabled={levelProgress < 2}
      >
        3
      </button>
      <button
        onClick={() => _enterGame(3, setCurrentLevel, changePage)}
        disabled={levelProgress < 3}
      >
        4
      </button>
      <button
        onClick={() => _enterGame(4, setCurrentLevel, changePage)}
        disabled={levelProgress < 4}
      >
        5
      </button>
      <ReturnButton setPage={changePage} />
      <Footer />
    </>
  );
}

function _enterGame(level, setCurrentLevel, changePage) {
  setCurrentLevel(level);
  changePage("Game");
}
