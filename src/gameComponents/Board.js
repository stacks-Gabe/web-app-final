import 'Game.js';
import 'Tile.js';

class Board {
    constructor(filePath) {
        // Top layer will have the following: Wall, Crate, and Ball (Player)
        this.topBoardLayer = Array(rows);
        // Bottom layer will have the following: Goal, Spikes, and Pits
        this.bottomBoardLayer = Array(rows);
        for (var r = 0; r < rows; r++) {
            this.topBoardLayer[i] = new Array(cols);
            this.bottomBoardLayer[i] = new Array(cols);
        }
    }

    buildBoard() {
        switch () {
            case 0:
              day = "Sunday";
              break;
            case 1:
              day = "Monday";
              break;
            case 2:
               day = "Tuesday";
              break;
            case 3:
              day = "Wednesday";
              break;
            case 4:
              day = "Thursday";
              break;
            case 5:
              day = "Friday";
              break;
            case 6:
              day = "Saturday";
          }
    }
}

