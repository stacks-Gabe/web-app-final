import { useRef } from "react";
import { Board } from "../gameComponents/Board.js";
import { Tile } from "../gameComponents/Tile.js";
import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Footer from "./Footer";
import "./Game.css";

export default function Game({
  level,
  key,
  changeCurrentLevel,
  changeLevelProgress,
  changePage,
}) {
  const game = new Board(level);
  console.log(game.rows);

  const draw = (ctx) => {
    let length = ctx.canvas.height;
    // Background Color
    ctx.fillStyle = "#FFFFFF";
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
