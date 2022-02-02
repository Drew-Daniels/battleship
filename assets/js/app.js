/**
 * 
 * @param {string} type In order of largest to smallest: carrier (5), battleship (4), cruiser (3), submarine (2), and destroyer (1)
 * @param {string} direction Horizontal or vertical
 * @returns Ship
 */
const Ship = (type, direction='horizontal') => {

  const getType = () => type;
  const getDirection = () => direction;
  const getLength = function(type) {
    let length;
    switch (type) {
      case 'carrier':
        length = 5;
        break;
      case 'battleship':
        length = 4;
        break;
      case 'cruiser' || 'submarine':
        length = 3;
        break;
      case 'destroyer':
        length = 2;
        break;
    }
  }
  const length = getLength(type);

  const setAnchor = (coordinates) => {
    const startPosition = coordinates;
    if (direction === 'horizontal') {

    } else {

    }
  }

  const hit = (position) => {

  }

  /**
   * Returns whether or not a ship is sunk based on whether or not the number of its positions hit and length are equal
   */
  const isSunk = () => {

  }

  return {getType, getDirection, getLength}
}

const Gameboard = () => {
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

  return {board};
}

const Player = (type) => {

}