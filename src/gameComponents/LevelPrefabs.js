class Level {
  constructor(rows, cols, totalGoals, board) {
    this.rows = rows;
    this.cols = cols;
    this.totalGoals = totalGoals;
    this.board = board;
  }
}

export const levels = [
  new Level( // Level 0
    6,
    5,
    1,
    `
    #####\\
    #G###\\
    #.C.#\\
    #.#.#\\
    #@..#\\
    #####\\`
  ),
  new Level( // Level 1
    5,
    10,
    1,
    `
    ##########\\
    #G^.....@#\\
    #^..C....#\\
    ####.....$\\
    ##########\\`
  ),
  new Level( // Level 2
    6,
    6,
    1,
    `
    ######\\
    #..^G#\\
    ##.^^#\\
    #.C..#\\
    #...@#\\
    ######\\`
  ),
  new Level( // Level 3
    8,
    7,
    2,
    `
      #######\\
      #G....#\\
      #.....#\\
      #..C..#\\
      #O.@.O#\\
      #.C...#\\
      #....G#\\
      #######\\`
  ),
  new Level( // Level 4
    9,
    10,
    4,
    `
    ##########\\
    #G....C.G#\\
    ##......##\\
    #...C....#\\
    #...@....#\\
    #.C.C....#\\
    ##......##\\
    #G......G#\\
    ##########\\`
  ),
];
