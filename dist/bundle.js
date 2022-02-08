/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzNCLG9CQUFvQiwwQ0FBSTtBQUN4QixzQkFBc0IsMENBQUk7QUFDMUIsc0JBQXNCLDBDQUFJO0FBQzFCO0FBQ0Esb0JBQW9CLDBDQUFJO0FBQ3hCLHVCQUF1QiwwQ0FBSTtBQUMzQixvQkFBb0IsMENBQUk7QUFDeEIsc0JBQXNCLDBDQUFJO0FBQzFCLHNCQUFzQiwwQ0FBSTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBJbiBvcmRlciBvZiBsYXJnZXN0IHRvIHNtYWxsZXN0OiBjYXJyaWVyICg1KSwgYmF0dGxlc2hpcCAoNCksIGNydWlzZXIgKDMpLCBzdWJtYXJpbmUgKDIpLCBhbmQgZGVzdHJveWVyICgxKVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIEhvcml6b250YWwgb3IgdmVydGljYWxcclxuICogQHJldHVybnMgU2hpcFxyXG4gKi9cclxuY29uc3QgU2hpcCA9ICh0eXBlLCBob3Jpem9udGFsPXRydWUpID0+IHtcclxuXHJcbiAgY29uc3QgZ2V0VHlwZSA9ICgpID0+IHR5cGU7XHJcbiAgbGV0IGh6ID0gaG9yaXpvbnRhbDtcclxuICBjb25zdCBpc0hvcml6b250YWwgPSAoKSA9PiBoejtcclxuICBjb25zdCB0b2dnbGVEaXJlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBoeiA9ICFoejtcclxuICAgIHJldHVybiBoejtcclxuICB9XHJcbiAgbGV0IGxlbmd0aDtcclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgJ2NhcnJpZXInOlxyXG4gICAgICBsZW5ndGggPSA1O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2JhdHRsZXNoaXAnOlxyXG4gICAgICBsZW5ndGggPSA0O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NydWlzZXInOlxyXG4gICAgICBsZW5ndGggPSAzO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3N1Ym1hcmluZSc6XHJcbiAgICAgIGxlbmd0aCA9IDM7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZGVzdHJveWVyJzpcclxuICAgICAgbGVuZ3RoID0gMjtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcclxuICAvLyBDcmVhdGUgYW4gYXJyYXkgb2YgJ3Bvc2l0aW9ucycgd2hlcmUgdGhlIHZhbHVlIGluIGVhY2ggJ3Bvc2l0aW9uJyBpbmRpY2F0ZXNcclxuICAvLyB3aGV0aGVyIG9yIG5vdCB0aGF0IHBvc2l0aW9uIGhhcyBiZWVuIGhpdFxyXG4gIC8vIGRlc3Ryb3llci5fcG9zaXRpb25zID0gW2ZhbHNlLCBmYWxzZV1cclxuICAvLyBkZXN0cm95ZXIuaGl0KDApID0+IFt0cnVlLCBmYWxzZV1cclxuICBjb25zdCBfcG9zaXRpb25zID0gQXJyYXkobGVuZ3RoKS5maWxsKGZhbHNlKTtcclxuICAvKipcclxuICAgKiBUYWtlcyBhbiBpbnRlZ2VyIGFuZCBtYXJrcyB0aGF0IHBvc2l0aW9uIG9mIGEgc2hpcCBhcyAnaGl0JyBieSBmaWxsaW5nIGluIHRoYXQgaW5kZXggd2l0aCB0cnVlXHJcbiAgICogQHBhcmFtIHtpbnR9IGhpdFBvcyBcclxuICAgKi9cclxuICBjb25zdCBoaXQgPSAoaGl0UG9zKSA9PiB7XHJcbiAgICBpZiAoaXNTdW5rKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHNoaXAgaXMgYWxyZWFkeSBzdW5rJyk7XHJcbiAgICB9IGVsc2UgaWYgKGhpdFBvcyA+PSBfcG9zaXRpb25zLmxlbmd0aCl7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZWdlciBwcm92aWRlZCB0byAuaGl0KCkgbXVzdCBiZSBsZXNzIHRoYW4gdGhlIGxlbmd0aCBvZiB0aGUgc2hpcCcpO1xyXG4gICAgfVxyXG4gICAgX3Bvc2l0aW9uc1toaXRQb3NdID0gdHJ1ZTtcclxuICAgIHJldHVybiBnZXRIaXRQb3NpdGlvbnMoKTtcclxuICB9XHJcbiAgY29uc3QgY291bnRIaXRzID0gKCkgPT4ge1xyXG4gICAgbGV0IGN0ID0gMDtcclxuICAgIF9wb3NpdGlvbnMuZm9yRWFjaChmdW5jdGlvbihfcG9zaXRpb24pIHtcclxuICAgICAgaWYgKF9wb3NpdGlvbikge1xyXG4gICAgICAgIGN0Kys7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjdDtcclxuICB9XHJcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGxlbmd0aCA9PT0gY291bnRIaXRzKCk7XHJcbiAgfVxyXG4gIGNvbnN0IGdldEhpdFBvc2l0aW9ucyA9ICgpID0+IHtcclxuICAgIGxldCBoaXRQb3NpdGlvbnMgPSBbXTtcclxuICAgIGxldCBwb3NpdGlvbjtcclxuICAgIGZvciAobGV0IGk9MDsgaSA8IF9wb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgcG9zaXRpb24gPSBfcG9zaXRpb25zW2ldO1xyXG4gICAgICBpZiAocG9zaXRpb24pIHtcclxuICAgICAgICBoaXRQb3NpdGlvbnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhpdFBvc2l0aW9ucztcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBnZXRUeXBlLCBcclxuICAgIGlzSG9yaXpvbnRhbCwgXHJcbiAgICBnZXRMZW5ndGgsXHJcbiAgICBoaXQsXHJcbiAgICBpc1N1bmssXHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtib29sZWFufSBodW1hbiBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5jb25zdCBHYW1lYm9hcmQgPSAoaHVtYW49dHJ1ZSkgPT4ge1xyXG4gIGNvbnN0IFNISVBTID0gW107XHJcbiAgY29uc3QgQk9BUkQgPSBbXHJcbiAgICAvLyByb3cgMVxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyAyIFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyAzIFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA0IFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA1IFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA2XHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDcgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDggXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDkgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDEwIFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICBdXHJcblxyXG4gIGNvbnN0IGdldEJvYXJkV2lkdGggPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gQk9BUkQubGVuZ3RoIC0gMTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBzdHJpbmcgZGVzY3JpcHRpb24gb2YgdGhlIHNoaXAgdG8gcmV0dXJuIGFuZCByZXR1cm5zIHRoYXQgc2hpcFxyXG4gICAqIGZvciB0aGlzIEdhbWVib2FyZCBvYmplY3RcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2hpcFR5cGUgXHJcbiAgICogQHJldHVybnMgW1NoaXAgb2JqZWN0XVxyXG4gICAqL1xyXG4gIGNvbnN0IGdldFNoaXAgPSAoc2hpcFR5cGUpID0+IHtcclxuICAgIGxldCByZXM7XHJcbiAgICBTSElQUy5mb3JFYWNoKGZ1bmN0aW9uKHNoaXApIHtcclxuICAgICAgaWYgKHNoaXAuZ2V0VHlwZSgpID09PSBzaGlwVHlwZSkge1xyXG4gICAgICAgIHJlcyA9IHNoaXA7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBhIHBhaXIgb2YgY29vcmRpbmF0ZXMgYWxyZWFkeSBjb250YWlucyBhIHNoaXAgcmVmZXJlbmNlXHJcbiAgICogQHBhcmFtIHtpbnR9IHJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gY29sIFxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgY29uc3QgY29udGFpbnNTaGlwID0gKHJvdywgY29sKSA9PiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIEJPQVJEW3Jvd11bY29sXVswXSA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBhIHBhaXIgb2YgY29vcmRpbmF0ZXMgdG8gc2VlIGlmIHRoZXkgYXJlIHdpdGhpbiBib3VuZHMgb2YgdGhlIGdhbWVib2FyZFxyXG4gICAqIEBwYXJhbSB7aW50fSByb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IGNvbCBcclxuICAgKiBAcmV0dXJucyBib29sZWFuXHJcbiAgICovXHJcbiAgY29uc3Qgb3V0T2ZCb3VuZHMgPSAocm93LCBjb2wpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkV2lkdGggPSBnZXRCb2FyZFdpZHRoKCk7XHJcbiAgICByZXR1cm4gKHJvdyA8IDAgfHwgcm93ID4gYm9hcmRXaWR0aCB8fCBjb2wgPCAwIHx8IGNvbCA+IGJvYXJkV2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBwYWlyIG9mIGdhbWVib2FyZCBjb29yZGluYXRlcyBhbmQgY2hlY2tzIHdoZXRoZXIgdGhlc2UgYW5kIGFueSBhZGRpdGlvbmFsIGltcGxpZWRcclxuICAgKiBzaGlwIGNvb3JkaW5hdGVzIChvbmVzIHRoYXQgd2lsbCBiZSBhY3RpdmF0ZWQgYmFzZWQgb24gdGhlIGxlbmd0aCBvZiB0aGUgc2hpcCkgYXJlXHJcbiAgICogd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIGJvYXJkIGFuZCBkbyBub3QgYWxyZWFkeSBjb250YWluIGEgc2hpcFxyXG4gICAqIEBwYXJhbSB7aW50fSBzdGFydFJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRDb2wgXHJcbiAgICogQHBhcmFtIHtTaGlwIG9iamVjdH0gc2hpcCBcclxuICAgKi9cclxuICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gKHN0YXJ0Um93LCBzdGFydENvbCwgc2hpcCkgPT4ge1xyXG4gICAgY29uc3QgaXNIb3Jpem9udGFsID0gc2hpcC5pc0hvcml6b250YWwoKTtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xyXG4gICAgbGV0IHJvdztcclxuICAgIGxldCBjb2w7XHJcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgICBmb3IgKGxldCBpPTA7IGkgPD0gc2hpcExlbmd0aC0xOyBpKyspIHtcclxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIHJvdyA9IHN0YXJ0Um93O1xyXG4gICAgICAgIGNvbCA9IHN0YXJ0Q29sICsgaTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByb3cgPSBzdGFydFJvdyArIGk7XHJcbiAgICAgICAgY29sID0gc3RhcnRDb2w7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChvdXRPZkJvdW5kcyhyb3csIGNvbCkgfHwgY29udGFpbnNTaGlwKHJvdywgY29sKSkge1xyXG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTsgIFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjdFNoaXBzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIFNISVBTLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldE1pc3NDb29yZGluYXRlcyA9ICgpID0+IHtcclxuICAgIC8vIGl0ZXJhdGUgcm93cyBmaXJzdFxyXG4gICAgY29uc3QgTUlTU0VTID0gW107XHJcbiAgICBjb25zdCBib2FyZFdpZHRoID0gZ2V0Qm9hcmRXaWR0aCgpO1xyXG4gICAgZm9yIChsZXQgcm93TnVtPTA7IHJvd051bSA8PSBib2FyZFdpZHRoOyByb3dOdW0rKykge1xyXG4gICAgICBmb3IgKGxldCBjb2xOdW09MDsgY29sTnVtIDw9IGJvYXJkV2lkdGg7IGNvbE51bSsrKSB7XHJcbiAgICAgICAgaWYgKEJPQVJEW3Jvd051bV1bY29sTnVtXVswXSA9PT0gJ21pc3MnKSB7XHJcbiAgICAgICAgICBNSVNTRVMucHVzaChbcm93TnVtLCBjb2xOdW1dKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBNSVNTRVM7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnYW1lYm9hcmRIYXNUaGlzU2hpcCA9IChzaGlwVHlwZSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xyXG4gICAgU0hJUFMuZm9yRWFjaChmdW5jdGlvbihTSElQKSB7XHJcbiAgICAgIGlmIChTSElQLmdldFR5cGUoKSA9PT0gc2hpcFR5cGUpIHtcclxuICAgICAgICByZXMgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBwYWlyIG9mIGNvb3JkaW5hdGVzLCBhbmQgbWFya3MgdGhvc2UgY29vcmRpbmF0ZXMgYXMgY29udGFpbmluZyBhIHNoaXBcclxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRSb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IHN0YXJ0Q29sIFxyXG4gICAqIEBwYXJhbSB7U2hpcCBvYmplY3R9IHNoaXAgXHJcbiAgICogQHJldHVybnMgQk9BUkRcclxuICAgKi9cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc3RhcnRSb3csIHN0YXJ0Q29sLCBzaGlwKSA9PiB7XHJcbiAgICBpZiAoZ2FtZWJvYXJkSGFzVGhpc1NoaXAoc2hpcC5nZXRUeXBlKCkpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvciAoJ1RoaXMgZ2FtZWJvYXJkIGFscmVhZHkgaGFzIHRoYXQgc2hpcCB0eXBlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoYWxsU2hpcHNQbGFjZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgKCdUaGVyZSBhcmUgYWxyZWFkeSA1IHNoaXBzIG9uIHRoaXMgYm9hcmQnKVxyXG4gICAgfVxyXG4gICAgY29uc3QgaXNIb3Jpem9udGFsID0gc2hpcC5pc0hvcml6b250YWwoKTtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xyXG4gICAgaWYgKHZhbGlkQ29vcmRpbmF0ZXMoc3RhcnRSb3csIHN0YXJ0Q29sLCBzaGlwKSkge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sO1xyXG4gICAgICBmb3IgKGxldCBpPTA7IGkgPD0gc2hpcExlbmd0aC0xOyBpKyspIHtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdztcclxuICAgICAgICAgIGNvbCA9IHN0YXJ0Q29sICsgaTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcm93ID0gc3RhcnRSb3cgKyBpO1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEJPQVJEW3Jvd11bY29sXVswXSA9IHtcclxuICAgICAgICAgIHNoaXBUeXBlOiBzaGlwLmdldFR5cGUoKSxcclxuICAgICAgICAgIHNoaXBQb3NpdGlvbjogaSxcclxuICAgICAgICAgIGlzSGl0OiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICB9O1xyXG4gICAgICBTSElQUy5wdXNoKHNoaXApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlU2hpcCA9IChzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApID0+IHtcclxuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHNoaXAuaXNIb3Jpem9udGFsKCk7XHJcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcclxuICAgIGlmIChjb250YWluc1NoaXAoc3RhcnRSb3csIHN0YXJ0Q29sLCBzaGlwKSkge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sO1xyXG4gICAgICBmb3IgKGxldCBpPTA7IGkgPD0gc2hpcExlbmd0aC0xOyBpKyspIHtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdztcclxuICAgICAgICAgIGNvbCA9IHN0YXJ0Q29sICsgaTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcm93ID0gc3RhcnRSb3cgKyBpO1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgc2hpcCByZWZlcmVuY2VzIGZyb20gdGhlIEdhbWVib2FyZC5CT0FSRCBhcnJheVxyXG4gICAgICAgIEJPQVJEW3Jvd11bY29sXS5wb3AoKTtcclxuICAgICAgfTtcclxuICAgICAgLy8gcmVtb3ZlIHRoZSBTaGlwIG9iamVjdCBmcm9tIHRoZSBHYW1lYm9hcmQuU0hJUFMgYXJyYXlcclxuICAgICAgZm9yIChsZXQgaT0wOyBpIDwgU0hJUFMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoU0hJUFNbaV0uZ2V0VHlwZSgpID09PSBzaGlwLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgU0hJUFMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBwYWlyIG9mIGNvb3JkaW5hdGVzIGFuZCB0ZXN0cyB0byBzZWUgaWYgdGhvc2UgY29vcmRpbmF0ZXMgcmV0cmlldmUgYW4gb2JqZWN0XHJcbiAgICogaWYgc28gLSBhIHNoaXAgcG9zaXRpb24gaXMgbG9jYXRlZCB0aGVyZVxyXG4gICAqIGlmIG5vdCAtIGEgc2hpcCBwb3NpdGlvbiBpcyBub3QgbG9jYXRlZCB0aGVyZSwgYW5kIHRoZXNlIGNvb3JkaW5hdGVzIHdpbGwgYmUgbG9nZ2VkIGFzIGEgbWlzc1xyXG4gICAqIEBwYXJhbSB7aW50fSByb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IGNvbCBcclxuICAgKi9cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sKSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0gQk9BUkRbcm93XVtjb2xdWzBdO1xyXG4gICAgLy8gaWYgdGhlc2UgY29vcmRpbmF0ZXMgY29udGFpbiBhbiBvYmplY3QsIHRoZSBvYmplY3QgaXMgdGhhdCB3aGljaCBjb250YWlucyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAvLyB7XHJcbiAgICAvLyAgc2hpcFR5cGU6ICdjYXJyaWVyJyB8fCAnYmF0dGxlc2hpcCcgfHwgJ2NydWlzZXInIHx8ICdzdWJtYXJpbmUnIHx8ICdkZXN0cm95ZXInXHJcbiAgICAvLyAgc2hpcFBvc2l0aW9uOiAwIHx8IDEgfHwgMiB8fCAzIHx8IDRcclxuICAgIC8vICBpc0hpdDogdHJ1ZSB8fCBmYWxzZVxyXG4gICAgLy8gfVxyXG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoaXRlbS5pc0hpdCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBzaGlwIGhhcyBhbHJlYWR5IGJlZW4gaGl0IGluIHRoaXMgbG9jYXRpb24hJyk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXAoaXRlbS5zaGlwVHlwZSk7XHJcbiAgICAgIGNvbnN0IGhpdFBvc2l0aW9uID0gaXRlbS5zaGlwUG9zaXRpb247XHJcbiAgICAgIHNoaXAuaGl0KGhpdFBvc2l0aW9uKTtcclxuICAgICAgaXRlbS5pc0hpdCA9IHRydWU7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgaXMgc3VuayBhbmQgZG8gc29tZXRoaW5nXHJcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XHJcbiAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlmIG5vIHNoaXAgaGVyZSwgbG9nIHRoZSBtaXNzXHJcbiAgICAgIEJPQVJEW3Jvd11bY29sXVswXSA9ICdtaXNzJztcclxuICAgIH1cclxuICAgIHJldHVybiBCT0FSRDtcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgYWxsU2hpcHNQbGFjZWQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gU0hJUFMubGVuZ3RoID09PSA1O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIGFsbCBzaGlwcyBhcmUgc3Vuaywgb3RoZXJ3aXNlIGZhbHNlXHJcbiAgICogQHJldHVybnMgYm9vbGVhblxyXG4gICAqL1xyXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcclxuICAgIGlmICghYWxsU2hpcHNQbGFjZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBlbm91Z2ggc2hpcHMgb24gdGhlIGJvYXJkIScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNISVBTLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGxhY2VTaGlwLFxyXG4gICAgcmVtb3ZlU2hpcCxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBnZXRCb2FyZCxcclxuICAgIGN0U2hpcHMsXHJcbiAgICBhbGxTaGlwc1N1bmssXHJcbiAgfTtcclxufVxyXG5cclxuY29uc3QgUGxheWVyID0gKGh1bWFuPXRydWUpID0+IHtcclxuICBjb25zdCBpc0h1bWFuID0gKCkgPT4gaHVtYW47XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc0h1bWFuLFxyXG4gIH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIFNoaXAsXHJcbiAgR2FtZWJvYXJkLFxyXG4gIFBsYXllcixcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyIH0gZnJvbSAnLi9hcHAnO1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBcclxuICBjb25zdCBwMSA9IFBsYXllcigpO1xyXG4gIGNvbnN0IHAyID0gUGxheWVyKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgcDFHQiA9IEdhbWVib2FyZCgpO1xyXG4gIGNvbnN0IHAyR0IgPSBHYW1lYm9hcmQoZmFsc2UpO1xyXG5cclxuICAvLyBwMSBzaGlwc1xyXG4gIGNvbnN0IHAxQ2FycmllciA9IFNoaXAoJ2NhcnJpZXInKTtcclxuICBjb25zdCBwMUJhdHRsZXNoaXAgPSBTaGlwKCdiYXR0bGVzaGlwJyk7XHJcbiAgY29uc3QgcDFDcnVpc2VyID0gU2hpcCgnY3J1aXNlcicpO1xyXG4gIGNvbnN0IHAxU3VibWFyaW5lID0gU2hpcCgnc3VibWFyaW5lJyk7XHJcbiAgY29uc3QgcDFEZXN0cm95ZXIgPSBTaGlwKCdkZXN0cm95ZXInKTtcclxuICAvLyBwMiBzaGlwc1xyXG4gIGNvbnN0IHAyQ2FycmllciA9IFNoaXAoJ2NhcnJpZXInKTtcclxuICBjb25zdCBwMkJhdHRsZXNoaXAgPSBTaGlwKCdiYXR0bGVzaGlwJyk7XHJcbiAgY29uc3QgcDJDcnVpc2VyID0gU2hpcCgnY3J1aXNlcicpO1xyXG4gIGNvbnN0IHAyU3VibWFyaW5lID0gU2hpcCgnc3VibWFyaW5lJyk7XHJcbiAgY29uc3QgcDJEZXN0cm95ZXIgPSBTaGlwKCdkZXN0cm95ZXInKTtcclxuXHJcbiAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycywgZHJhdyBET00gZWxlbWVudHMgZXRjLlxyXG4gIGNvbnNvbGUubG9nKHAxLmlzSHVtYW4oKSk7XHJcbn1cclxuXHJcbm1haW4oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=