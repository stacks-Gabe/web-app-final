export class Tile {
  constructor(coords) {
    this.coords = coords;
  }
}

class Empty extends Tile {
  constructor(coords) {
    super(coords);
  }
}

class Wall extends Tile {
  constructor(coords) {
    super(coords);
    this.sprite = "";
  }
}

class Crate extends Tile {
  constructor(coords) {
    super(coords);
    this.sprite = "";
  }
}

class Ball extends Tile {
  constructor(coords) {
    super(coords);
    this.sprite = "";
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

  onSpikes(coords, board) {
    return board[coords[0]][coords[1]] instanceof Spikes;
  }
}

class CrateGoal extends Tile {
  constructor(coords) {
    super(coords);
    this.sprite = "";
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

class BallGoal extends Tile {
  constructor(coords) {
    super(coords);
    this.sprite = "";
  }
}

class Spikes extends Tile {
  constructor(coords) {
    super(coords);
    this.sprite = "";
  }
}

class Pit extends Tile {
  constructor(coords) {
    super(coords);
    this.sprite = "";
  }
}
