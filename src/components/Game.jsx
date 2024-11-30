import { Board } from "../gameComponents/Board.js";

export default function Game(level) {
  game = Board(level);

  return (
    <>
      <button>Return to Title Screen</button>
    </>
  );
}
