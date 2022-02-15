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
    allShipsPlaced,
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


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const aiGameboardRowStr = '.gb-ai > .gb-row > #gb-ai-';
const humanGameboardRowStr = '.gb-human > .gb-row > #gb-human-';

function getClasses(element) {
  const classList = element.className.split(' ');
  return classList;
}
/**
 * Adds all classes in an array to a DOM node
 * @param {DOM Node} node 
 * @param {array} classes 
 * @returns DOM Node
 */
function classify(node, classes) {
  if (classes.length !== 0) {
    node.classList.add(...classes);
  }
  return node;
}

/**
 * Removes all classes in an array from a DOM node
 * @param {DOM Node} node
 * @param {array} classesToRemove 
 * @returns DOM Node
 */
function declassify(node, classesToRemove) {
  if (classesToRemove.length !== 0) {
    for (let i=0; i < classesToRemove.length; i++) {
      node.classList.remove(classesToRemove[i]);
    }
  }
  return node;
}

const toggleShipOrientation = (event) => {
  const shipNode = event.target.parentNode;
  shipNode.classList.toggle('vertical-ship');
}

const addShipListeners = () => {
  const ships = document.querySelectorAll('.ship-cells');
  ships.forEach(function(ship) {
    ship.addEventListener('click', toggleShipOrientation);
  })
}

const styleGameboard = (gameboardObj, human) => {
  const gameboard = gameboardObj.getBoard();
  const gameboardDOMBoards = document.querySelectorAll('.gb');
  let gameboardDOM;
  if (human) {
    gameboardDOM  = gameboardDOMBoards[0];
  } else {
    gameboardDOM = gameboardDOMBoards[1];
  }
  for (let rowNum=0; rowNum < gameboard.length; rowNum++) {
    for (let colNum=0; colNum < gameboard.length; colNum++) {
      // increment row num by one because first row is headers
      const gameboardDOMRow = gameboardDOM.querySelectorAll('.gb-row')[rowNum+1];
      const gameboardDOMCell = gameboardDOM.querySelectorAll('.gb-row')[rowNum+1].querySelectorAll('.gb-cell')[colNum];
      gameboardDOMCell.classList.remove('shadow');
      if (gameboardObj.containsShip(rowNum, colNum)) {
        gameboardDOMCell.classList.add('gb-cell-ship');
      }
    }
  }
}

/**
 * Takes a gameboard Object's board, loops through all the rows and columns to check if the contents of those cells are an object or a miss
 * If an object, the board will check if the ship position is hit and style appropriately
 * If the contents are a 'miss', then the appropriate style for misses will be applied
 * TODO: Depending on how long this process takes - it might better to have the .receiveAttack method instead send the results of the attack rather than the entire board
 * However, this would require redesigning the tests in place
 * If this were done instead, no looping would have to be done and the appropriate cell on the board could immediately be styled
 * @param {*} gameboard 
 * @param {*} isHuman 
 */
const updateGameboard = (gameboard, isHuman=false) => {
  let contents;
  let DOMGameboardRowStr = (isHuman) ? humanGameboardRowStr: aiGameboardRowStr;
  for (let rowNum=0; rowNum < gameboard.length; rowNum++) {
    for (let colNum=0; colNum < gameboard.length; colNum++) {
      contents = gameboard[rowNum][colNum][0];
      let DOMCell;
      DOMCell = document.querySelector(DOMGameboardRowStr+rowNum+colNum);
      if (typeof contents === 'object') {
        if (contents.isHit) {
          //style for hit here
          classify(DOMCell, ['hit']);
        }
      } else if (contents === 'miss') {
          classify(DOMCell, ['miss']);
      };
    };
  };
}

const setup = () => {
  addShipListeners();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setup,
  styleGameboard,
  updateGameboard,
});

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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



function main() {

  let p1;
  let p2;
  let p1Gameboard;
  let p2Gameboard;

  const aiAttemptedCoord = [];
  const humAttemptedCoord = [];

  const getAttackInfo = (e) => {
    const id = e.target.id;
    const rowAndCol = id.match(/[0-9]{2}/);
    
    const row = parseInt(rowAndCol[0][0]);
    const col = parseInt(rowAndCol[0][1]);
    return [row, col];
  }
  
  const getRandIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getRandAttackCoord = () => {
    let randRowNum;
    let randColNum;
    // ensures that the coordinates send are not ones that have already been tried
    // build in a step that will prevent an infinite loop from occurring if all possible occurences have been tried?
    do {
      randRowNum = getRandIntFromInterval(0, 9);
      randColNum = getRandIntFromInterval(0, 9);
    } while (aiAttemptedCoord.includes([randRowNum, randColNum]));
    return [randRowNum, randColNum];
  }

  const processAttack = (e) => {
    // first check if all human ships are placed - if not do not process anything
    if (!p1Gameboard.allShipsPlaced()) {
      return;
    };
    // HUMAN moves first
    let [aiRow, aiCol] = [...getAttackInfo(e)];
    const aiBoard = p1.sendAttack(aiRow, aiCol, p2Gameboard);
    // do something with the board here - probably apply classes that indicate whether or not a ship has been hit or if this was a miss
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].updateGameboard(aiBoard, false);
    // AI Moves second
    // have robot make randomized move here
    const [humRow, humCol] = [...getRandAttackCoord()];
    const humanBoard = p2.sendAttack(humRow, humCol, p1Gameboard);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].updateGameboard(humanBoard, true);
  }
  
  const addShipListeners = () => {
    function dragstart_handler(e) {
      e.dataTransfer.setData('text/plain', e.target.className)
    }

    const ships = document.querySelectorAll('.ship-cells');
    ships.forEach(function(ship) {
      ship.addEventListener('dragstart', dragstart_handler);
    })
  }

  const addGameboardListeners = () => {

    function dragover_handler(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      e.target.classList.add('shadow')
    }

    function dragleave_handler(e) {
      e.preventDefault();
      e.target.classList.remove('shadow');
    }

    function getCoordinatesFromID(id) {
      const num = id.match(/[0-9]{2}/);
      const [row, col] = [num[0][0], num[0][1]].map(function(xStr) {
        return parseInt(xStr);
      });
      return [row, col];
    }

    function drop_handler(e) {
      // get event info from dropped element - shipType, shipIsHorizontal, and coordinates (row, col numbers)
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      const classes = data.split(' ');
      const shipType = classes[1];
      let shipIsHorizontal;
      if (classes.length === 3) {
        shipIsHorizontal = false;
      } else {
        shipIsHorizontal = true;
      }
      const coordinates = getCoordinatesFromID(e.target.id);
      const [row, col] = [...coordinates];
      const prevShipCt = p1Gameboard.ctShips();
      p1.deployShip(row, col, shipType, shipIsHorizontal);
      const newShipCt = p1Gameboard.ctShips();
      // update the gameboard styling
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].styleGameboard(p1Gameboard, true);
      // update the ship staging area, if valid placement
      if (!(prevShipCt === newShipCt)) {
        document.querySelector('.ship-cells.' + shipType).classList.add('hide');
      };
    };
    // add human gameboard listeners
    const gbCellsHuman = document.querySelectorAll('.gb-cell-human');
    gbCellsHuman.forEach(function(gbCellHuman) {
      gbCellHuman.addEventListener('dragover', dragover_handler);
      gbCellHuman.addEventListener('dragleave', dragleave_handler);
      gbCellHuman.addEventListener('drop', drop_handler);
    })
    // add ai gameboard listeners
    const gbCellsAI = document.querySelectorAll('.gb-cell-ai');
    gbCellsAI.forEach(function(gbCellAI) {
      gbCellAI.addEventListener('click', processAttack);
    })
  }

  function startup() {
    // create Player objects (Gameboard objects now created as part of the players)
    p1 = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Player)();
    p2 = (0,_app__WEBPACK_IMPORTED_MODULE_0__.Player)(false);

    // place p2 (computer) ships
    p2.deployShip(0, 0, 'carrier');
    p2.deployShip(1, 0, 'battleship');
    p2.deployShip(2, 0, 'cruiser');
    p2.deployShip(3, 0, 'submarine');
    p2.deployShip(4, 0, 'destroyer');

    // use the gameboards to apply DOM styling
    // only human gamemboard will have visible styling - computer will just have classes but not look any different
    p1Gameboard = p1.getGameboard();
    p2Gameboard = p2.getGameboard();

    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].setup();
    addShipListeners();
    addGameboardListeners();
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].styleGameboard(p1Gameboard, true);

  }
  startup();
}

