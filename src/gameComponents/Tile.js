export class Tile {
  constructor(sprite) {
    this.sprite = sprite;
  }
}

export class Empty extends Tile {
  constructor() {
    super(".");
  }
}

export class Wall extends Tile {
  constructor() {
    super("#");
  }
}

export class Crate extends Tile {
  constructor() {
    super("C");
  }
}

export class Ball extends Tile {
  constructor(row, col) {
    super("@");
  }

  move(direction, board) {
    switch (direction) {
      case "L":
        break;
      case "R":
        break;
      case "U":
        break;
      case "D":
        break;
      default:
        throw new Error(`${direction} is not a valid direction to move.`);
    }
  }

  onSpikes(row, col, board) {
    return board[row][col] instanceof Spikes;
  }
}

export class CrateGoal extends Tile {
  constructor() {
    super("G");
  }

  push(direction, board) {
    switch (direction) {
      case "L":
        break;
      case "R":
        break;
      case "U":
        break;
      case "D":
        break;
      default:
        throw new Error(`${direction} is not a valid direction to push.`);
    }
  }
}

export class Spikes extends Tile {
  constructor() {
    super("^");
  }
}

export class Pit extends Tile {
  constructor() {
    super("O");
  }
}
