import { useState } from "react";
import { useAuthentication } from "../services/authService";
import { SignIn, SignOut } from "./Auth";
import Title from "./Title";
import Game from "./Game";
import Levels from "./Levels";
import Settings from "./Settings";
import "./App.css";

export default function App() {
  const [levelProgress, setLevelProgress] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [key, setKey] = useState("");
  const [page, setPage] = useState("Title");
  const user = useAuthentication();

  const keyUp = (event) => {
    setKey(event.key);
  };

  switch (page) {
    case "Title":
      return <Title currentLevel={currentLevel} changePage={setPage} />;
    case "Game":
      return (
        <Game
          level={currentLevel}
          key={key}
          changeCurrentLevel={setCurrentLevel}
          changeLevelProgress={setLevelProgress}
          changePage={setPage}
        />
      );
    case "Levels":
      return (
        <Levels
          progress={levelProgress}
          setCurrentLevel={setCurrentLevel}
          changePage={setPage}
        />
      );
    case "Settings":
      return <Settings changePage={setPage} />;
    default:
      return <p>{page} is not a valid page</p>;
  }
}
