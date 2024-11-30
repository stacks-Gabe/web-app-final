import "./Tile.js";

export class Board {
  constructor(level) {
    this._rows = 0;
    this._cols = 0;
    this._totalGoals = 0;
    this._totalCrates = 0;
    // Top layer will have the following: Wall, Crate, and Ball (Player)
    this.topBoardLayer = new Array(rows);
    // Bottom layer will have the following: Goal, Spikes, and Pits
    this.bottomBoardLayer = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.topBoardLayer[i] = new Array(cols);
      this.bottomBoardLayer[i] = new Array(cols);
    }
  }

  async buildBoard(level) {
    const file = await open(`../levels/level${level}.txt`, "r");
    if (file === null) {
      throw new Error(`File ../levels/level${level}.txt cannot be found.`);
    }

    lines = file.readLines();
    [this._rows, this._cols, this._totalGoals] = lines[0];
    let row,
      col = 0;
    for await (const line of lines.slice(1)) {
      for (const tile of line.split()) {
        this._addComponent(tile, row, col);
        col++;
      }
      row++;
    }
  }

  _addComponent(component, row, col) {
    switch (component) {
      case "#": // Wall
        this.topBoardLayer[row][col] = new Wall([row, col]);
        break;
      case "@": // Player (Ball)
        this.topBoardLayer[row][col] = new Ball([row, col]);
        break;
      case "C": // Crate
        this.topBoardLayer[row][col] = new Crate([row, col]);
        this.totalCrates += 1;
        break;
      case "^": // Spikes
        this.bottomBoardLayer[row][col] = new Spikes([row, col]);
        break;
      case "O": // Pit
        this.bottomBoardLayer[row][col] = new Pit([row, col]);
        break;
      case "G": // CrateGoal
        this.bottomBoardLayer[row][col] = new Pit([row, col]);
        break;
      case ".": // Empty
        break;
      default:
        throw new Error(`"${component}" is an invalid game component`);
    }
  }
}
