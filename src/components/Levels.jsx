import Footer from "./Footer";

export default function Levels({ levelProgress, setCurrentLevel, changePage }) {
  return (
    <>
      <h1>Levels</h1>
      <button onClick={() => _enterGame(1, setCurrentLevel, changePage)}>
        1
      </button>
      <button onClick={() => _enterGame(2, setCurrentLevel, changePage)}>
        2
      </button>
      <button onClick={() => _enterGame(3, setCurrentLevel, changePage)}>
        3
      </button>
      <button onClick={() => _enterGame(4, setCurrentLevel, changePage)}>
        4
      </button>
      <button onClick={() => _enterGame(5, setCurrentLevel, changePage)}>
        5
      </button>
      <button onClick={() => changePage("Title")}>
        Return to Title Screen
      </button>
      <Footer />
    </>
  );
}

function _enterGame(level, setCurrentLevel, changePage) {
  setCurrentLevel(level);
  changePage("Game");
}
