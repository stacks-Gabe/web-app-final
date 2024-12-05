import { Empty, Wall, Crate, Ball, CrateGoal, Spikes, Pit } from "./Tile.js";
import { levels } from "./LevelPrefabs.js";

export class Board {
  constructor(levelId) {
    this._level = levels[levelId];
    this._crateAtGoals = 0;
    this._ballPos = { row: -1, col: -1 };
    this.topBoardLayer = []; // Contains following: Wall, Crate, and Ball (Player)
    this.bottomBoardLayer = []; // Contains the following: Goal, Spikes, and Pits
    this._undoStack = [];
    this._buildBoard();
  }

  getRows() {
    return this._level.rows;
  }

  getCols() {
    return this._level.cols;
  }

  isPuzzleSolved() {
    return this._level.totalGoals === this._crateAtGoals;
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
        this._moveBall(-1, 0, false);
        break;
      case "Down":
        this._moveBall(1, 0, false);
        break;
      case "Left":
        this._moveBall(0, -1, false);
        break;
      case "Right":
        this._moveBall(0, 1, false);
        break;
      default:
        throw new Error(`${direction} is an invalid direction.`);
    }
  }

  _moveBall(rowVector, colVector, hasMoved) {
    // All boards must be surrounded by walls.
    const newRow = this._ballPos.row + rowVector;
    const newCol = this._ballPos.col + colVector;

    if (this.topBoardLayer[newRow][newCol] instanceof Empty) {
      this.topBoardLayer[this._ballPos.row][this._ballPos.col] = new Empty();
      if (!hasMoved) {
        this._undoStack.push({
          tile: new Ball(),
          row: this._ballPos.row,
          col: this._ballPos.col,
        });
      }
      if (
        !this._checkBallPop(newRow, newCol) &&
        !this._checkOnPit(newRow, newCol)
      ) {
        this.topBoardLayer[newRow][newCol] = new Ball();
        this._ballPos = { row: newRow, col: newCol };
        this._moveBall(rowVector, colVector, true);
      } else {
        this._ballPos = { row: -1, col: -1 };
      }
    } else if (this.topBoardLayer[newRow][newCol] instanceof Crate) {
      if (!hasMoved) {
        this._undoStack.push({
          tile: new Ball(),
          row: this._ballPos.row,
          col: this._ballPos.col,
        });
      } else {
        this._undoStack.push({
          tile: new Empty(),
          row: this._ballPos.row,
          col: this._ballPos.col,
        });
      }
      this._moveCrate(rowVector, colVector, newRow, newCol);
    } else {
      if (hasMoved) {
        this._undoStack.push({
          tile: new Empty(),
          row: this._ballPos.row,
          col: this._ballPos.col,
        });
      }
    }
  }

  _checkBallPop(ballRow, ballCol) {
    return this.bottomBoardLayer[ballRow][ballCol] instanceof Spikes;
  }

  _moveCrate(rowVector, colVector, crateRow, crateCol) {
    const newRow = crateRow + rowVector;
    const newCol = crateCol + colVector;

    if (this.topBoardLayer[newRow][newCol] instanceof Empty) {
      this._undoStack.push({
        tile: new Crate(),
        row: crateRow,
        col: crateCol,
      });
      this._undoStack.push({
        tile: new Empty(),
        row: newRow,
        col: newCol,
      });
      if (!this._checkOnPit(newRow, newCol)) {
        this.topBoardLayer[newRow][newCol] = new Crate();
      }
      this.topBoardLayer[crateRow][crateCol] = new Empty();
      // Subtract if Crate is pushed off of the goal.
      if (this._checkOnGoal(crateRow, crateCol)) {
        this._crateAtGoals--;
      }
      // Add if Crate is pushed onto the goal.
      if (this._checkOnGoal(newRow, newCol)) {
        this._crateAtGoals++;
      }
    }
  }

  _checkOnGoal(crateRow, crateCol) {
    return this.bottomBoardLayer[crateRow][crateCol] instanceof CrateGoal;
  }

  _checkOnPit(row, col) {
    return this.bottomBoardLayer[row][col] instanceof Pit;
  }

  restart() {
    this._buildBoard();
    this._crateAtGoals = 0;
    this._undoStack = [];
  }

  undo() {
    if (this._undoStack.length !== 0) {
      let tile = null;
      do {
        tile = this._undoStack.pop();
        this.topBoardLayer[tile.row][tile.col] = tile.tile;
      } while (!(tile.tile instanceof Ball));
      this._ballPos = { row: tile.row, col: tile.col };
    }
  }
}
