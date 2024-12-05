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
  const game = new Board(level);

  const W_KEY = 87;
  const A_KEY = 65;
  const S_KEY = 83;
  const D_KEY = 68;

  const COLOR_WHITE = "#FFFFFF";
  const COLOR_GRAY = "#777777";

  const draw = (ctx) => {
    ctx.canvas.height = game.getRows() * 15;
    ctx.canvas.width = game.getCols() * 15;
    // Background Color
    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Tiles
    ctx.beginPath();
    for (let row = 0; row < game.getRows(); row++) {
      for (let col = 0; col < game.getCols(); col++) {
        const image = new Image();
        // Bottom Tile
        switch (game.bottomBoardLayer[row][col].sprite) {
          case "^":
            image.src = SpikesSprite;
            ctx.drawImage(image, col * 15, row * 15);
            break;
          case "O":
            image.src = PitSprite;
            ctx.drawImage(image, col * 15, row * 15);
            break;
          case "G":
            image.src = CrateGoalSprite;
            ctx.drawImage(image, col * 15, row * 15);
            break;
          default:
            break;
        }
        // Top Tile
        switch (game.topBoardLayer[row][col].sprite) {
          case "#":
            image.src = WallSprite;
            ctx.drawImage(image, col * 15, row * 15);
            break;
          case "@":
            image.src = BallSprite;
            ctx.drawImage(image, col * 15, row * 15);
            break;
          case "C":
            image.src = CrateSprite;
            ctx.drawImage(image, col * 15, row * 15);
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
    console.log(event.keyCode);
  };

  window.addEventListener("keydown", _handleKeyDown);

  return (
    <>
      <Canvas draw={draw} />
      <button onClick={() => changePage("Title")}>
        Return to Title Screen
      </button>
      <Footer />
    </>
  );
}
