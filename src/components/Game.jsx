import { Board } from "../gameComponents/Board.js";
import { useState, useEffect } from "react";

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
import ReturnButton from "./ReturnButton.jsx";
import { render } from "react-dom";

export default function Game({
  currentLevel,
  changeCurrentLevel,
  levelProgress,
  changeLevelProgress,
  changePage,
  language,
}) {
  const [lockButton, setLockButton] = useState(true);
  const [renderBackground, setRenderBackground] = useState(true);
  const game = new Board(currentLevel);

  const W_KEY = 87;
  const A_KEY = 65;
  const S_KEY = 83;
  const D_KEY = 68;
  const R_KEY = 82;
  const Z_KEY = 90;
  const UP_KEY = 38;
  const LEFT_KEY = 37;
  const DOWN_KEY = 40;
  const RIGHT_KEY = 39;

  const BACKGROUND_COLOR = "#FFFFFF";
  const FONT_OUTLINE_COLOR = "#000000";
  const FONT_COLOR = "#00FF00";

  useEffect(() => {
    window.addEventListener("keydown", _handleKeyDown);
    return () => window.removeEventListener("keydown", _handleKeyDown);
  }, []);

  const draw = (ctx) => {
    ctx.canvas.height = game.getRows() * 30;
    ctx.canvas.width = game.getCols() * 30;
    // Background Color
    if (renderBackground) {
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const newRenderBackground = false;
      setRenderBackground(newRenderBackground);
    }
    // Tiles
    for (let row = 0; row < game.getRows(); row++) {
      for (let col = 0; col < game.getCols(); col++) {
        const topImage = new Image();
        const bottomImage = new Image();
        // Bottom Tile
        switch (game.bottomBoardLayer[row][col].sprite) {
          case "^":
            topImage.src = SpikesSprite;
            ctx.drawImage(topImage, col * 30, row * 30);
            break;
          case "O":
            topImage.src = PitSprite;
            ctx.drawImage(topImage, col * 30, row * 30);
            break;
          case "G":
            topImage.src = CrateGoalSprite;
            ctx.drawImage(topImage, col * 30, row * 30);
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
      case UP_KEY:
        game.rollBall("Up");
        break;
      case A_KEY:
      case LEFT_KEY:
        game.rollBall("Left");
        break;
      case S_KEY:
      case DOWN_KEY:
        game.rollBall("Down");
        break;
      case D_KEY:
      case RIGHT_KEY:
        game.rollBall("Right");
        break;
      case R_KEY:
        game.restart();
        break;
      case Z_KEY:
        game.undo();
        break;
      default:
        break;
    }
    setRenderBackground(true);
  };

  return (
    <>
      <Header language={language} />
      <div className="gameContainer">
        <Canvas className="gameContainerItem" draw={draw} />
        <button
          className="buttonNext"
          onClick={() => changePage("Levels")}
          disabled={lockButton}
        >
          {language === "fr" ? "Niveau Suivant" : "Next Level"}
        </button>
        <ReturnButton
          className="buttonReturn"
          setPage={changePage}
          language={language}
        />
      </div>
      <Footer language={language} />
    </>
  );
}
