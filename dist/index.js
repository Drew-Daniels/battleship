/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((module) => {

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
    // iterate rows first
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/js/app.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_app__WEBPACK_IMPORTED_MODULE_0__);


function main() {
  
  const p1 = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Player)();
  const p2 = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Player)(false);

  const p1GB = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
  const p2GB = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(false);

  // p1 ships
  const p1Carrier = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('carrier');
  const p1Battleship = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('battleship');
  const p1Cruiser = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('cruiser');
  const p1Submarine = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('submarine');
  const p1Destroyer = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('destroyer');
  // p2 ships
  const p2Carrier = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('carrier');
  const p2Battleship = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('battleship');
  const p2Cruiser = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('cruiser');
  const p2Submarine = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('submarine');
  const p2Destroyer = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Ship)('destroyer');

  // add event listeners, draw DOM elements etc.
  console.log(p1.isHuman());
}

main();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVCQUF1QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEIsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3Qyx5QkFBeUIsc0JBQXNCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEIsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbFhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05nRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxhQUFhLDRDQUFNO0FBQ25CLGFBQWEsNENBQU07QUFDbkI7QUFDQSxlQUFlLCtDQUFTO0FBQ3hCLGVBQWUsK0NBQVM7QUFDeEI7QUFDQTtBQUNBLG9CQUFvQiwwQ0FBSTtBQUN4Qix1QkFBdUIsMENBQUk7QUFDM0Isb0JBQW9CLDBDQUFJO0FBQ3hCLHNCQUFzQiwwQ0FBSTtBQUMxQixzQkFBc0IsMENBQUk7QUFDMUI7QUFDQSxvQkFBb0IsMENBQUk7QUFDeEIsdUJBQXVCLDBDQUFJO0FBQzNCLG9CQUFvQiwwQ0FBSTtBQUN4QixzQkFBc0IsMENBQUk7QUFDMUIsc0JBQXNCLDBDQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEluIG9yZGVyIG9mIGxhcmdlc3QgdG8gc21hbGxlc3Q6IGNhcnJpZXIgKDUpLCBiYXR0bGVzaGlwICg0KSwgY3J1aXNlciAoMyksIHN1Ym1hcmluZSAoMiksIGFuZCBkZXN0cm95ZXIgKDEpXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb24gSG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxyXG4gKiBAcmV0dXJucyBTaGlwXHJcbiAqL1xyXG5jb25zdCBTaGlwID0gKHR5cGUsIGhvcml6b250YWw9dHJ1ZSkgPT4ge1xyXG5cclxuICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTtcclxuICBsZXQgaHogPSBob3Jpem9udGFsO1xyXG4gIGNvbnN0IGlzSG9yaXpvbnRhbCA9ICgpID0+IGh6O1xyXG4gIGNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9ICgpID0+IHtcclxuICAgIGh6ID0gIWh6O1xyXG4gICAgcmV0dXJuIGh6O1xyXG4gIH1cclxuICBsZXQgbGVuZ3RoO1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSAnY2Fycmllcic6XHJcbiAgICAgIGxlbmd0aCA9IDU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYmF0dGxlc2hpcCc6XHJcbiAgICAgIGxlbmd0aCA9IDQ7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY3J1aXNlcic6XHJcbiAgICAgIGxlbmd0aCA9IDM7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnc3VibWFyaW5lJzpcclxuICAgICAgbGVuZ3RoID0gMztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdkZXN0cm95ZXInOlxyXG4gICAgICBsZW5ndGggPSAyO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xyXG4gIC8vIENyZWF0ZSBhbiBhcnJheSBvZiAncG9zaXRpb25zJyB3aGVyZSB0aGUgdmFsdWUgaW4gZWFjaCAncG9zaXRpb24nIGluZGljYXRlc1xyXG4gIC8vIHdoZXRoZXIgb3Igbm90IHRoYXQgcG9zaXRpb24gaGFzIGJlZW4gaGl0XHJcbiAgLy8gZGVzdHJveWVyLl9wb3NpdGlvbnMgPSBbZmFsc2UsIGZhbHNlXVxyXG4gIC8vIGRlc3Ryb3llci5oaXQoMCkgPT4gW3RydWUsIGZhbHNlXVxyXG4gIGNvbnN0IF9wb3NpdGlvbnMgPSBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xyXG4gIC8qKlxyXG4gICAqIFRha2VzIGFuIGludGVnZXIgYW5kIG1hcmtzIHRoYXQgcG9zaXRpb24gb2YgYSBzaGlwIGFzICdoaXQnIGJ5IGZpbGxpbmcgaW4gdGhhdCBpbmRleCB3aXRoIHRydWVcclxuICAgKiBAcGFyYW0ge2ludH0gaGl0UG9zIFxyXG4gICAqL1xyXG4gIGNvbnN0IGhpdCA9IChoaXRQb3MpID0+IHtcclxuICAgIGlmIChpc1N1bmsoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgc2hpcCBpcyBhbHJlYWR5IHN1bmsnKTtcclxuICAgIH0gZWxzZSBpZiAoaGl0UG9zID49IF9wb3NpdGlvbnMubGVuZ3RoKXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlZ2VyIHByb3ZpZGVkIHRvIC5oaXQoKSBtdXN0IGJlIGxlc3MgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBzaGlwJyk7XHJcbiAgICB9XHJcbiAgICBfcG9zaXRpb25zW2hpdFBvc10gPSB0cnVlO1xyXG4gICAgcmV0dXJuIGdldEhpdFBvc2l0aW9ucygpO1xyXG4gIH1cclxuICBjb25zdCBjb3VudEhpdHMgPSAoKSA9PiB7XHJcbiAgICBsZXQgY3QgPSAwO1xyXG4gICAgX3Bvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKF9wb3NpdGlvbikge1xyXG4gICAgICBpZiAoX3Bvc2l0aW9uKSB7XHJcbiAgICAgICAgY3QrKztcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGN0O1xyXG4gIH1cclxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gbGVuZ3RoID09PSBjb3VudEhpdHMoKTtcclxuICB9XHJcbiAgY29uc3QgZ2V0SGl0UG9zaXRpb25zID0gKCkgPT4ge1xyXG4gICAgbGV0IGhpdFBvc2l0aW9ucyA9IFtdO1xyXG4gICAgbGV0IHBvc2l0aW9uO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgX3Bvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwb3NpdGlvbiA9IF9wb3NpdGlvbnNbaV07XHJcbiAgICAgIGlmIChwb3NpdGlvbikge1xyXG4gICAgICAgIGhpdFBvc2l0aW9ucy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGl0UG9zaXRpb25zO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdldFR5cGUsIFxyXG4gICAgaXNIb3Jpem9udGFsLCBcclxuICAgIGdldExlbmd0aCxcclxuICAgIGhpdCxcclxuICAgIGlzU3VuayxcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGh1bWFuIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmNvbnN0IEdhbWVib2FyZCA9IChodW1hbj10cnVlKSA9PiB7XHJcbiAgY29uc3QgU0hJUFMgPSBbXTtcclxuICBjb25zdCBCT0FSRCA9IFtcclxuICAgIC8vIHJvdyAxXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDIgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDMgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDQgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDUgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDZcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgNyBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgOCBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgOSBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgMTAgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gIF1cclxuXHJcbiAgY29uc3QgZ2V0Qm9hcmRXaWR0aCA9ICgpID0+IHtcclxuICAgIHJldHVybiBCT0FSRC5sZW5ndGggLSAxO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gQk9BUkQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhIHN0cmluZyBkZXNjcmlwdGlvbiBvZiB0aGUgc2hpcCB0byByZXR1cm4gYW5kIHJldHVybnMgdGhhdCBzaGlwXHJcbiAgICogZm9yIHRoaXMgR2FtZWJvYXJkIG9iamVjdFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzaGlwVHlwZSBcclxuICAgKiBAcmV0dXJucyBbU2hpcCBvYmplY3RdXHJcbiAgICovXHJcbiAgY29uc3QgZ2V0U2hpcCA9IChzaGlwVHlwZSkgPT4ge1xyXG4gICAgbGV0IHJlcztcclxuICAgIFNISVBTLmZvckVhY2goZnVuY3Rpb24oc2hpcCkge1xyXG4gICAgICBpZiAoc2hpcC5nZXRUeXBlKCkgPT09IHNoaXBUeXBlKSB7XHJcbiAgICAgICAgcmVzID0gc2hpcDtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIGEgcGFpciBvZiBjb29yZGluYXRlcyBhbHJlYWR5IGNvbnRhaW5zIGEgc2hpcCByZWZlcmVuY2VcclxuICAgKiBAcGFyYW0ge2ludH0gcm93IFxyXG4gICAqIEBwYXJhbSB7aW50fSBjb2wgXHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBjb25zdCBjb250YWluc1NoaXAgPSAocm93LCBjb2wpID0+IHtcclxuICAgIHJldHVybiB0eXBlb2YgQk9BUkRbcm93XVtjb2xdWzBdID09PSAnb2JqZWN0JztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGEgcGFpciBvZiBjb29yZGluYXRlcyB0byBzZWUgaWYgdGhleSBhcmUgd2l0aGluIGJvdW5kcyBvZiB0aGUgZ2FtZWJvYXJkXHJcbiAgICogQHBhcmFtIHtpbnR9IHJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gY29sIFxyXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cclxuICAgKi9cclxuICBjb25zdCBvdXRPZkJvdW5kcyA9IChyb3csIGNvbCkgPT4ge1xyXG4gICAgY29uc3QgYm9hcmRXaWR0aCA9IGdldEJvYXJkV2lkdGgoKTtcclxuICAgIHJldHVybiAocm93IDwgMCB8fCByb3cgPiBib2FyZFdpZHRoIHx8IGNvbCA8IDAgfHwgY29sID4gYm9hcmRXaWR0aCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhIHBhaXIgb2YgZ2FtZWJvYXJkIGNvb3JkaW5hdGVzIGFuZCBjaGVja3Mgd2hldGhlciB0aGVzZSBhbmQgYW55IGFkZGl0aW9uYWwgaW1wbGllZFxyXG4gICAqIHNoaXAgY29vcmRpbmF0ZXMgKG9uZXMgdGhhdCB3aWxsIGJlIGFjdGl2YXRlZCBiYXNlZCBvbiB0aGUgbGVuZ3RoIG9mIHRoZSBzaGlwKSBhcmVcclxuICAgKiB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgYm9hcmQgYW5kIGRvIG5vdCBhbHJlYWR5IGNvbnRhaW4gYSBzaGlwXHJcbiAgICogQHBhcmFtIHtpbnR9IHN0YXJ0Um93IFxyXG4gICAqIEBwYXJhbSB7aW50fSBzdGFydENvbCBcclxuICAgKiBAcGFyYW0ge1NoaXAgb2JqZWN0fSBzaGlwIFxyXG4gICAqL1xyXG4gIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSAoc3RhcnRSb3csIHN0YXJ0Q29sLCBzaGlwKSA9PiB7XHJcbiAgICBjb25zdCBpc0hvcml6b250YWwgPSBzaGlwLmlzSG9yaXpvbnRhbCgpO1xyXG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XHJcbiAgICBsZXQgcm93O1xyXG4gICAgbGV0IGNvbDtcclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgIGZvciAobGV0IGk9MDsgaSA8PSBzaGlwTGVuZ3RoLTE7IGkrKykge1xyXG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgcm93ID0gc3RhcnRSb3c7XHJcbiAgICAgICAgY29sID0gc3RhcnRDb2wgKyBpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdyA9IHN0YXJ0Um93ICsgaTtcclxuICAgICAgICBjb2wgPSBzdGFydENvbDtcclxuICAgICAgfTtcclxuICAgICAgaWYgKG91dE9mQm91bmRzKHJvdywgY29sKSB8fCBjb250YWluc1NoaXAocm93LCBjb2wpKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGZhbHNlOyAgXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGN0U2hpcHMgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gU0hJUFMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TWlzc0Nvb3JkaW5hdGVzID0gKCkgPT4ge1xyXG4gICAgLy8gaXRlcmF0ZSByb3dzIGZpcnN0XHJcbiAgICBjb25zdCBNSVNTRVMgPSBbXTtcclxuICAgIGNvbnN0IGJvYXJkV2lkdGggPSBnZXRCb2FyZFdpZHRoKCk7XHJcbiAgICBmb3IgKGxldCByb3dOdW09MDsgcm93TnVtIDw9IGJvYXJkV2lkdGg7IHJvd051bSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbE51bT0wOyBjb2xOdW0gPD0gYm9hcmRXaWR0aDsgY29sTnVtKyspIHtcclxuICAgICAgICBpZiAoQk9BUkRbcm93TnVtXVtjb2xOdW1dWzBdID09PSAnbWlzcycpIHtcclxuICAgICAgICAgIE1JU1NFUy5wdXNoKFtyb3dOdW0sIGNvbE51bV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1JU1NFUztcclxuICB9XHJcblxyXG4gIGNvbnN0IGdhbWVib2FyZEhhc1RoaXNTaGlwID0gKHNoaXBUeXBlKSA9PiB7XHJcbiAgICBsZXQgcmVzID0gZmFsc2U7XHJcbiAgICBTSElQUy5mb3JFYWNoKGZ1bmN0aW9uKFNISVApIHtcclxuICAgICAgaWYgKFNISVAuZ2V0VHlwZSgpID09PSBzaGlwVHlwZSkge1xyXG4gICAgICAgIHJlcyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBUYWtlcyBhIHBhaXIgb2YgY29vcmRpbmF0ZXMsIGFuZCBtYXJrcyB0aG9zZSBjb29yZGluYXRlcyBhcyBjb250YWluaW5nIGEgc2hpcFxyXG4gICAqIEBwYXJhbSB7aW50fSBzdGFydFJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRDb2wgXHJcbiAgICogQHBhcmFtIHtTaGlwIG9iamVjdH0gc2hpcCBcclxuICAgKiBAcmV0dXJucyBCT0FSRFxyXG4gICAqL1xyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApID0+IHtcclxuICAgIGlmIChnYW1lYm9hcmRIYXNUaGlzU2hpcChzaGlwLmdldFR5cGUoKSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yICgnVGhpcyBnYW1lYm9hcmQgYWxyZWFkeSBoYXMgdGhhdCBzaGlwIHR5cGUnKTtcclxuICAgIH1cclxuICAgIGlmIChhbGxTaGlwc1BsYWNlZCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvciAoJ1RoZXJlIGFyZSBhbHJlYWR5IDUgc2hpcHMgb24gdGhpcyBib2FyZCcpXHJcbiAgICB9XHJcbiAgICBjb25zdCBpc0hvcml6b250YWwgPSBzaGlwLmlzSG9yaXpvbnRhbCgpO1xyXG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XHJcbiAgICBpZiAodmFsaWRDb29yZGluYXRlcyhzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApKSB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2w7XHJcbiAgICAgIGZvciAobGV0IGk9MDsgaSA8PSBzaGlwTGVuZ3RoLTE7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHJvdyA9IHN0YXJ0Um93O1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2wgKyBpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdyArIGk7XHJcbiAgICAgICAgICBjb2wgPSBzdGFydENvbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgQk9BUkRbcm93XVtjb2xdWzBdID0ge1xyXG4gICAgICAgICAgc2hpcFR5cGU6IHNoaXAuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgc2hpcFBvc2l0aW9uOiBpLFxyXG4gICAgICAgICAgaXNIaXQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcbiAgICAgIFNISVBTLnB1c2goc2hpcCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQk9BUkQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW1vdmVTaGlwID0gKHN0YXJ0Um93LCBzdGFydENvbCwgc2hpcCkgPT4ge1xyXG4gICAgY29uc3QgaXNIb3Jpem9udGFsID0gc2hpcC5pc0hvcml6b250YWwoKTtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xyXG4gICAgaWYgKGNvbnRhaW5zU2hpcChzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApKSB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2w7XHJcbiAgICAgIGZvciAobGV0IGk9MDsgaSA8PSBzaGlwTGVuZ3RoLTE7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHJvdyA9IHN0YXJ0Um93O1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2wgKyBpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdyArIGk7XHJcbiAgICAgICAgICBjb2wgPSBzdGFydENvbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBzaGlwIHJlZmVyZW5jZXMgZnJvbSB0aGUgR2FtZWJvYXJkLkJPQVJEIGFycmF5XHJcbiAgICAgICAgQk9BUkRbcm93XVtjb2xdLnBvcCgpO1xyXG4gICAgICB9O1xyXG4gICAgICAvLyByZW1vdmUgdGhlIFNoaXAgb2JqZWN0IGZyb20gdGhlIEdhbWVib2FyZC5TSElQUyBhcnJheVxyXG4gICAgICBmb3IgKGxldCBpPTA7IGkgPCBTSElQUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChTSElQU1tpXS5nZXRUeXBlKCkgPT09IHNoaXAuZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICBTSElQUy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQk9BUkQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhIHBhaXIgb2YgY29vcmRpbmF0ZXMgYW5kIHRlc3RzIHRvIHNlZSBpZiB0aG9zZSBjb29yZGluYXRlcyByZXRyaWV2ZSBhbiBvYmplY3RcclxuICAgKiBpZiBzbyAtIGEgc2hpcCBwb3NpdGlvbiBpcyBsb2NhdGVkIHRoZXJlXHJcbiAgICogaWYgbm90IC0gYSBzaGlwIHBvc2l0aW9uIGlzIG5vdCBsb2NhdGVkIHRoZXJlLCBhbmQgdGhlc2UgY29vcmRpbmF0ZXMgd2lsbCBiZSBsb2dnZWQgYXMgYSBtaXNzXHJcbiAgICogQHBhcmFtIHtpbnR9IHJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gY29sIFxyXG4gICAqL1xyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2wpID0+IHtcclxuICAgIGNvbnN0IGl0ZW0gPSBCT0FSRFtyb3ddW2NvbF1bMF07XHJcbiAgICAvLyBpZiB0aGVzZSBjb29yZGluYXRlcyBjb250YWluIGFuIG9iamVjdCwgdGhlIG9iamVjdCBpcyB0aGF0IHdoaWNoIGNvbnRhaW5zIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgIC8vIHtcclxuICAgIC8vICBzaGlwVHlwZTogJ2NhcnJpZXInIHx8ICdiYXR0bGVzaGlwJyB8fCAnY3J1aXNlcicgfHwgJ3N1Ym1hcmluZScgfHwgJ2Rlc3Ryb3llcidcclxuICAgIC8vICBzaGlwUG9zaXRpb246IDAgfHwgMSB8fCAyIHx8IDMgfHwgNFxyXG4gICAgLy8gIGlzSGl0OiB0cnVlIHx8IGZhbHNlXHJcbiAgICAvLyB9XHJcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmIChpdGVtLmlzSGl0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHNoaXAgaGFzIGFscmVhZHkgYmVlbiBoaXQgaW4gdGhpcyBsb2NhdGlvbiEnKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcChpdGVtLnNoaXBUeXBlKTtcclxuICAgICAgY29uc3QgaGl0UG9zaXRpb24gPSBpdGVtLnNoaXBQb3NpdGlvbjtcclxuICAgICAgc2hpcC5oaXQoaGl0UG9zaXRpb24pO1xyXG4gICAgICBpdGVtLmlzSGl0ID0gdHJ1ZTtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBpcyBzdW5rIGFuZCBkbyBzb21ldGhpbmdcclxuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcclxuICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gaWYgbm8gc2hpcCBoZXJlLCBsb2cgdGhlIG1pc3NcclxuICAgICAgQk9BUkRbcm93XVtjb2xdWzBdID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBhbGxTaGlwc1BsYWNlZCA9ICgpID0+IHtcclxuICAgIHJldHVybiBTSElQUy5sZW5ndGggPT09IDU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgYWxsIHNoaXBzIGFyZSBzdW5rLCBvdGhlcndpc2UgZmFsc2VcclxuICAgKiBAcmV0dXJucyBib29sZWFuXHJcbiAgICovXHJcbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xyXG4gICAgaWYgKCFhbGxTaGlwc1BsYWNlZCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGVub3VnaCBzaGlwcyBvbiB0aGUgYm9hcmQhJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU0hJUFMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbGFjZVNoaXAsXHJcbiAgICByZW1vdmVTaGlwLFxyXG4gICAgcmVjZWl2ZUF0dGFjayxcclxuICAgIGdldEJvYXJkLFxyXG4gICAgY3RTaGlwcyxcclxuICAgIGFsbFNoaXBzU3VuayxcclxuICB9O1xyXG59XHJcblxyXG5jb25zdCBQbGF5ZXIgPSAoaHVtYW49dHJ1ZSkgPT4ge1xyXG4gIGNvbnN0IGlzSHVtYW4gPSAoKSA9PiBodW1hbjtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlzSHVtYW4sXHJcbiAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgU2hpcCxcclxuICBHYW1lYm9hcmQsXHJcbiAgUGxheWVyLFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCwgR2FtZWJvYXJkLCBQbGF5ZXIgfSBmcm9tICcuL2FwcCc7XHJcblxyXG5mdW5jdGlvbiBtYWluKCkge1xyXG4gIFxyXG4gIGNvbnN0IHAxID0gUGxheWVyKCk7XHJcbiAgY29uc3QgcDIgPSBQbGF5ZXIoZmFsc2UpO1xyXG5cclxuICBjb25zdCBwMUdCID0gR2FtZWJvYXJkKCk7XHJcbiAgY29uc3QgcDJHQiA9IEdhbWVib2FyZChmYWxzZSk7XHJcblxyXG4gIC8vIHAxIHNoaXBzXHJcbiAgY29uc3QgcDFDYXJyaWVyID0gU2hpcCgnY2FycmllcicpO1xyXG4gIGNvbnN0IHAxQmF0dGxlc2hpcCA9IFNoaXAoJ2JhdHRsZXNoaXAnKTtcclxuICBjb25zdCBwMUNydWlzZXIgPSBTaGlwKCdjcnVpc2VyJyk7XHJcbiAgY29uc3QgcDFTdWJtYXJpbmUgPSBTaGlwKCdzdWJtYXJpbmUnKTtcclxuICBjb25zdCBwMURlc3Ryb3llciA9IFNoaXAoJ2Rlc3Ryb3llcicpO1xyXG4gIC8vIHAyIHNoaXBzXHJcbiAgY29uc3QgcDJDYXJyaWVyID0gU2hpcCgnY2FycmllcicpO1xyXG4gIGNvbnN0IHAyQmF0dGxlc2hpcCA9IFNoaXAoJ2JhdHRsZXNoaXAnKTtcclxuICBjb25zdCBwMkNydWlzZXIgPSBTaGlwKCdjcnVpc2VyJyk7XHJcbiAgY29uc3QgcDJTdWJtYXJpbmUgPSBTaGlwKCdzdWJtYXJpbmUnKTtcclxuICBjb25zdCBwMkRlc3Ryb3llciA9IFNoaXAoJ2Rlc3Ryb3llcicpO1xyXG5cclxuICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzLCBkcmF3IERPTSBlbGVtZW50cyBldGMuXHJcbiAgY29uc29sZS5sb2cocDEuaXNIdW1hbigpKTtcclxufVxyXG5cclxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==