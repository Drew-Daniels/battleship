/**
 * 
 * @param {string} type In order of largest to smallest: carrier (5), battleship (4), cruiser (3), submarine (2), and destroyer (1)
 * @param {string} direction Horizontal or vertical
 * @returns Ship
 */
const Ship = (type, horizontal=true) => {

  let sunk = false;

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
  const ctHits = () => {
    let ct = 0;

  }
  const checkIfSunk = () => {
    // ct number of hits

    // test if number of hits is equal to length
  }
  const positions = Array.from(Array(length));
  const hit = (hitLoc) => {
    // Mark this position as hit
    positions[hitLoc]['x'];
    // Update 'sunk' value if all positions are hit

  }

  /**
   * Returns whether or not a ship is sunk based on whether or not the number of its positions hit and length are equal
   */
  const isSunk = () => sunk;

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