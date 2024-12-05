import { Empty, Wall, Crate, Ball, CrateGoal, Spikes, Pit } from "./Tile.js";
import { levels } from "./LevelPrefabs.js";

export class Board {
  constructor(levelId) {
    this._level = levels[levelId];
    this._crateAtGoals = 0;
    this._ballPos = { row: -1, col: -1 };
    this.topBoardLayer = []; // Contains following: Wall, Crate, and Ball (Player)
    this.bottomBoardLayer = []; // Contains the following: Goal, Spikes, and Pits
    this._buildBoard();
  }

  _buildBoard() {
    // Initialize 2D Matrix that stores Empties
    this.topBoardLayer = new Array(this._level.rows);
    this.bottomBoardLayer = new Array(this._level.rows);
    for (let r = 0; r < this._level.rows; r++) {
      this.topBoardLayer[r] = new Array(this._level.cols);
      this.bottomBoardLayer[r] = new Array(this._level.cols);
      for (let c = 0; c < this._level.cols; c++) {
        this.topBoardLayer[r][c] = new Empty([r, c]);
        this.bottomBoardLayer[r][c] = new Empty([r, c]);
      }
    }
    // Fill up the rest of the tile components
    let row = 0;
    let col = 0;
    for (const line of this._level.board.replace(/\s/g, "").split("\\")) {
      for (const tile of line.split("")) {
        this._addComponent(tile, row, col);
        col++;
      }
      row++;
      col = 0;
    }
    console.log(this.topBoardLayer);
    console.log(this.bottomBoardLayer);
  }

  _addComponent(component, row, col) {
    switch (component) {
      case ".": // Empty (Already taken care of)
        break;
      case "#": // Wall
        this.topBoardLayer[row][col] = new Wall();
        break;
      case "@": // Player (Ball)
        this.topBoardLayer[row][col] = new Ball();
        this._ballPos = { row: row, col: col };
        break;
      case "C": // Crate
        this.topBoardLayer[row][col] = new Crate();
        break;
      case "^": // Spikes
        this.bottomBoardLayer[row][col] = new Spikes();
        break;
      case "O": // Pit
        this.bottomBoardLayer[row][col] = new Pit();
        break;
      case "G": // CrateGoal
        this.bottomBoardLayer[row][col] = new CrateGoal();
        break;
      default:
        throw new Error(`"${component}" is an invalid game component`);
    }
  }

  rollBall(direction) {
    switch (direction) {
      case "Up":
        this._moveBall(-1, 0);
        break;
      case "Down":
        this._moveBall(1, 0);
        break;
      case "Left":
        this._moveBall(0, -1);
        break;
      case "Right":
        this._moveBall(0, 1);
        break;
      default:
        throw new Error(`${direction} is an invalid direction.`);
    }
    console.log(this.topBoardLayer);
  }

  _moveBall(rowVector, colVector) {
    // All boards must be surrounded by walls.
    const newRow = this._ballPos.row + rowVector;
    const newCol = this._ballPos.col + colVector;

    if (this.topBoardLayer[newRow][newCol] instanceof Empty) {
      this.topBoardLayer[newRow][newCol] = new Ball();
      this.topBoardLayer[this._ballPos.row][this._ballPos.col] = new Empty();
      this._ballPos = { row: newRow, col: newCol };
      if (!this._checkBallPop()) {
        this._moveBall(rowVector, colVector);
      } else {
        console.log("YOU DIED");
        this.topBoardLayer[newRow][newCol] = new Empty();
        this._ballPos = { row: -1, col: -1 };
      }
    } else if (this.topBoardLayer[newRow][newCol] instanceof Crate) {
      this._moveCrate(rowVector, colVector, newRow, newCol);
    }
  }

  _checkBallPop() {
    return (
      this.bottomBoardLayer[this._ballPos.row][this._ballPos.col] instanceof
      Spikes
    );
  }

  _moveCrate(rowVector, colVector, crateRow, crateCol) {
    const newRow = crateRow + rowVector;
    const newCol = crateCol + colVector;

    if (this.topBoardLayer[newRow][newCol] instanceof Empty) {
      this.topBoardLayer[newRow][newCol] = new Crate();
      this.topBoardLayer[crateRow][crateCol] = new Empty();
    }
  }
}
