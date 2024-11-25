import { open } from "node:fs/promises"
import 'Game.js'
import 'Tile.js'

class Board {
  constructor(level) {
    this._rows = 0
    this._cols = 0
    this._totalGoals = 0
    this._totalCrates = 0
    // Top layer will have the following: Wall, Crate, and Ball (Player)
    this.topBoardLayer = new Array(rows)
    // Bottom layer will have the following: Goal, Spikes, and Pits
    this.bottomBoardLayer = new Array(rows)
    for (var i = 0 ; i < rows ; i++) {
      this.topBoardLayer[i] = new Array(cols)
      this.bottomBoardLayer[i] = new Array(cols)
    }
  }

  async buildBoard(level) {
    const file = await open(`../levels/level${level}.txt`, "r")
    if (file === null) {
      throw new Error(`File ../levels/level${level}.txt cannot be found.`)
    }
    for await (const line of file.readLines()) {
      let editedLine = line.trim()
    }
  }

  _addComponent(component, row, col) {
    switch (component) {
      case "#":  // Wall 
        this.topBoardLayer[row][col] = new Wall([row, col])
        break
      case "@":  // Player (Ball)
        this.topBoardLayer[row][col] = new Ball([row, col])
        break
      case "C":  // Crate
        this.topBoardLayer[row][col] = new Crate([row, col])
        this.totalCrates += 1
        break
      case "^":  // Spikes
        this.bottomBoardLayer[row][col] = new Spikes([row, col])
        break
      case "O":  // Pit
        this.bottomBoardLayer[row][col] = new Pit([row, col])
        break
      case "G":  // CrateGoal
        this.bottomBoardLayer[row][col] = new Pit([row, col])
        break
      case ".":  // Empty
        break
      default:
        throw new Error(`"${component}" is an invalid game component`)
    }
  }
}

