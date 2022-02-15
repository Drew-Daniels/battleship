/**
 * 
 * @param {string} type In order of largest to smallest: carrier (5), battleship (4), cruiser (3), submarine (2), and destroyer (1)
 * @param {string} direction Horizontal or vertical
 * @returns Ship
 */
const Ship = (type, horizontal=true) => {

  const getType = () => type;
  let hz = horizontal;
  const isHorizontal = () => hz;
  const toggleDirection = () => {
    hz = !hz;
    return hz;
  }
  let length;
  switch (type) {
    case 'carrier':
      length = 5;
      break;
    case 'battleship':
      length = 4;
      break;
    case 'cruiser':
      length = 3;
      break;
    case 'submarine':
      length = 3;
      break;
    case 'destroyer':
      length = 2;
      break;
  }
  const getLength = () => length;
  // Create an array of 'positions' where the value in each 'position' indicates
  // whether or not that position has been hit
  // destroyer._positions = [false, false]
  // destroyer.hit(0) => [true, false]
  const _positions = Array(length).fill(false);
  /**
   * Takes an integer and marks that position of a ship as 'hit' by filling in that index with true
   * @param {int} hitPos 
   */
  const hit = (hitPos) => {
    if (isSunk()) {
      throw new Error('This ship is already sunk');
    } else if (hitPos >= _positions.length){
      throw new Error('Integer provided to .hit() must be less than the length of the ship');
    }
    _positions[hitPos] = true;
    return getHitPositions();
  }
  const countHits = () => {
    let ct = 0;
    _positions.forEach(function(_position) {
      if (_position) {
        ct++;
      };
    });
    return ct;
  }
  const isSunk = () => {
    return length === countHits();
  }
  const getHitPositions = () => {
    let hitPositions = [];
    let position;
    for (let i=0; i < _positions.length; i++) {
      position = _positions[i];
      if (position) {
        hitPositions.push(i);
      }
    }
    return hitPositions;
  }

  return {
    getType, 
    isHorizontal,
    toggleDirection,
    getLength,
    hit,
    isSunk,
  }
}
/**
 * 
 * @param {boolean} human 
 * @returns 
 */
