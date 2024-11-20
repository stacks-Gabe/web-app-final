class Tile {
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
        this.image = "";
    }
}

class Crate extends Tile {
    constructor(coords) {
        super(coords);
        this.image = "";
    }
}

class Ball extends Tile {
    constructor(coords) {
        super(coords);
        this.image = "";
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
        this.image = "";
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
        this.image = "";
    }
}

class Spikes extends Tile {
    constructor(coords) {
        super(coords);
        this.image = "";
    }
}

class Pit extends Tile {
    constructor(coords) {
        super(coords);
        this.image = "";
    }
}