import { useState, useEffect } from "react";
import { useAuthentication } from "../services/authService";

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
      // TODO: Set the levelProgress from signing in!
      setLevelProgress(0);
    }
  }, [user]);

  useEffect(() => {
    fetch("https://hellosalut.stefanbohacek.dev/?mode=auto")
      .then((response) => response.json())
      .then((jsonData) => setLanguage(jsonData?.code))
      .catch((e) => setErrorLang(`${e}`));
  }, []);

  switch (page) {
    case "Title":
      return <Title currentLevel={currentLevel} changePage={setPage} />;
    case "Game":
      return (
        <Game
          currentLevel={currentLevel}
          changeCurrentLevel={setCurrentLevel}
          levelProgress={levelProgress}
          changeLevelProgress={setLevelProgress}
          changePage={setPage}
        />
      );
    case "Levels":
      return (
        <Levels
          levelProgress={levelProgress}
          setCurrentLevel={setCurrentLevel}
          changePage={setPage}
        />
      );
    case "Controls":
      return <Controls changePage={setPage} />;
    default:
      return <p>{page} is not a valid page</p>;
  }
}
