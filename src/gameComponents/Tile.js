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
}

export class CrateGoal extends Tile {
  constructor() {
    super("G");
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
