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
  console.log(_positions);
  /**
   * Takes an integer and marks that position of a ship as 'hit'
   * @param {int} hitPos 
   */
  const hit = (hitPos) => {
    if (isSunk()) {
      throw new Error('This ship is already sunk');
    };
    if (hitPos < _positions.length) {
      _positions[hitPos] = true;
    } else {
      throw new Error('Integer provided to .hit() must be less than the length of the ship');
    };
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

const Gameboard = (human=true) => {
  const board = [
    // row 1
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 2 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 3 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 4 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 5 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 6
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 7 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 8 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 9 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
    // row 10 
    [
      [''], [''], [''], [''],  [''],  [''],  [''],  [''],  [''],  ['']
    ],
  ]

  return {
    board
  };
}

const Player = (human=true) => {
  const isHuman = () => human;
  return {
    isHuman,
  };
}

module.exports = {
  Ship,
  Gameboard,
  Player,
};