main();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEIsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEIsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixh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O0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0REFBbUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDREQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxFQUFFO0FBQ3BDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDJEQUFrQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw0Q0FBTTtBQUNmLFNBQVMsNENBQU07QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0RBQVM7QUFDYjtBQUNBO0FBQ0EsSUFBSSwyREFBa0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgSW4gb3JkZXIgb2YgbGFyZ2VzdCB0byBzbWFsbGVzdDogY2FycmllciAoNSksIGJhdHRsZXNoaXAgKDQpLCBjcnVpc2VyICgzKSwgc3VibWFyaW5lICgyKSwgYW5kIGRlc3Ryb3llciAoMSlcclxuICogQHBhcmFtIHtzdHJpbmd9IGRpcmVjdGlvbiBIb3Jpem9udGFsIG9yIHZlcnRpY2FsXHJcbiAqIEByZXR1cm5zIFNoaXBcclxuICovXHJcbmNvbnN0IFNoaXAgPSAodHlwZSwgaG9yaXpvbnRhbD10cnVlKSA9PiB7XHJcblxyXG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlO1xyXG4gIGxldCBoeiA9IGhvcml6b250YWw7XHJcbiAgY29uc3QgaXNIb3Jpem9udGFsID0gKCkgPT4gaHo7XHJcbiAgY29uc3QgdG9nZ2xlRGlyZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgaHogPSAhaHo7XHJcbiAgICByZXR1cm4gaHo7XHJcbiAgfVxyXG4gIGxldCBsZW5ndGg7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlICdjYXJyaWVyJzpcclxuICAgICAgbGVuZ3RoID0gNTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdiYXR0bGVzaGlwJzpcclxuICAgICAgbGVuZ3RoID0gNDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdjcnVpc2VyJzpcclxuICAgICAgbGVuZ3RoID0gMztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdzdWJtYXJpbmUnOlxyXG4gICAgICBsZW5ndGggPSAzO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2Rlc3Ryb3llcic6XHJcbiAgICAgIGxlbmd0aCA9IDI7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XHJcbiAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mICdwb3NpdGlvbnMnIHdoZXJlIHRoZSB2YWx1ZSBpbiBlYWNoICdwb3NpdGlvbicgaW5kaWNhdGVzXHJcbiAgLy8gd2hldGhlciBvciBub3QgdGhhdCBwb3NpdGlvbiBoYXMgYmVlbiBoaXRcclxuICAvLyBkZXN0cm95ZXIuX3Bvc2l0aW9ucyA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgLy8gZGVzdHJveWVyLmhpdCgwKSA9PiBbdHJ1ZSwgZmFsc2VdXHJcbiAgY29uc3QgX3Bvc2l0aW9ucyA9IEFycmF5KGxlbmd0aCkuZmlsbChmYWxzZSk7XHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYW4gaW50ZWdlciBhbmQgbWFya3MgdGhhdCBwb3NpdGlvbiBvZiBhIHNoaXAgYXMgJ2hpdCcgYnkgZmlsbGluZyBpbiB0aGF0IGluZGV4IHdpdGggdHJ1ZVxyXG4gICAqIEBwYXJhbSB7aW50fSBoaXRQb3MgXHJcbiAgICovXHJcbiAgY29uc3QgaGl0ID0gKGhpdFBvcykgPT4ge1xyXG4gICAgaWYgKGlzU3VuaygpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBzaGlwIGlzIGFscmVhZHkgc3VuaycpO1xyXG4gICAgfSBlbHNlIGlmIChoaXRQb3MgPj0gX3Bvc2l0aW9ucy5sZW5ndGgpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludGVnZXIgcHJvdmlkZWQgdG8gLmhpdCgpIG11c3QgYmUgbGVzcyB0aGFuIHRoZSBsZW5ndGggb2YgdGhlIHNoaXAnKTtcclxuICAgIH1cclxuICAgIF9wb3NpdGlvbnNbaGl0UG9zXSA9IHRydWU7XHJcbiAgICByZXR1cm4gZ2V0SGl0UG9zaXRpb25zKCk7XHJcbiAgfVxyXG4gIGNvbnN0IGNvdW50SGl0cyA9ICgpID0+IHtcclxuICAgIGxldCBjdCA9IDA7XHJcbiAgICBfcG9zaXRpb25zLmZvckVhY2goZnVuY3Rpb24oX3Bvc2l0aW9uKSB7XHJcbiAgICAgIGlmIChfcG9zaXRpb24pIHtcclxuICAgICAgICBjdCsrO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY3Q7XHJcbiAgfVxyXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcclxuICAgIHJldHVybiBsZW5ndGggPT09IGNvdW50SGl0cygpO1xyXG4gIH1cclxuICBjb25zdCBnZXRIaXRQb3NpdGlvbnMgPSAoKSA9PiB7XHJcbiAgICBsZXQgaGl0UG9zaXRpb25zID0gW107XHJcbiAgICBsZXQgcG9zaXRpb247XHJcbiAgICBmb3IgKGxldCBpPTA7IGkgPCBfcG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBvc2l0aW9uID0gX3Bvc2l0aW9uc1tpXTtcclxuICAgICAgaWYgKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgaGl0UG9zaXRpb25zLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoaXRQb3NpdGlvbnM7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ2V0VHlwZSwgXHJcbiAgICBpc0hvcml6b250YWwsXHJcbiAgICB0b2dnbGVEaXJlY3Rpb24sXHJcbiAgICBnZXRMZW5ndGgsXHJcbiAgICBoaXQsXHJcbiAgICBpc1N1bmssXHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtib29sZWFufSBodW1hbiBcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5jb25zdCBHYW1lYm9hcmQgPSAoaHVtYW49dHJ1ZSkgPT4ge1xyXG4gIGNvbnN0IFNISVBTID0gW107XHJcbiAgY29uc3QgQk9BUkQgPSBbXHJcbiAgICAvLyByb3cgMVxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyAyIFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyAzIFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA0IFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA1IFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA2XHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDcgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDggXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDkgXHJcbiAgICBbXHJcbiAgICAgIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXHJcbiAgICBdLFxyXG4gICAgLy8gcm93IDEwIFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICBdXHJcblxyXG4gIGNvbnN0IGdldEJvYXJkV2lkdGggPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gQk9BUkQubGVuZ3RoIC0gMTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBzdHJpbmcgZGVzY3JpcHRpb24gb2YgdGhlIHNoaXAgdG8gcmV0dXJuIGFuZCByZXR1cm5zIHRoYXQgc2hpcFxyXG4gICAqIGZvciB0aGlzIEdhbWVib2FyZCBvYmplY3RcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2hpcFR5cGUgXHJcbiAgICogQHJldHVybnMgW1NoaXAgb2JqZWN0XVxyXG4gICAqL1xyXG4gIGNvbnN0IGdldFNoaXAgPSAoc2hpcFR5cGUpID0+IHtcclxuICAgIGxldCByZXM7XHJcbiAgICBTSElQUy5mb3JFYWNoKGZ1bmN0aW9uKHNoaXApIHtcclxuICAgICAgaWYgKHNoaXAuZ2V0VHlwZSgpID09PSBzaGlwVHlwZSkge1xyXG4gICAgICAgIHJlcyA9IHNoaXA7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBhIHBhaXIgb2YgY29vcmRpbmF0ZXMgYWxyZWFkeSBjb250YWlucyBhIHNoaXAgcmVmZXJlbmNlXHJcbiAgICogQHBhcmFtIHtpbnR9IHJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gY29sIFxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgY29uc3QgY29udGFpbnNTaGlwID0gKHJvdywgY29sKSA9PiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIEJPQVJEW3Jvd11bY29sXVswXSA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBhIHBhaXIgb2YgY29vcmRpbmF0ZXMgdG8gc2VlIGlmIHRoZXkgYXJlIHdpdGhpbiBib3VuZHMgb2YgdGhlIGdhbWVib2FyZFxyXG4gICAqIEBwYXJhbSB7aW50fSByb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IGNvbCBcclxuICAgKiBAcmV0dXJucyBib29sZWFuXHJcbiAgICovXHJcbiAgY29uc3Qgb3V0T2ZCb3VuZHMgPSAocm93LCBjb2wpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkV2lkdGggPSBnZXRCb2FyZFdpZHRoKCk7XHJcbiAgICByZXR1cm4gKHJvdyA8IDAgfHwgcm93ID4gYm9hcmRXaWR0aCB8fCBjb2wgPCAwIHx8IGNvbCA+IGJvYXJkV2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBwYWlyIG9mIGdhbWVib2FyZCBjb29yZGluYXRlcyBhbmQgY2hlY2tzIHdoZXRoZXIgdGhlc2UgYW5kIGFueSBhZGRpdGlvbmFsIGltcGxpZWRcclxuICAgKiBzaGlwIGNvb3JkaW5hdGVzIChvbmVzIHRoYXQgd2lsbCBiZSBhY3RpdmF0ZWQgYmFzZWQgb24gdGhlIGxlbmd0aCBvZiB0aGUgc2hpcCkgYXJlXHJcbiAgICogd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIGJvYXJkIGFuZCBkbyBub3QgYWxyZWFkeSBjb250YWluIGEgc2hpcFxyXG4gICAqIEBwYXJhbSB7aW50fSBzdGFydFJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRDb2wgXHJcbiAgICogQHBhcmFtIHtTaGlwIG9iamVjdH0gc2hpcCBcclxuICAgKi9cclxuICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gKHN0YXJ0Um93LCBzdGFydENvbCwgc2hpcCkgPT4ge1xyXG4gICAgY29uc3QgaXNIb3Jpem9udGFsID0gc2hpcC5pc0hvcml6b250YWwoKTtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xyXG4gICAgbGV0IHJvdztcclxuICAgIGxldCBjb2w7XHJcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgICBmb3IgKGxldCBpPTA7IGkgPD0gc2hpcExlbmd0aC0xOyBpKyspIHtcclxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIHJvdyA9IHN0YXJ0Um93O1xyXG4gICAgICAgIGNvbCA9IHN0YXJ0Q29sICsgaTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByb3cgPSBzdGFydFJvdyArIGk7XHJcbiAgICAgICAgY29sID0gc3RhcnRDb2w7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChvdXRPZkJvdW5kcyhyb3csIGNvbCkgfHwgY29udGFpbnNTaGlwKHJvdywgY29sKSkge1xyXG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTsgIFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjdFNoaXBzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIFNISVBTLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdhbWVib2FyZEhhc1RoaXNTaGlwID0gKHNoaXBUeXBlKSA9PiB7XHJcbiAgICBsZXQgcmVzID0gZmFsc2U7XHJcbiAgICBTSElQUy5mb3JFYWNoKGZ1bmN0aW9uKFNISVApIHtcclxuICAgICAgaWYgKFNISVAuZ2V0VHlwZSgpID09PSBzaGlwVHlwZSkge1xyXG4gICAgICAgIHJlcyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBUYWtlcyBhIHBhaXIgb2YgY29vcmRpbmF0ZXMsIGFuZCBtYXJrcyB0aG9zZSBjb29yZGluYXRlcyBhcyBjb250YWluaW5nIGEgc2hpcFxyXG4gICAqIEBwYXJhbSB7aW50fSBzdGFydFJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRDb2wgXHJcbiAgICogQHBhcmFtIHtTaGlwIG9iamVjdH0gc2hpcCBcclxuICAgKiBAcmV0dXJucyBCT0FSRFxyXG4gICAqL1xyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApID0+IHtcclxuICAgIGlmIChnYW1lYm9hcmRIYXNUaGlzU2hpcChzaGlwLmdldFR5cGUoKSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yICgnVGhpcyBnYW1lYm9hcmQgYWxyZWFkeSBoYXMgdGhhdCBzaGlwIHR5cGUnKTtcclxuICAgIH1cclxuICAgIGlmIChhbGxTaGlwc1BsYWNlZCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvciAoJ1RoZXJlIGFyZSBhbHJlYWR5IDUgc2hpcHMgb24gdGhpcyBib2FyZCcpXHJcbiAgICB9XHJcbiAgICBjb25zdCBpc0hvcml6b250YWwgPSBzaGlwLmlzSG9yaXpvbnRhbCgpO1xyXG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XHJcbiAgICBpZiAodmFsaWRDb29yZGluYXRlcyhzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApKSB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2w7XHJcbiAgICAgIGZvciAobGV0IGk9MDsgaSA8PSBzaGlwTGVuZ3RoLTE7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHJvdyA9IHN0YXJ0Um93O1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2wgKyBpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdyArIGk7XHJcbiAgICAgICAgICBjb2wgPSBzdGFydENvbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgQk9BUkRbcm93XVtjb2xdWzBdID0ge1xyXG4gICAgICAgICAgc2hpcFR5cGU6IHNoaXAuZ2V0VHlwZSgpLFxyXG4gICAgICAgICAgc2hpcFBvc2l0aW9uOiBpLFxyXG4gICAgICAgICAgaXNIaXQ6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcbiAgICAgIFNISVBTLnB1c2goc2hpcCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQk9BUkQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW1vdmVTaGlwID0gKHN0YXJ0Um93LCBzdGFydENvbCwgc2hpcCkgPT4ge1xyXG4gICAgY29uc3QgaXNIb3Jpem9udGFsID0gc2hpcC5pc0hvcml6b250YWwoKTtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xyXG4gICAgaWYgKGNvbnRhaW5zU2hpcChzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApKSB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2w7XHJcbiAgICAgIGZvciAobGV0IGk9MDsgaSA8PSBzaGlwTGVuZ3RoLTE7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHJvdyA9IHN0YXJ0Um93O1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2wgKyBpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdyArIGk7XHJcbiAgICAgICAgICBjb2wgPSBzdGFydENvbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBzaGlwIHJlZmVyZW5jZXMgZnJvbSB0aGUgR2FtZWJvYXJkLkJPQVJEIGFycmF5XHJcbiAgICAgICAgQk9BUkRbcm93XVtjb2xdLnBvcCgpO1xyXG4gICAgICB9O1xyXG4gICAgICAvLyByZW1vdmUgdGhlIFNoaXAgb2JqZWN0IGZyb20gdGhlIEdhbWVib2FyZC5TSElQUyBhcnJheVxyXG4gICAgICBmb3IgKGxldCBpPTA7IGkgPCBTSElQUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChTSElQU1tpXS5nZXRUeXBlKCkgPT09IHNoaXAuZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICBTSElQUy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQk9BUkQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhIHBhaXIgb2YgY29vcmRpbmF0ZXMgYW5kIHRlc3RzIHRvIHNlZSBpZiB0aG9zZSBjb29yZGluYXRlcyByZXRyaWV2ZSBhbiBvYmplY3RcclxuICAgKiBpZiBzbyAtIGEgc2hpcCBwb3NpdGlvbiBpcyBsb2NhdGVkIHRoZXJlXHJcbiAgICogaWYgbm90IC0gYSBzaGlwIHBvc2l0aW9uIGlzIG5vdCBsb2NhdGVkIHRoZXJlLCBhbmQgdGhlc2UgY29vcmRpbmF0ZXMgd2lsbCBiZSBsb2dnZWQgYXMgYSBtaXNzXHJcbiAgICogQHBhcmFtIHtpbnR9IHJvdyBcclxuICAgKiBAcGFyYW0ge2ludH0gY29sIFxyXG4gICAqL1xyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2wpID0+IHtcclxuICAgIGNvbnN0IGl0ZW0gPSBCT0FSRFtyb3ddW2NvbF1bMF07XHJcbiAgICAvLyBpZiB0aGVzZSBjb29yZGluYXRlcyBjb250YWluIGFuIG9iamVjdCwgdGhlIG9iamVjdCBpcyB0aGF0IHdoaWNoIGNvbnRhaW5zIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgIC8vIHtcclxuICAgIC8vICBzaGlwVHlwZTogJ2NhcnJpZXInIHx8ICdiYXR0bGVzaGlwJyB8fCAnY3J1aXNlcicgfHwgJ3N1Ym1hcmluZScgfHwgJ2Rlc3Ryb3llcidcclxuICAgIC8vICBzaGlwUG9zaXRpb246IDAgfHwgMSB8fCAyIHx8IDMgfHwgNFxyXG4gICAgLy8gIGlzSGl0OiB0cnVlIHx8IGZhbHNlXHJcbiAgICAvLyB9XHJcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmIChpdGVtLmlzSGl0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHNoaXAgaGFzIGFscmVhZHkgYmVlbiBoaXQgaW4gdGhpcyBsb2NhdGlvbiEnKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcChpdGVtLnNoaXBUeXBlKTtcclxuICAgICAgY29uc3QgaGl0UG9zaXRpb24gPSBpdGVtLnNoaXBQb3NpdGlvbjtcclxuICAgICAgc2hpcC5oaXQoaGl0UG9zaXRpb24pO1xyXG4gICAgICBpdGVtLmlzSGl0ID0gdHJ1ZTtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBpcyBzdW5rIGFuZCBkbyBzb21ldGhpbmdcclxuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcclxuICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gaWYgbm8gc2hpcCBoZXJlLCBsb2cgdGhlIG1pc3NcclxuICAgICAgQk9BUkRbcm93XVtjb2xdWzBdID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBhbGxTaGlwc1BsYWNlZCA9ICgpID0+IHtcclxuICAgIHJldHVybiBTSElQUy5sZW5ndGggPT09IDU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgYWxsIHNoaXBzIGFyZSBzdW5rLCBvdGhlcndpc2UgZmFsc2VcclxuICAgKiBAcmV0dXJucyBib29sZWFuXHJcbiAgICovXHJcbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xyXG4gICAgaWYgKCFhbGxTaGlwc1BsYWNlZCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGVub3VnaCBzaGlwcyBvbiB0aGUgYm9hcmQhJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU0hJUFMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbGFjZVNoaXAsXHJcbiAgICByZW1vdmVTaGlwLFxyXG4gICAgcmVjZWl2ZUF0dGFjayxcclxuICAgIGdldEJvYXJkLFxyXG4gICAgY3RTaGlwcyxcclxuICAgIGFsbFNoaXBzUGxhY2VkLFxyXG4gICAgYWxsU2hpcHNTdW5rLFxyXG4gICAgY29udGFpbnNTaGlwLFxyXG4gIH07XHJcbn1cclxuXHJcbmNvbnN0IFBsYXllciA9IChodW1hbj10cnVlKSA9PiB7XHJcbiAgY29uc3QgaXNIdW1hbiA9ICgpID0+IGh1bWFuO1xyXG4gIC8vIGNyZWF0ZSBHYW1lYm9hcmRcclxuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoaHVtYW4pO1xyXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+IGdhbWVib2FyZDtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgUGxheWVyLXNwZWNpZmljIHNoaXBcclxuICAgKiBAcGFyYW0geydjYXJyaWVyJyB8fCAnYmF0dGxlc2hpcCcgfHwgJ2NydWlzZXInIHx8ICdzdWJtYXJpbmUnIHx8ICdkZXN0cm95ZXInfSBzaGlwVHlwZSBcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzSG9yaXpvbnRhbCBcclxuICAgKiBAcmV0dXJucyBbU2hpcCBvYmplY3RdXHJcbiAgICovXHJcbiAgY29uc3QgY3JlYXRlU2hpcCA9IChzaGlwVHlwZSwgaXNIb3Jpem9udGFsPXRydWUpID0+IHtcclxuICAgIHJldHVybiBTaGlwKHNoaXBUeXBlLCBpc0hvcml6b250YWwpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuZCBwbGFjZXMgYSBzaGlwIG9uIGEgUGxheWVyJ3MgR2FtZWJvYXJkIGF0IHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZXMgYW5kIG9yaWVudGF0aW9uXHJcbiAgICogQHBhcmFtIHtpbnR9IHJvd051bSBcclxuICAgKiBAcGFyYW0ge2ludH0gY29sTnVtIFxyXG4gICAqIEBwYXJhbSB7J2NhcnJpZXInIHx8ICdiYXR0bGVzaGlwJyB8fCAnY3J1aXNlcicgfHwgJ3N1Ym1hcmluZScgfHwgJ2Rlc3Ryb3llcid9IHNoaXBUeXBlIFxyXG4gICAqIEByZXR1cm5zIFxyXG4gICAqL1xyXG4gIGNvbnN0IGRlcGxveVNoaXAgPSAocm93TnVtLCBjb2xOdW0sIHNoaXBUeXBlLCBpc0hvcml6b250YWwpID0+IHtcclxuICAgIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwKHNoaXBUeXBlLCBpc0hvcml6b250YWwpO1xyXG4gICAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQucGxhY2VTaGlwKHJvd051bSwgY29sTnVtLCBzaGlwKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNlbmRBdHRhY2sgPSAocm93TnVtLCBjb2xOdW0sIGdiKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZCA9IGdiLnJlY2VpdmVBdHRhY2socm93TnVtLCBjb2xOdW0pO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlzSHVtYW4sXHJcbiAgICBjcmVhdGVTaGlwLFxyXG4gICAgZGVwbG95U2hpcCxcclxuICAgIGdldEdhbWVib2FyZCxcclxuICAgIHNlbmRBdHRhY2ssXHJcbiAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgU2hpcCxcclxuICBHYW1lYm9hcmQsXHJcbiAgUGxheWVyLFxyXG59O1xyXG4iLCJjb25zdCBhaUdhbWVib2FyZFJvd1N0ciA9ICcuZ2ItYWkgPiAuZ2Itcm93ID4gI2diLWFpLSc7XHJcbmNvbnN0IGh1bWFuR2FtZWJvYXJkUm93U3RyID0gJy5nYi1odW1hbiA+IC5nYi1yb3cgPiAjZ2ItaHVtYW4tJztcclxuXHJcbmZ1bmN0aW9uIGdldENsYXNzZXMoZWxlbWVudCkge1xyXG4gIGNvbnN0IGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIGNsYXNzTGlzdDtcclxufVxyXG4vKipcclxuICogQWRkcyBhbGwgY2xhc3NlcyBpbiBhbiBhcnJheSB0byBhIERPTSBub2RlXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IG5vZGUgXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGNsYXNzZXMgXHJcbiAqIEByZXR1cm5zIERPTSBOb2RlXHJcbiAqL1xyXG5mdW5jdGlvbiBjbGFzc2lmeShub2RlLCBjbGFzc2VzKSB7XHJcbiAgaWYgKGNsYXNzZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICBub2RlLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbGwgY2xhc3NlcyBpbiBhbiBhcnJheSBmcm9tIGEgRE9NIG5vZGVcclxuICogQHBhcmFtIHtET00gTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge2FycmF5fSBjbGFzc2VzVG9SZW1vdmUgXHJcbiAqIEByZXR1cm5zIERPTSBOb2RlXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWNsYXNzaWZ5KG5vZGUsIGNsYXNzZXNUb1JlbW92ZSkge1xyXG4gIGlmIChjbGFzc2VzVG9SZW1vdmUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICBmb3IgKGxldCBpPTA7IGkgPCBjbGFzc2VzVG9SZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXNUb1JlbW92ZVtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5jb25zdCB0b2dnbGVTaGlwT3JpZW50YXRpb24gPSAoZXZlbnQpID0+IHtcclxuICBjb25zdCBzaGlwTm9kZSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xyXG4gIHNoaXBOb2RlLmNsYXNzTGlzdC50b2dnbGUoJ3ZlcnRpY2FsLXNoaXAnKTtcclxufVxyXG5cclxuY29uc3QgYWRkU2hpcExpc3RlbmVycyA9ICgpID0+IHtcclxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLWNlbGxzJyk7XHJcbiAgc2hpcHMuZm9yRWFjaChmdW5jdGlvbihzaGlwKSB7XHJcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2hpcE9yaWVudGF0aW9uKTtcclxuICB9KVxyXG59XHJcblxyXG5jb25zdCBzdHlsZUdhbWVib2FyZCA9IChnYW1lYm9hcmRPYmosIGh1bWFuKSA9PiB7XHJcbiAgY29uc3QgZ2FtZWJvYXJkID0gZ2FtZWJvYXJkT2JqLmdldEJvYXJkKCk7XHJcbiAgY29uc3QgZ2FtZWJvYXJkRE9NQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdiJyk7XHJcbiAgbGV0IGdhbWVib2FyZERPTTtcclxuICBpZiAoaHVtYW4pIHtcclxuICAgIGdhbWVib2FyZERPTSAgPSBnYW1lYm9hcmRET01Cb2FyZHNbMF07XHJcbiAgfSBlbHNlIHtcclxuICAgIGdhbWVib2FyZERPTSA9IGdhbWVib2FyZERPTUJvYXJkc1sxXTtcclxuICB9XHJcbiAgZm9yIChsZXQgcm93TnVtPTA7IHJvd051bSA8IGdhbWVib2FyZC5sZW5ndGg7IHJvd051bSsrKSB7XHJcbiAgICBmb3IgKGxldCBjb2xOdW09MDsgY29sTnVtIDwgZ2FtZWJvYXJkLmxlbmd0aDsgY29sTnVtKyspIHtcclxuICAgICAgLy8gaW5jcmVtZW50IHJvdyBudW0gYnkgb25lIGJlY2F1c2UgZmlyc3Qgcm93IGlzIGhlYWRlcnNcclxuICAgICAgY29uc3QgZ2FtZWJvYXJkRE9NUm93ID0gZ2FtZWJvYXJkRE9NLnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYi1yb3cnKVtyb3dOdW0rMV07XHJcbiAgICAgIGNvbnN0IGdhbWVib2FyZERPTUNlbGwgPSBnYW1lYm9hcmRET00ucXVlcnlTZWxlY3RvckFsbCgnLmdiLXJvdycpW3Jvd051bSsxXS5xdWVyeVNlbGVjdG9yQWxsKCcuZ2ItY2VsbCcpW2NvbE51bV07XHJcbiAgICAgIGdhbWVib2FyZERPTUNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hhZG93Jyk7XHJcbiAgICAgIGlmIChnYW1lYm9hcmRPYmouY29udGFpbnNTaGlwKHJvd051bSwgY29sTnVtKSkge1xyXG4gICAgICAgIGdhbWVib2FyZERPTUNlbGwuY2xhc3NMaXN0LmFkZCgnZ2ItY2VsbC1zaGlwJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIGdhbWVib2FyZCBPYmplY3QncyBib2FyZCwgbG9vcHMgdGhyb3VnaCBhbGwgdGhlIHJvd3MgYW5kIGNvbHVtbnMgdG8gY2hlY2sgaWYgdGhlIGNvbnRlbnRzIG9mIHRob3NlIGNlbGxzIGFyZSBhbiBvYmplY3Qgb3IgYSBtaXNzXHJcbiAqIElmIGFuIG9iamVjdCwgdGhlIGJvYXJkIHdpbGwgY2hlY2sgaWYgdGhlIHNoaXAgcG9zaXRpb24gaXMgaGl0IGFuZCBzdHlsZSBhcHByb3ByaWF0ZWx5XHJcbiAqIElmIHRoZSBjb250ZW50cyBhcmUgYSAnbWlzcycsIHRoZW4gdGhlIGFwcHJvcHJpYXRlIHN0eWxlIGZvciBtaXNzZXMgd2lsbCBiZSBhcHBsaWVkXHJcbiAqIFRPRE86IERlcGVuZGluZyBvbiBob3cgbG9uZyB0aGlzIHByb2Nlc3MgdGFrZXMgLSBpdCBtaWdodCBiZXR0ZXIgdG8gaGF2ZSB0aGUgLnJlY2VpdmVBdHRhY2sgbWV0aG9kIGluc3RlYWQgc2VuZCB0aGUgcmVzdWx0cyBvZiB0aGUgYXR0YWNrIHJhdGhlciB0aGFuIHRoZSBlbnRpcmUgYm9hcmRcclxuICogSG93ZXZlciwgdGhpcyB3b3VsZCByZXF1aXJlIHJlZGVzaWduaW5nIHRoZSB0ZXN0cyBpbiBwbGFjZVxyXG4gKiBJZiB0aGlzIHdlcmUgZG9uZSBpbnN0ZWFkLCBubyBsb29waW5nIHdvdWxkIGhhdmUgdG8gYmUgZG9uZSBhbmQgdGhlIGFwcHJvcHJpYXRlIGNlbGwgb24gdGhlIGJvYXJkIGNvdWxkIGltbWVkaWF0ZWx5IGJlIHN0eWxlZFxyXG4gKiBAcGFyYW0geyp9IGdhbWVib2FyZCBcclxuICogQHBhcmFtIHsqfSBpc0h1bWFuIFxyXG4gKi9cclxuY29uc3QgdXBkYXRlR2FtZWJvYXJkID0gKGdhbWVib2FyZCwgaXNIdW1hbj1mYWxzZSkgPT4ge1xyXG4gIGxldCBjb250ZW50cztcclxuICBsZXQgRE9NR2FtZWJvYXJkUm93U3RyID0gKGlzSHVtYW4pID8gaHVtYW5HYW1lYm9hcmRSb3dTdHI6IGFpR2FtZWJvYXJkUm93U3RyO1xyXG4gIGZvciAobGV0IHJvd051bT0wOyByb3dOdW0gPCBnYW1lYm9hcmQubGVuZ3RoOyByb3dOdW0rKykge1xyXG4gICAgZm9yIChsZXQgY29sTnVtPTA7IGNvbE51bSA8IGdhbWVib2FyZC5sZW5ndGg7IGNvbE51bSsrKSB7XHJcbiAgICAgIGNvbnRlbnRzID0gZ2FtZWJvYXJkW3Jvd051bV1bY29sTnVtXVswXTtcclxuICAgICAgbGV0IERPTUNlbGw7XHJcbiAgICAgIERPTUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKERPTUdhbWVib2FyZFJvd1N0cityb3dOdW0rY29sTnVtKTtcclxuICAgICAgaWYgKHR5cGVvZiBjb250ZW50cyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBpZiAoY29udGVudHMuaXNIaXQpIHtcclxuICAgICAgICAgIC8vc3R5bGUgZm9yIGhpdCBoZXJlXHJcbiAgICAgICAgICBjbGFzc2lmeShET01DZWxsLCBbJ2hpdCddKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoY29udGVudHMgPT09ICdtaXNzJykge1xyXG4gICAgICAgICAgY2xhc3NpZnkoRE9NQ2VsbCwgWydtaXNzJ10pO1xyXG4gICAgICB9O1xyXG4gICAgfTtcclxuICB9O1xyXG59XHJcblxyXG5jb25zdCBzZXR1cCA9ICgpID0+IHtcclxuICBhZGRTaGlwTGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXR1cCxcclxuICBzdHlsZUdhbWVib2FyZCxcclxuICB1cGRhdGVHYW1lYm9hcmQsXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9hcHAnO1xyXG5pbXBvcnQgRE9NIGZyb20gJy4vZG9tJztcclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcblxyXG4gIGxldCBwMTtcclxuICBsZXQgcDI7XHJcbiAgbGV0IHAxR2FtZWJvYXJkO1xyXG4gIGxldCBwMkdhbWVib2FyZDtcclxuXHJcbiAgY29uc3QgYWlBdHRlbXB0ZWRDb29yZCA9IFtdO1xyXG4gIGNvbnN0IGh1bUF0dGVtcHRlZENvb3JkID0gW107XHJcblxyXG4gIGNvbnN0IGdldEF0dGFja0luZm8gPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBlLnRhcmdldC5pZDtcclxuICAgIGNvbnN0IHJvd0FuZENvbCA9IGlkLm1hdGNoKC9bMC05XXsyfS8pO1xyXG4gICAgXHJcbiAgICBjb25zdCByb3cgPSBwYXJzZUludChyb3dBbmRDb2xbMF1bMF0pO1xyXG4gICAgY29uc3QgY29sID0gcGFyc2VJbnQocm93QW5kQ29sWzBdWzFdKTtcclxuICAgIHJldHVybiBbcm93LCBjb2xdO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBnZXRSYW5kSW50RnJvbUludGVydmFsID0gKG1pbiwgbWF4KSA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldFJhbmRBdHRhY2tDb29yZCA9ICgpID0+IHtcclxuICAgIGxldCByYW5kUm93TnVtO1xyXG4gICAgbGV0IHJhbmRDb2xOdW07XHJcbiAgICAvLyBlbnN1cmVzIHRoYXQgdGhlIGNvb3JkaW5hdGVzIHNlbmQgYXJlIG5vdCBvbmVzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gdHJpZWRcclxuICAgIC8vIGJ1aWxkIGluIGEgc3RlcCB0aGF0IHdpbGwgcHJldmVudCBhbiBpbmZpbml0ZSBsb29wIGZyb20gb2NjdXJyaW5nIGlmIGFsbCBwb3NzaWJsZSBvY2N1cmVuY2VzIGhhdmUgYmVlbiB0cmllZD9cclxuICAgIGRvIHtcclxuICAgICAgcmFuZFJvd051bSA9IGdldFJhbmRJbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XHJcbiAgICAgIHJhbmRDb2xOdW0gPSBnZXRSYW5kSW50RnJvbUludGVydmFsKDAsIDkpO1xyXG4gICAgfSB3aGlsZSAoYWlBdHRlbXB0ZWRDb29yZC5pbmNsdWRlcyhbcmFuZFJvd051bSwgcmFuZENvbE51bV0pKTtcclxuICAgIHJldHVybiBbcmFuZFJvd051bSwgcmFuZENvbE51bV07XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9jZXNzQXR0YWNrID0gKGUpID0+IHtcclxuICAgIC8vIGZpcnN0IGNoZWNrIGlmIGFsbCBodW1hbiBzaGlwcyBhcmUgcGxhY2VkIC0gaWYgbm90IGRvIG5vdCBwcm9jZXNzIGFueXRoaW5nXHJcbiAgICBpZiAoIXAxR2FtZWJvYXJkLmFsbFNoaXBzUGxhY2VkKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vIEhVTUFOIG1vdmVzIGZpcnN0XHJcbiAgICBsZXQgW2FpUm93LCBhaUNvbF0gPSBbLi4uZ2V0QXR0YWNrSW5mbyhlKV07XHJcbiAgICBjb25zdCBhaUJvYXJkID0gcDEuc2VuZEF0dGFjayhhaVJvdywgYWlDb2wsIHAyR2FtZWJvYXJkKTtcclxuICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSBib2FyZCBoZXJlIC0gcHJvYmFibHkgYXBwbHkgY2xhc3NlcyB0aGF0IGluZGljYXRlIHdoZXRoZXIgb3Igbm90IGEgc2hpcCBoYXMgYmVlbiBoaXQgb3IgaWYgdGhpcyB3YXMgYSBtaXNzXHJcbiAgICBET00udXBkYXRlR2FtZWJvYXJkKGFpQm9hcmQsIGZhbHNlKTtcclxuICAgIC8vIEFJIE1vdmVzIHNlY29uZFxyXG4gICAgLy8gaGF2ZSByb2JvdCBtYWtlIHJhbmRvbWl6ZWQgbW92ZSBoZXJlXHJcbiAgICBjb25zdCBbaHVtUm93LCBodW1Db2xdID0gWy4uLmdldFJhbmRBdHRhY2tDb29yZCgpXTtcclxuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBwMi5zZW5kQXR0YWNrKGh1bVJvdywgaHVtQ29sLCBwMUdhbWVib2FyZCk7XHJcbiAgICBET00udXBkYXRlR2FtZWJvYXJkKGh1bWFuQm9hcmQsIHRydWUpO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBhZGRTaGlwTGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gZHJhZ3N0YXJ0X2hhbmRsZXIoZSkge1xyXG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgZS50YXJnZXQuY2xhc3NOYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtY2VsbHMnKTtcclxuICAgIHNoaXBzLmZvckVhY2goZnVuY3Rpb24oc2hpcCkge1xyXG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdzdGFydF9oYW5kbGVyKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGRHYW1lYm9hcmRMaXN0ZW5lcnMgPSAoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gZHJhZ292ZXJfaGFuZGxlcihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2hhZG93JylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkcmFnbGVhdmVfaGFuZGxlcihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2hhZG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXNGcm9tSUQoaWQpIHtcclxuICAgICAgY29uc3QgbnVtID0gaWQubWF0Y2goL1swLTldezJ9Lyk7XHJcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBbbnVtWzBdWzBdLCBudW1bMF1bMV1dLm1hcChmdW5jdGlvbih4U3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHhTdHIpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIFtyb3csIGNvbF07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHJvcF9oYW5kbGVyKGUpIHtcclxuICAgICAgLy8gZ2V0IGV2ZW50IGluZm8gZnJvbSBkcm9wcGVkIGVsZW1lbnQgLSBzaGlwVHlwZSwgc2hpcElzSG9yaXpvbnRhbCwgYW5kIGNvb3JkaW5hdGVzIChyb3csIGNvbCBudW1iZXJzKVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBkYXRhLnNwbGl0KCcgJyk7XHJcbiAgICAgIGNvbnN0IHNoaXBUeXBlID0gY2xhc3Nlc1sxXTtcclxuICAgICAgbGV0IHNoaXBJc0hvcml6b250YWw7XHJcbiAgICAgIGlmIChjbGFzc2VzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgIHNoaXBJc0hvcml6b250YWwgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaGlwSXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldENvb3JkaW5hdGVzRnJvbUlEKGUudGFyZ2V0LmlkKTtcclxuICAgICAgY29uc3QgW3JvdywgY29sXSA9IFsuLi5jb29yZGluYXRlc107XHJcbiAgICAgIGNvbnN0IHByZXZTaGlwQ3QgPSBwMUdhbWVib2FyZC5jdFNoaXBzKCk7XHJcbiAgICAgIHAxLmRlcGxveVNoaXAocm93LCBjb2wsIHNoaXBUeXBlLCBzaGlwSXNIb3Jpem9udGFsKTtcclxuICAgICAgY29uc3QgbmV3U2hpcEN0ID0gcDFHYW1lYm9hcmQuY3RTaGlwcygpO1xyXG4gICAgICAvLyB1cGRhdGUgdGhlIGdhbWVib2FyZCBzdHlsaW5nXHJcbiAgICAgIERPTS5zdHlsZUdhbWVib2FyZChwMUdhbWVib2FyZCwgdHJ1ZSk7XHJcbiAgICAgIC8vIHVwZGF0ZSB0aGUgc2hpcCBzdGFnaW5nIGFyZWEsIGlmIHZhbGlkIHBsYWNlbWVudFxyXG4gICAgICBpZiAoIShwcmV2U2hpcEN0ID09PSBuZXdTaGlwQ3QpKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtY2VsbHMuJyArIHNoaXBUeXBlKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgLy8gYWRkIGh1bWFuIGdhbWVib2FyZCBsaXN0ZW5lcnNcclxuICAgIGNvbnN0IGdiQ2VsbHNIdW1hbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYi1jZWxsLWh1bWFuJyk7XHJcbiAgICBnYkNlbGxzSHVtYW4uZm9yRWFjaChmdW5jdGlvbihnYkNlbGxIdW1hbikge1xyXG4gICAgICBnYkNlbGxIdW1hbi5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdvdmVyX2hhbmRsZXIpO1xyXG4gICAgICBnYkNlbGxIdW1hbi5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnbGVhdmVfaGFuZGxlcik7XHJcbiAgICAgIGdiQ2VsbEh1bWFuLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcm9wX2hhbmRsZXIpO1xyXG4gICAgfSlcclxuICAgIC8vIGFkZCBhaSBnYW1lYm9hcmQgbGlzdGVuZXJzXHJcbiAgICBjb25zdCBnYkNlbGxzQUkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2ItY2VsbC1haScpO1xyXG4gICAgZ2JDZWxsc0FJLmZvckVhY2goZnVuY3Rpb24oZ2JDZWxsQUkpIHtcclxuICAgICAgZ2JDZWxsQUkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzQXR0YWNrKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdGFydHVwKCkge1xyXG4gICAgLy8gY3JlYXRlIFBsYXllciBvYmplY3RzIChHYW1lYm9hcmQgb2JqZWN0cyBub3cgY3JlYXRlZCBhcyBwYXJ0IG9mIHRoZSBwbGF5ZXJzKVxyXG4gICAgcDEgPSBQbGF5ZXIoKTtcclxuICAgIHAyID0gUGxheWVyKGZhbHNlKTtcclxuXHJcbiAgICAvLyBwbGFjZSBwMiAoY29tcHV0ZXIpIHNoaXBzXHJcbiAgICBwMi5kZXBsb3lTaGlwKDAsIDAsICdjYXJyaWVyJyk7XHJcbiAgICBwMi5kZXBsb3lTaGlwKDEsIDAsICdiYXR0bGVzaGlwJyk7XHJcbiAgICBwMi5kZXBsb3lTaGlwKDIsIDAsICdjcnVpc2VyJyk7XHJcbiAgICBwMi5kZXBsb3lTaGlwKDMsIDAsICdzdWJtYXJpbmUnKTtcclxuICAgIHAyLmRlcGxveVNoaXAoNCwgMCwgJ2Rlc3Ryb3llcicpO1xyXG5cclxuICAgIC8vIHVzZSB0aGUgZ2FtZWJvYXJkcyB0byBhcHBseSBET00gc3R5bGluZ1xyXG4gICAgLy8gb25seSBodW1hbiBnYW1lbWJvYXJkIHdpbGwgaGF2ZSB2aXNpYmxlIHN0eWxpbmcgLSBjb21wdXRlciB3aWxsIGp1c3QgaGF2ZSBjbGFzc2VzIGJ1dCBub3QgbG9vayBhbnkgZGlmZmVyZW50XHJcbiAgICBwMUdhbWVib2FyZCA9IHAxLmdldEdhbWVib2FyZCgpO1xyXG4gICAgcDJHYW1lYm9hcmQgPSBwMi5nZXRHYW1lYm9hcmQoKTtcclxuXHJcbiAgICBET00uc2V0dXAoKTtcclxuICAgIGFkZFNoaXBMaXN0ZW5lcnMoKTtcclxuICAgIGFkZEdhbWVib2FyZExpc3RlbmVycygpO1xyXG4gICAgRE9NLnN0eWxlR2FtZWJvYXJkKHAxR2FtZWJvYXJkLCB0cnVlKTtcclxuXHJcbiAgfVxyXG4gIHN0YXJ0dXAoKTtcclxufVxyXG5cclxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==