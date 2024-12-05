import { Board } from "../gameComponents/Board.js";
import { useState } from "react";

import Canvas from "./Canvas";
import Footer from "./Footer";
import Header from "./Header";
import "./Game.css";

import BallSprite from "../img/Ball.png";
import CrateSprite from "../img/Crate.png";
import CrateGoalSprite from "../img/CrateGoal.png";
import PitSprite from "../img/Pit.png";
import SpikesSprite from "../img/Spikes.png";
import WallSprite from "../img/Wall.png";

export default function Game({
  currentLevel,
  changeCurrentLevel,
  levelProgress,
  changeLevelProgress,
  changePage,
}) {
  const [renderBoard, setRenderBoard] = useState(false);
  const [lockButton, setLockButton] = useState(true);
  const game = new Board(currentLevel);

  const W_KEY = 87;
  const A_KEY = 65;
  const S_KEY = 83;
  const D_KEY = 68;

  const BACKGROUND_COLOR = "#FFFFFF";
  const FONT_OUTLINE_COLOR = "#000000";
  const FONT_COLOR = "#00FF00";

  const draw = (ctx) => {
    ctx.canvas.height = game.getRows() * 30;
    ctx.canvas.width = game.getCols() * 30;
    // Background Color
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Tiles
    for (let row = 0; row < game.getRows(); row++) {
      for (let col = 0; col < game.getCols(); col++) {
        const topimage = new Image();
        const bottomImage = new Image();
        // Bottom Tile
        switch (game.bottomBoardLayer[row][col].sprite) {
          case "^":
            topimage.src = SpikesSprite;
            ctx.drawImage(topimage, col * 30, row * 30);
            break;
          case "O":
            topimage.src = PitSprite;
            ctx.drawImage(topimage, col * 30, row * 30);
            break;
          case "G":
            topimage.src = CrateGoalSprite;
            ctx.drawImage(topimage, col * 30, row * 30);
            break;
          default:
            break;
        }
        // Top Tile
        switch (game.topBoardLayer[row][col].sprite) {
          case "#":
            bottomImage.src = WallSprite;
            ctx.drawImage(bottomImage, col * 30, row * 30);
            break;
          case "@":
            bottomImage.src = BallSprite;
            ctx.drawImage(bottomImage, col * 30, row * 30);
            break;
          case "C":
            bottomImage.src = CrateSprite;
            ctx.drawImage(bottomImage, col * 30, row * 30);
            break;
          default:
            break;
        }
      }
    }
    if (game.isPuzzleSolved()) {
      ctx.font = "20px Calibri";
      ctx.fillStyle = FONT_OUTLINE_COLOR;
      ctx.strokeText(
        "Puzzle Solved!",
        ctx.canvas.width / 8,
        ctx.canvas.height / 8
      );
      ctx.fillStyle = FONT_COLOR;
      ctx.fillText(
        "Puzzle Solved!",
        ctx.canvas.width / 8,
        ctx.canvas.height / 8
      );
      window.removeEventListener("keydown", _handleKeyDown);
      changeCurrentLevel(currentLevel < 4 ? currentLevel + 1 : 4);
      changeLevelProgress(Math.max(currentLevel + 1, levelProgress));
      setLockButton(false);
    }
  };

  const _handleKeyDown = (event) => {
    switch (event.keyCode) {
      case W_KEY:
        game.rollBall("Up");
        break;
      case A_KEY:
        game.rollBall("Left");
        break;
      case S_KEY:
        game.rollBall("Down");
        break;
      case D_KEY:
        game.rollBall("Right");
        break;
      default:
        break;
    }
    setRenderBoard(true);
  };

  const _moveToNextLevel = () => {
    changePage("Levels");
  };

  const _returnToTitle = () => {
    window.removeEventListener("keydown", _handleKeyDown);
    changePage("Title");
  };

  window.addEventListener("keydown", _handleKeyDown);

  return (
    <>
      <Header />
      <Canvas draw={draw} doRender={renderBoard} />
      <button onClick={_returnToTitle}>Return to Title Screen</button>
      {/* Return Button custom element when replaced with above line breaks everything */}
      <button onClick={_moveToNextLevel} disabled={lockButton}>
        Next Level
      </button>
      <Footer />
    </>
  );
}
