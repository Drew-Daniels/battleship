/**
 * 
 * @param {string} type In order of largest to smallest: carrier (5), battleship (4), cruiser (3), submarine (2), and destroyer (1)
 * @param {string} direction Horizontal or vertical
 * @returns Ship
 */
const Ship = (type, horizontal=true) => {

  const getType = () => type;
  const isHorizontal = () => horizontal;
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
   * Takes an integer and marks that position of a ship as 'hit'
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

  /**
   * Returns whether or not a ship is sunk based on whether or not the number of its positions hit and length are equal
   */

  return {
    getType, 
    isHorizontal, 
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
  const MISSES = [];
  const board = [
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

  const getBoard = () => {
    return board;
  }

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
   * Used to check if a pair of coordinates already contains a ship
   * @param {int} row 
   * @param {int} col 
   * @returns
   */
  const containsShip = (row, col) => {
    return typeof board[row][col][0] === 'object';
  }

  /**
   * Takes a pair of coordinates, and marks those coordinates as containing a ship
   * @param {int} startRow 
   * @param {int} startCol 
   * @param {Ship object} ship 
   * @returns 
   */
  const placeShip = (startRow, startCol, ship) => {
    const isHorizontal = ship.isHorizontal();
    const shipLength = ship.getLength();
    // first check to make sure none of the coordinates contain a ship already
    for (let i=0; i <= shipLength-1; i++) {
      if (isHorizontal) {
        if (containsShip(startRow, startCol+i)) {
          throw new Error('These coordinates overlap with another ship');
        };
      } else {
        if (containsShip(startRow+i, startCol)) {
          throw new Error('These coordinates overlap with another ship')
        }
      }
    }
    for (let i=0; i <= shipLength-1; i++) {
      // stay within the same row and iterate columns
      if (isHorizontal) {
        board[startRow][startCol+i][0] = {
          shipType: ship.getType(),
          shipPosition: i,
          isHit: false,
        }
      // stay within the same column and iterate rows
      } else {
        board[startRow+i][startCol][0] = {
          shipType: ship.getType(),
          shipPosition: i,
          isHit: false,
        }
      }
    }
    SHIPS.push(ship);
    return board;
  }

  /**
   * Takes a pair of coordinates and tests to see if those coordinates retrieve an object
   * if so - a ship position is located there
   * if not - a ship position is not located there, and these coordinates will be logged as a miss
   * @param {int} row 
   * @param {int} col 
   */
  const receiveAttack = (row, col) => {
    const item = board[row][col][0];
    // if these coordinates contain an object, the object is that which contains the following properties:
    // {
    //  shipType: 'carrier' || 'battleship' || 'cruiser' || 'submarine' || 'destroyer'
    //  shipPosition: integer from 0 to 4, depending on the length of the ship
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

    } else {
      // if no ship here, log the miss
      board[row][col][0] = 'miss';
    }
    return board;
  }

  const allShipsSunk = () => {

  }

  return {
    placeShip,
    receiveAttack,
    getBoard,
  };
}

const Player = (human=true) => {
  const isHuman = () => human;

  return {
    isHuman,
  };
}

const selfTest = () => {
  // Create ships
  const dummyCarrierH = Ship('carrier');
  const dummyCarrierV = Ship('carrier', false);

  const dummyBattleshipH = Ship('battleship');
  const dummyBattleshipV = Ship('battleship', false);

  const dummyCruiserH = Ship('cruiser');
  const dummyCruiserV = Ship('cruiser', false);

  const dummySubmarineH = Ship('submarine');
  const dummySubmarineV = Ship('submarine', false);

  const dummyDestroyerH = Ship('destroyer');
  const dummyDestroyerV = Ship('destroyer', false);

  const dummyGameboardHuman = Gameboard();
  const dummyGameboardAI = Gameboard(false);

  console.log(dummyGameboardHuman.placeShip(0, 0, dummyDestroyerH));
  console.log(dummyGameboardAI.placeShip(0, 0, dummyDestroyerV));

  console.log(dummyGameboardHuman.receiveAttack(0,0))
}

selfTest();

module.exports = {
  Ship,
  Gameboard,
  Player,
};