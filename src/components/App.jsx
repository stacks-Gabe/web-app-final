import { useState, useEffect } from "react";
import { useAuthentication } from "../services/authService";
import { saveProgress, fetchProgress } from "../services/saveService";

import Title from "./Title";
import Game from "./Game";
import Levels from "./Levels";
import Controls from "./Controls";
import "./App.css";

export default function App() {
  const [levelProgress, setLevelProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [page, setPage] = useState("Title");
  const user = useAuthentication();
  const [language, setLanguage] = useState("en");
  const [errorLang, setErrorLang] = useState("");


  useEffect(() => {
    if (user) {
      fetchProgress().then(setLevelProgress);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveProgress(levelProgress);
    }
  }, [levelProgress]);

  useEffect(() => {
    fetch("https://hellosalut.stefanbohacek.dev/?mode=auto")
      .then((response) => response.json())
      .then((jsonData) => setLanguage(jsonData?.code))
      .catch((e) => setErrorLang(`${e}`));
    if (errorLang) {
      console.log(errorLang);
    }
  }, []);

  return (
    <>
      {page === "Title" ? (
        <Title
          currentLevel={currentLevel}
          changePage={setPage}
          language={language}
        />
      ) : page === "Game" ? (
        <Game
          currentLevel={currentLevel}
          changeCurrentLevel={setCurrentLevel}
          levelProgress={levelProgress}
          changeLevelProgress={setLevelProgress}
          user={user}
          saveProgress={saveProgress}
          page={page}
          changePage={setPage}
          language={language}
        />
      ) : page === "Levels" ? (
        <Levels
          levelProgress={levelProgress}
          setCurrentLevel={setCurrentLevel}
          changePage={setPage}
          language={language}
        />
      ) : page === "Controls" ? (
        <Controls changePage={setPage} language={language} />
      ) : (
        <p>
          {page}{" "}
          {language === "fr"
            ? "n'est pas une page valide"
            : "is not a valid page"}
        </p>
      )}
    </>
  );
}
