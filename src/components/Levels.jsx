import Header from "./Header";
import Footer from "./Footer";
import ReturnButton from "./ReturnButton";
import "./Levels.css";

export default function Levels({
  levelProgress,
  setCurrentLevel,
  changePage,
  language,
}) {
  return (
    <>
      <Header language={language} />
      <h1>{language === "fr" ? "Niveaus" : "Levels"}</h1>
      <div className="buttons">
        <div className="buttonLevelCollection">
          <button
            className="buttonLevel1"
            onClick={() => _enterGame(0, setCurrentLevel, changePage)}
          >
            1
          </button>
          <button
            className="buttonLevel2"
            onClick={() => _enterGame(1, setCurrentLevel, changePage)}
            disabled={levelProgress < 1}
          >
            2
          </button>
          <button
            className="buttonLevel3"
            onClick={() => _enterGame(2, setCurrentLevel, changePage)}
            disabled={levelProgress < 2}
          >
            3
          </button>
          <button
            className="buttonLevel4"
            onClick={() => _enterGame(3, setCurrentLevel, changePage)}
            disabled={levelProgress < 3}
          >
            4
          </button>
          <button
            className="buttonLevel5"
            onClick={() => _enterGame(4, setCurrentLevel, changePage)}
            disabled={levelProgress < 4}
          >
            5
          </button>
        </div>
        <ReturnButton
          className="buttonReturn"
          setPage={changePage}
          language={language}
        />
      </div>
      <Footer language={language} />
    </>
  );
}

function _enterGame(level, setCurrentLevel, changePage) {
  setCurrentLevel(level);
  changePage("Game");
}