const Gameboard = (human=true) => {
  const SHIPS = [];
  const BOARD = [
    // row 1
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 2 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 3 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 4 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 5 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 6
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 7 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 8 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 9 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
    // row 10 
    [
      [], [], [], [], [], [], [], [], [], []
    ],
  ]

  const getBoardWidth = () => {
    return BOARD.length - 1;
  }

  const getBoard = () => {
    return BOARD;
  }

  /**
   * Takes a string description of the ship to return and returns that ship
   * for this Gameboard object
   * @param {string} shipType 
   * @returns [Ship object]
   */
  const getShip = (shipType) => {
    let res;
    SHIPS.forEach(function(ship) {
      if (ship.getType() === shipType) {
        res = ship;
      }
    })
    return res;
  }

  /**
   * Used to check if a pair of coordinates already contains a ship reference
   * @param {int} row 
   * @param {int} col 
   * @returns
   */
  const containsShip = (row, col) => {
    return typeof BOARD[row][col][0] === 'object';
  }
  /**
   * Checks a pair of coordinates to see if they are within bounds of the gameboard
   * @param {int} row 
   * @param {int} col 
   * @returns boolean
   */
  const outOfBounds = (row, col) => {
    const boardWidth = getBoardWidth();
    return (row < 0 || row > boardWidth || col < 0 || col > boardWidth);
  }

  /**
   * Takes a pair of gameboard coordinates and checks whether these and any additional implied
   * ship coordinates (ones that will be activated based on the length of the ship) are
   * within the bounds of the board and do not already contain a ship
   * @param {int} startRow 
   * @param {int} startCol 
   * @param {Ship object} ship 
   */
  const validCoordinates = (startRow, startCol, ship) => {
    const isHorizontal = ship.isHorizontal();
    const shipLength = ship.getLength();
    let row;
    let col;
    let isValid = true;
    for (let i=0; i <= shipLength-1; i++) {
      if (isHorizontal) {
        row = startRow;
        col = startCol + i;
      } else {
        row = startRow + i;
        col = startCol;
      };
      if (outOfBounds(row, col) || containsShip(row, col)) {
        isValid = false;  
      };
    }
    return isValid;
  }

  const ctShips = () => {
    return SHIPS.length;
  }

  const getMissCoordinates = () => {
    const MISSES = [];
    const boardWidth = getBoardWidth();
    for (let rowNum=0; rowNum <= boardWidth; rowNum++) {
      for (let colNum=0; colNum <= boardWidth; colNum++) {
        if (BOARD[rowNum][colNum][0] === 'miss') {
          MISSES.push([rowNum, colNum]);
        }
      }
    }
    return MISSES;
  }

  const gameboardHasThisShip = (shipType) => {
    let res = false;
    SHIPS.forEach(function(SHIP) {
      if (SHIP.getType() === shipType) {
        res = true;
      }
    })
    return res;
  }
  /**
   * Takes a pair of coordinates, and marks those coordinates as containing a ship
   * @param {int} startRow 
   * @param {int} startCol 
   * @param {Ship object} ship 
   * @returns BOARD
   */
  const placeShip = (startRow, startCol, ship) => {
    if (gameboardHasThisShip(ship.getType())) {
      throw new Error ('This gameboard already has that ship type');
    }
    if (allShipsPlaced()) {
      throw new Error ('There are already 5 ships on this board')
    }
    const isHorizontal = ship.isHorizontal();
    const shipLength = ship.getLength();
    if (validCoordinates(startRow, startCol, ship)) {
      let row;
      let col;
      for (let i=0; i <= shipLength-1; i++) {
        if (isHorizontal) {
          row = startRow;
          col = startCol + i;
        } else {
          row = startRow + i;
          col = startCol;
        }
        BOARD[row][col][0] = {
          shipType: ship.getType(),
          shipPosition: i,
          isHit: false,
        };
      };
      SHIPS.push(ship);
    }
    return BOARD;
  }

  const removeShip = (startRow, startCol, ship) => {
    const isHorizontal = ship.isHorizontal();
    const shipLength = ship.getLength();
    if (containsShip(startRow, startCol, ship)) {
      let row;
      let col;
      for (let i=0; i <= shipLength-1; i++) {
        if (isHorizontal) {
          row = startRow;
          col = startCol + i;
        } else {
          row = startRow + i;
          col = startCol;
        }
        // remove the ship references from the Gameboard.BOARD array
        BOARD[row][col].pop();
      };
      // remove the Ship object from the Gameboard.SHIPS array
      for (let i=0; i < SHIPS.length; i++) {
        if (SHIPS[i].getType() === ship.getType()) {
          SHIPS.splice(i, 1);
        }
      }
    }
    return BOARD;
  }

  /**
   * Takes a pair of coordinates and tests to see if those coordinates retrieve an object
   * if so - a ship position is located there
   * if not - a ship position is not located there, and these coordinates will be logged as a miss
   * @param {int} row 
   * @param {int} col 
   */
  const receiveAttack = (row, col) => {
    const item = BOARD[row][col][0];
    // if these coordinates contain an object, the object is that which contains the following properties:
    // {
    //  shipType: 'carrier' || 'battleship' || 'cruiser' || 'submarine' || 'destroyer'
    //  shipPosition: 0 || 1 || 2 || 3 || 4
    //  isHit: true || false
    // }
    if (typeof item === 'object') {
      if (item.isHit) {
        throw new Error('This ship has already been hit in this location!');
      }
      const ship = getShip(item.shipType);
      const hitPosition = item.shipPosition;
      ship.hit(hitPosition);
      item.isHit = true;
      // check if ship is sunk and do something
      if (ship.isSunk()) {
        // do something
      }
    } else {
      // if no ship here, log the miss
      BOARD[row][col][0] = 'miss';
    }
    return BOARD;
  }
  
  const allShipsPlaced = () => {
    return SHIPS.length === 5;
  }

  /**
   * Returns true if all ships are sunk, otherwise false
   * @returns boolean
   */
  const allShipsSunk = () => {
    if (!allShipsPlaced()) {
      throw new Error('Not enough ships on the board!');
    }
    return SHIPS.every(ship => ship.isSunk());
  }

  return {
    placeShip,
    removeShip,
    receiveAttack,
    getBoard,
    ctShips,
    allShipsSunk,
    containsShip,
  };
}

const Player = (human=true) => {
  const isHuman = () => human;
  // create Gameboard
  const gameboard = Gameboard(human);
  const getGameboard = () => gameboard;
  /**
   * Creates a Player-specific ship
   * @param {'carrier' || 'battleship' || 'cruiser' || 'submarine' || 'destroyer'} shipType 
   * @param {boolean} isHorizontal 
   * @returns [Ship object]
   */
  const createShip = (shipType, isHorizontal=true) => {
    return Ship(shipType, isHorizontal);
  }
  /**
   * Creates and places a ship on a Player's Gameboard at the specified coordinates and orientation
   * @param {int} rowNum 
   * @param {int} colNum 
   * @param {'carrier' || 'battleship' || 'cruiser' || 'submarine' || 'destroyer'} shipType 
   * @returns 
   */
  const deployShip = (rowNum, colNum, shipType, isHorizontal) => {
    const ship = createShip(shipType, isHorizontal);
    const board = gameboard.placeShip(rowNum, colNum, ship);
  }

  const sendAttack = (rowNum, colNum, gb) => {
    const board = gb.receiveAttack(rowNum, colNum);
    return board;
  }

  return {
    isHuman,
    createShip,
    deployShip,
    getGameboard,
    sendAttack,
  };
}

module.exports = {
  Ship,
  Gameboard,
  Player,
};
