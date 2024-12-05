import { useRef } from "react";
import { Board } from "../gameComponents/Board.js";
import { Tile } from "../gameComponents/Tile.js";
import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Footer from "./Footer";
import "./Game.css";

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

  const draw = (ctx) => {
    const length = ctx.canvas.height;
    // Background Color
    ctx.fillStyle = COLOR_WHITE;
    ctx.rect(0, 0, length, length);
    ctx.fill();
    // Tiles
    for (let row = 0; row < game.rows; row++) {
      for (let col = 0; col < game.cols; col++) {
        // Top Tile
        switch (game.bottomBoardLayer[row][col].sprite) {
          case "^":
            break;
          case "O":
            break;
          case "G":
            break;
          default:
            break;
        }
        // Bottom Tile
        switch (game.topBoardLayer[row][col].sprite) {
          case "#":
            break;
          case "@":
            break;
          case "C":
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
