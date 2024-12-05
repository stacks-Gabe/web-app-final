import { useRef } from "react";
import { Board } from "../gameComponents/Board.js";
import { Tile } from "../gameComponents/Tile.js";
import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Footer from "./Footer";
import "./Game.css";

import BallSprite from "../img/Ball.png";
import CrateSprite from "../img/Crate.png";
import CrateGoalSprite from "../img/CrateGoal.png";
import PitSprite from "../img/Pit.png";
import SpikesSprite from "../img/Spikes.png";
import WallSprite from "../img/Wall.png";

export default function Game({
  level,
  changeCurrentLevel,
  changeLevelProgress,
  changePage,
}) {
  const [renderBoard, setRenderBoard] = useState(false);
  const game = new Board(level);

  const W_KEY = 87;
  const A_KEY = 65;
  const S_KEY = 83;
  const D_KEY = 68;

  const BACKGROUND_COLOR = "#FFFFFF";

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

  const _cleanEventListeners = () => {
    window.removeEventListener("keydown", _handleKeyDown);
    changePage("Title");
  };

  window.addEventListener("keydown", _handleKeyDown);

  return (
    <>
      <Canvas draw={draw} doRender={renderBoard} />
      <button onClick={_cleanEventListeners}>Return to Title Screen</button>
      <Footer />
    </>
  );
}
