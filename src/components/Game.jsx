import { Board } from "../gameComponents/Board.js";

export default function Game({
  level,
  key,
  changeCurrentLevel,
  changeLevelProgress,
  changePage,
}) {
  // game = new Board(level);

  return (
    <>
      <button onClick={() => changePage("Title")}>
        Return to Title Screen
      </button>
    </>
  );
}
