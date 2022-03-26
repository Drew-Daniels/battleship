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
    validCoordinates,
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

function hide(node) {
  node.classList.add('hide');
}

function unhide(node) {
  node.classList.remove('hide');
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
  hide,
  unhide
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
  
  /**
   *
   * @param {int} min 
   * @param {int} max 
   * @returns int between min and max inclusive at both ends
   */
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

  const getRandShipCoordinates = (gb, ship) => {
    let randRowNum;
    let randColNum;
    do {
      randRowNum = getRandIntFromInterval(0, 9);
      randColNum = getRandIntFromInterval(0, 9);
    } while (!gb.validCoordinates(randRowNum, randColNum, ship));
    return [randRowNum, randColNum];
  }

  const processAttack = (e) => {
    // first check if all human ships are placed - if not do not process anything
    if (!p1Gameboard.allShipsPlaced()) {
      return;
    };
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].hide(document.querySelector('.ship-area'));
    // HUMAN moves first
    let [aiRow, aiCol] = [...getAttackInfo(e)];
    const aiBoard = p1.sendAttack(aiRow, aiCol, p2Gameboard);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].updateGameboard(aiBoard, false);
    if (p2Gameboard.allShipsSunk()) {
      const winnerBannerHeader= document.querySelector('.winner-banner-header');
      winnerBannerHeader.textContent = 'Player 1 has won!'
    }
    // AI Moves second
    const [humRow, humCol] = [...getRandAttackCoord()];
    const humanBoard = p2.sendAttack(humRow, humCol, p1Gameboard);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].updateGameboard(humanBoard, true);
    if (p1Gameboard.allShipsSunk()) {
      const winnerBannerHeader= document.querySelector('.winner-banner-header');
      winnerBannerHeader.textContent = 'Player 2 has won!'
    }
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

    // use the gameboards to apply DOM styling
    // only human gamemboard will have visible styling - computer will just have classes but not look any different
    p1Gameboard = p1.getGameboard();
    p2Gameboard = p2.getGameboard();

    const p2Carrier = p2.createShip('carrier', !!getRandIntFromInterval(0,1));
    const p2Battleship = p2.createShip('battleship', !!getRandIntFromInterval(0,1));
    const p2Cruiser = p2.createShip('cruiser', !!getRandIntFromInterval(0,1));
    const p2Submarine = p2.createShip('submarine', !!getRandIntFromInterval(0,1));
    const p2Destroyer = p2.createShip('destroyer', !!getRandIntFromInterval(0,1));

    const p2CarrierCoordinates = getRandShipCoordinates(p2Gameboard, p2Carrier);
    const p2BattleshipCoordinates = getRandShipCoordinates(p2Gameboard, p2Battleship);
    const p2CruiserCoordinates = getRandShipCoordinates(p2Gameboard, p2Cruiser);
    const p2SubmarineCoordinates = getRandShipCoordinates(p2Gameboard, p2Submarine);
    const p2DestroyerCoordinates = getRandShipCoordinates(p2Gameboard, p2Destroyer);

    p2Gameboard.placeShip(...p2CarrierCoordinates, p2Carrier);
    p2Gameboard.placeShip(...p2BattleshipCoordinates, p2Battleship);
    p2Gameboard.placeShip(...p2CruiserCoordinates, p2Cruiser);
    p2Gameboard.placeShip(...p2SubmarineCoordinates, p2Submarine);
    p2Gameboard.placeShip(...p2DestroyerCoordinates, p2Destroyer);

    // place p2 (computer) ships
    // p2.deployShip(0, 0, 'carrier');
    // p2.deployShip(1, 0, 'battleship');
    // p2.deployShip(2, 0, 'cruiser');
    // p2.deployShip(3, 0, 'submarine');
    // p2.deployShip(4, 0, 'destroyer');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEIsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixhQUFhLEtBQUs7QUFDbEIsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixh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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtEQUFTO0FBQ2I7QUFDQTtBQUNBLElBQUksMkRBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEluIG9yZGVyIG9mIGxhcmdlc3QgdG8gc21hbGxlc3Q6IGNhcnJpZXIgKDUpLCBiYXR0bGVzaGlwICg0KSwgY3J1aXNlciAoMyksIHN1Ym1hcmluZSAoMiksIGFuZCBkZXN0cm95ZXIgKDEpXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb24gSG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxyXG4gKiBAcmV0dXJucyBTaGlwXHJcbiAqL1xyXG5jb25zdCBTaGlwID0gKHR5cGUsIGhvcml6b250YWw9dHJ1ZSkgPT4ge1xyXG5cclxuICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTtcclxuICBsZXQgaHogPSBob3Jpem9udGFsO1xyXG4gIGNvbnN0IGlzSG9yaXpvbnRhbCA9ICgpID0+IGh6O1xyXG4gIGNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9ICgpID0+IHtcclxuICAgIGh6ID0gIWh6O1xyXG4gICAgcmV0dXJuIGh6O1xyXG4gIH1cclxuICBsZXQgbGVuZ3RoO1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSAnY2Fycmllcic6XHJcbiAgICAgIGxlbmd0aCA9IDU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYmF0dGxlc2hpcCc6XHJcbiAgICAgIGxlbmd0aCA9IDQ7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY3J1aXNlcic6XHJcbiAgICAgIGxlbmd0aCA9IDM7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnc3VibWFyaW5lJzpcclxuICAgICAgbGVuZ3RoID0gMztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdkZXN0cm95ZXInOlxyXG4gICAgICBsZW5ndGggPSAyO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xyXG4gIC8vIENyZWF0ZSBhbiBhcnJheSBvZiAncG9zaXRpb25zJyB3aGVyZSB0aGUgdmFsdWUgaW4gZWFjaCAncG9zaXRpb24nIGluZGljYXRlc1xyXG4gIC8vIHdoZXRoZXIgb3Igbm90IHRoYXQgcG9zaXRpb24gaGFzIGJlZW4gaGl0XHJcbiAgLy8gZGVzdHJveWVyLl9wb3NpdGlvbnMgPSBbZmFsc2UsIGZhbHNlXVxyXG4gIC8vIGRlc3Ryb3llci5oaXQoMCkgPT4gW3RydWUsIGZhbHNlXVxyXG4gIGNvbnN0IF9wb3NpdGlvbnMgPSBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xyXG4gIC8qKlxyXG4gICAqIFRha2VzIGFuIGludGVnZXIgYW5kIG1hcmtzIHRoYXQgcG9zaXRpb24gb2YgYSBzaGlwIGFzICdoaXQnIGJ5IGZpbGxpbmcgaW4gdGhhdCBpbmRleCB3aXRoIHRydWVcclxuICAgKiBAcGFyYW0ge2ludH0gaGl0UG9zIFxyXG4gICAqL1xyXG4gIGNvbnN0IGhpdCA9IChoaXRQb3MpID0+IHtcclxuICAgIGlmIChpc1N1bmsoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgc2hpcCBpcyBhbHJlYWR5IHN1bmsnKTtcclxuICAgIH0gZWxzZSBpZiAoaGl0UG9zID49IF9wb3NpdGlvbnMubGVuZ3RoKXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlZ2VyIHByb3ZpZGVkIHRvIC5oaXQoKSBtdXN0IGJlIGxlc3MgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBzaGlwJyk7XHJcbiAgICB9XHJcbiAgICBfcG9zaXRpb25zW2hpdFBvc10gPSB0cnVlO1xyXG4gICAgcmV0dXJuIGdldEhpdFBvc2l0aW9ucygpO1xyXG4gIH1cclxuICBjb25zdCBjb3VudEhpdHMgPSAoKSA9PiB7XHJcbiAgICBsZXQgY3QgPSAwO1xyXG4gICAgX3Bvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKF9wb3NpdGlvbikge1xyXG4gICAgICBpZiAoX3Bvc2l0aW9uKSB7XHJcbiAgICAgICAgY3QrKztcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGN0O1xyXG4gIH1cclxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gbGVuZ3RoID09PSBjb3VudEhpdHMoKTtcclxuICB9XHJcbiAgY29uc3QgZ2V0SGl0UG9zaXRpb25zID0gKCkgPT4ge1xyXG4gICAgbGV0IGhpdFBvc2l0aW9ucyA9IFtdO1xyXG4gICAgbGV0IHBvc2l0aW9uO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgX3Bvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwb3NpdGlvbiA9IF9wb3NpdGlvbnNbaV07XHJcbiAgICAgIGlmIChwb3NpdGlvbikge1xyXG4gICAgICAgIGhpdFBvc2l0aW9ucy5wdXNoKGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGl0UG9zaXRpb25zO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdldFR5cGUsIFxyXG4gICAgaXNIb3Jpem9udGFsLFxyXG4gICAgdG9nZ2xlRGlyZWN0aW9uLFxyXG4gICAgZ2V0TGVuZ3RoLFxyXG4gICAgaGl0LFxyXG4gICAgaXNTdW5rLFxyXG4gIH1cclxufVxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaHVtYW4gXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuY29uc3QgR2FtZWJvYXJkID0gKGh1bWFuPXRydWUpID0+IHtcclxuICBjb25zdCBTSElQUyA9IFtdO1xyXG4gIGNvbnN0IEJPQVJEID0gW1xyXG4gICAgLy8gcm93IDFcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgMiBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgMyBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgNCBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgNSBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgICAvLyByb3cgNlxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA3IFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA4IFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyA5IFxyXG4gICAgW1xyXG4gICAgICBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXVxyXG4gICAgXSxcclxuICAgIC8vIHJvdyAxMCBcclxuICAgIFtcclxuICAgICAgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11cclxuICAgIF0sXHJcbiAgXVxyXG5cclxuICBjb25zdCBnZXRCb2FyZFdpZHRoID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIEJPQVJELmxlbmd0aCAtIDE7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IHtcclxuICAgIHJldHVybiBCT0FSRDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSBzaGlwIHRvIHJldHVybiBhbmQgcmV0dXJucyB0aGF0IHNoaXBcclxuICAgKiBmb3IgdGhpcyBHYW1lYm9hcmQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNoaXBUeXBlIFxyXG4gICAqIEByZXR1cm5zIFtTaGlwIG9iamVjdF1cclxuICAgKi9cclxuICBjb25zdCBnZXRTaGlwID0gKHNoaXBUeXBlKSA9PiB7XHJcbiAgICBsZXQgcmVzO1xyXG4gICAgU0hJUFMuZm9yRWFjaChmdW5jdGlvbihzaGlwKSB7XHJcbiAgICAgIGlmIChzaGlwLmdldFR5cGUoKSA9PT0gc2hpcFR5cGUpIHtcclxuICAgICAgICByZXMgPSBzaGlwO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgYSBwYWlyIG9mIGNvb3JkaW5hdGVzIGFscmVhZHkgY29udGFpbnMgYSBzaGlwIHJlZmVyZW5jZVxyXG4gICAqIEBwYXJhbSB7aW50fSByb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IGNvbCBcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIGNvbnN0IGNvbnRhaW5zU2hpcCA9IChyb3csIGNvbCkgPT4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBCT0FSRFtyb3ddW2NvbF1bMF0gPT09ICdvYmplY3QnO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDaGVja3MgYSBwYWlyIG9mIGNvb3JkaW5hdGVzIHRvIHNlZSBpZiB0aGV5IGFyZSB3aXRoaW4gYm91bmRzIG9mIHRoZSBnYW1lYm9hcmRcclxuICAgKiBAcGFyYW0ge2ludH0gcm93IFxyXG4gICAqIEBwYXJhbSB7aW50fSBjb2wgXHJcbiAgICogQHJldHVybnMgYm9vbGVhblxyXG4gICAqL1xyXG4gIGNvbnN0IG91dE9mQm91bmRzID0gKHJvdywgY29sKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZFdpZHRoID0gZ2V0Qm9hcmRXaWR0aCgpO1xyXG4gICAgcmV0dXJuIChyb3cgPCAwIHx8IHJvdyA+IGJvYXJkV2lkdGggfHwgY29sIDwgMCB8fCBjb2wgPiBib2FyZFdpZHRoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgcGFpciBvZiBnYW1lYm9hcmQgY29vcmRpbmF0ZXMgYW5kIGNoZWNrcyB3aGV0aGVyIHRoZXNlIGFuZCBhbnkgYWRkaXRpb25hbCBpbXBsaWVkXHJcbiAgICogc2hpcCBjb29yZGluYXRlcyAob25lcyB0aGF0IHdpbGwgYmUgYWN0aXZhdGVkIGJhc2VkIG9uIHRoZSBsZW5ndGggb2YgdGhlIHNoaXApIGFyZVxyXG4gICAqIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBib2FyZCBhbmQgZG8gbm90IGFscmVhZHkgY29udGFpbiBhIHNoaXBcclxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRSb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IHN0YXJ0Q29sIFxyXG4gICAqIEBwYXJhbSB7U2hpcCBvYmplY3R9IHNoaXAgXHJcbiAgICovXHJcbiAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IChzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApID0+IHtcclxuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHNoaXAuaXNIb3Jpem9udGFsKCk7XHJcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcclxuICAgIGxldCByb3c7XHJcbiAgICBsZXQgY29sO1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDw9IHNoaXBMZW5ndGgtMTsgaSsrKSB7XHJcbiAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICByb3cgPSBzdGFydFJvdztcclxuICAgICAgICBjb2wgPSBzdGFydENvbCArIGk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcm93ID0gc3RhcnRSb3cgKyBpO1xyXG4gICAgICAgIGNvbCA9IHN0YXJ0Q29sO1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAob3V0T2ZCb3VuZHMocm93LCBjb2wpIHx8IGNvbnRhaW5zU2hpcChyb3csIGNvbCkpIHtcclxuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7ICBcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY3RTaGlwcyA9ICgpID0+IHtcclxuICAgIHJldHVybiBTSElQUy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnYW1lYm9hcmRIYXNUaGlzU2hpcCA9IChzaGlwVHlwZSkgPT4ge1xyXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xyXG4gICAgU0hJUFMuZm9yRWFjaChmdW5jdGlvbihTSElQKSB7XHJcbiAgICAgIGlmIChTSElQLmdldFR5cGUoKSA9PT0gc2hpcFR5cGUpIHtcclxuICAgICAgICByZXMgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBwYWlyIG9mIGNvb3JkaW5hdGVzLCBhbmQgbWFya3MgdGhvc2UgY29vcmRpbmF0ZXMgYXMgY29udGFpbmluZyBhIHNoaXBcclxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRSb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IHN0YXJ0Q29sIFxyXG4gICAqIEBwYXJhbSB7U2hpcCBvYmplY3R9IHNoaXAgXHJcbiAgICogQHJldHVybnMgQk9BUkRcclxuICAgKi9cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc3RhcnRSb3csIHN0YXJ0Q29sLCBzaGlwKSA9PiB7XHJcbiAgICBpZiAoZ2FtZWJvYXJkSGFzVGhpc1NoaXAoc2hpcC5nZXRUeXBlKCkpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvciAoJ1RoaXMgZ2FtZWJvYXJkIGFscmVhZHkgaGFzIHRoYXQgc2hpcCB0eXBlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoYWxsU2hpcHNQbGFjZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgKCdUaGVyZSBhcmUgYWxyZWFkeSA1IHNoaXBzIG9uIHRoaXMgYm9hcmQnKVxyXG4gICAgfVxyXG4gICAgY29uc3QgaXNIb3Jpem9udGFsID0gc2hpcC5pc0hvcml6b250YWwoKTtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xyXG4gICAgaWYgKHZhbGlkQ29vcmRpbmF0ZXMoc3RhcnRSb3csIHN0YXJ0Q29sLCBzaGlwKSkge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sO1xyXG4gICAgICBmb3IgKGxldCBpPTA7IGkgPD0gc2hpcExlbmd0aC0xOyBpKyspIHtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdztcclxuICAgICAgICAgIGNvbCA9IHN0YXJ0Q29sICsgaTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcm93ID0gc3RhcnRSb3cgKyBpO1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEJPQVJEW3Jvd11bY29sXVswXSA9IHtcclxuICAgICAgICAgIHNoaXBUeXBlOiBzaGlwLmdldFR5cGUoKSxcclxuICAgICAgICAgIHNoaXBQb3NpdGlvbjogaSxcclxuICAgICAgICAgIGlzSGl0OiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICB9O1xyXG4gICAgICBTSElQUy5wdXNoKHNoaXApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlU2hpcCA9IChzdGFydFJvdywgc3RhcnRDb2wsIHNoaXApID0+IHtcclxuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHNoaXAuaXNIb3Jpem9udGFsKCk7XHJcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcclxuICAgIGlmIChjb250YWluc1NoaXAoc3RhcnRSb3csIHN0YXJ0Q29sLCBzaGlwKSkge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sO1xyXG4gICAgICBmb3IgKGxldCBpPTA7IGkgPD0gc2hpcExlbmd0aC0xOyBpKyspIHtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICByb3cgPSBzdGFydFJvdztcclxuICAgICAgICAgIGNvbCA9IHN0YXJ0Q29sICsgaTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcm93ID0gc3RhcnRSb3cgKyBpO1xyXG4gICAgICAgICAgY29sID0gc3RhcnRDb2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgc2hpcCByZWZlcmVuY2VzIGZyb20gdGhlIEdhbWVib2FyZC5CT0FSRCBhcnJheVxyXG4gICAgICAgIEJPQVJEW3Jvd11bY29sXS5wb3AoKTtcclxuICAgICAgfTtcclxuICAgICAgLy8gcmVtb3ZlIHRoZSBTaGlwIG9iamVjdCBmcm9tIHRoZSBHYW1lYm9hcmQuU0hJUFMgYXJyYXlcclxuICAgICAgZm9yIChsZXQgaT0wOyBpIDwgU0hJUFMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoU0hJUFNbaV0uZ2V0VHlwZSgpID09PSBzaGlwLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgU0hJUFMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEJPQVJEO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBwYWlyIG9mIGNvb3JkaW5hdGVzIGFuZCB0ZXN0cyB0byBzZWUgaWYgdGhvc2UgY29vcmRpbmF0ZXMgcmV0cmlldmUgYW4gb2JqZWN0XHJcbiAgICogaWYgc28gLSBhIHNoaXAgcG9zaXRpb24gaXMgbG9jYXRlZCB0aGVyZVxyXG4gICAqIGlmIG5vdCAtIGEgc2hpcCBwb3NpdGlvbiBpcyBub3QgbG9jYXRlZCB0aGVyZSwgYW5kIHRoZXNlIGNvb3JkaW5hdGVzIHdpbGwgYmUgbG9nZ2VkIGFzIGEgbWlzc1xyXG4gICAqIEBwYXJhbSB7aW50fSByb3cgXHJcbiAgICogQHBhcmFtIHtpbnR9IGNvbCBcclxuICAgKi9cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sKSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0gQk9BUkRbcm93XVtjb2xdWzBdO1xyXG4gICAgLy8gaWYgdGhlc2UgY29vcmRpbmF0ZXMgY29udGFpbiBhbiBvYmplY3QsIHRoZSBvYmplY3QgaXMgdGhhdCB3aGljaCBjb250YWlucyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAvLyB7XHJcbiAgICAvLyAgc2hpcFR5cGU6ICdjYXJyaWVyJyB8fCAnYmF0dGxlc2hpcCcgfHwgJ2NydWlzZXInIHx8ICdzdWJtYXJpbmUnIHx8ICdkZXN0cm95ZXInXHJcbiAgICAvLyAgc2hpcFBvc2l0aW9uOiAwIHx8IDEgfHwgMiB8fCAzIHx8IDRcclxuICAgIC8vICBpc0hpdDogdHJ1ZSB8fCBmYWxzZVxyXG4gICAgLy8gfVxyXG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoaXRlbS5pc0hpdCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBzaGlwIGhhcyBhbHJlYWR5IGJlZW4gaGl0IGluIHRoaXMgbG9jYXRpb24hJyk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXAoaXRlbS5zaGlwVHlwZSk7XHJcbiAgICAgIGNvbnN0IGhpdFBvc2l0aW9uID0gaXRlbS5zaGlwUG9zaXRpb247XHJcbiAgICAgIHNoaXAuaGl0KGhpdFBvc2l0aW9uKTtcclxuICAgICAgaXRlbS5pc0hpdCA9IHRydWU7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgaXMgc3VuayBhbmQgZG8gc29tZXRoaW5nXHJcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XHJcbiAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlmIG5vIHNoaXAgaGVyZSwgbG9nIHRoZSBtaXNzXHJcbiAgICAgIEJPQVJEW3Jvd11bY29sXVswXSA9ICdtaXNzJztcclxuICAgIH1cclxuICAgIHJldHVybiBCT0FSRDtcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgYWxsU2hpcHNQbGFjZWQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gU0hJUFMubGVuZ3RoID09PSA1O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIGFsbCBzaGlwcyBhcmUgc3Vuaywgb3RoZXJ3aXNlIGZhbHNlXHJcbiAgICogQHJldHVybnMgYm9vbGVhblxyXG4gICAqL1xyXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcclxuICAgIGlmICghYWxsU2hpcHNQbGFjZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBlbm91Z2ggc2hpcHMgb24gdGhlIGJvYXJkIScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNISVBTLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdmFsaWRDb29yZGluYXRlcyxcclxuICAgIHBsYWNlU2hpcCxcclxuICAgIHJlbW92ZVNoaXAsXHJcbiAgICByZWNlaXZlQXR0YWNrLFxyXG4gICAgZ2V0Qm9hcmQsXHJcbiAgICBjdFNoaXBzLFxyXG4gICAgYWxsU2hpcHNQbGFjZWQsXHJcbiAgICBhbGxTaGlwc1N1bmssXHJcbiAgICBjb250YWluc1NoaXAsXHJcbiAgfTtcclxufVxyXG5cclxuY29uc3QgUGxheWVyID0gKGh1bWFuPXRydWUpID0+IHtcclxuICBjb25zdCBpc0h1bWFuID0gKCkgPT4gaHVtYW47XHJcbiAgLy8gY3JlYXRlIEdhbWVib2FyZFxyXG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZChodW1hbik7XHJcbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4gZ2FtZWJvYXJkO1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBQbGF5ZXItc3BlY2lmaWMgc2hpcFxyXG4gICAqIEBwYXJhbSB7J2NhcnJpZXInIHx8ICdiYXR0bGVzaGlwJyB8fCAnY3J1aXNlcicgfHwgJ3N1Ym1hcmluZScgfHwgJ2Rlc3Ryb3llcid9IHNoaXBUeXBlIFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNIb3Jpem9udGFsIFxyXG4gICAqIEByZXR1cm5zIFtTaGlwIG9iamVjdF1cclxuICAgKi9cclxuICBjb25zdCBjcmVhdGVTaGlwID0gKHNoaXBUeXBlLCBpc0hvcml6b250YWw9dHJ1ZSkgPT4ge1xyXG4gICAgcmV0dXJuIFNoaXAoc2hpcFR5cGUsIGlzSG9yaXpvbnRhbCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW5kIHBsYWNlcyBhIHNoaXAgb24gYSBQbGF5ZXIncyBHYW1lYm9hcmQgYXQgdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcyBhbmQgb3JpZW50YXRpb25cclxuICAgKiBAcGFyYW0ge2ludH0gcm93TnVtIFxyXG4gICAqIEBwYXJhbSB7aW50fSBjb2xOdW0gXHJcbiAgICogQHBhcmFtIHsnY2FycmllcicgfHwgJ2JhdHRsZXNoaXAnIHx8ICdjcnVpc2VyJyB8fCAnc3VibWFyaW5lJyB8fCAnZGVzdHJveWVyJ30gc2hpcFR5cGUgXHJcbiAgICogQHJldHVybnMgXHJcbiAgICovXHJcbiAgY29uc3QgZGVwbG95U2hpcCA9IChyb3dOdW0sIGNvbE51bSwgc2hpcFR5cGUsIGlzSG9yaXpvbnRhbCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcCA9IGNyZWF0ZVNoaXAoc2hpcFR5cGUsIGlzSG9yaXpvbnRhbCk7XHJcbiAgICBjb25zdCBib2FyZCA9IGdhbWVib2FyZC5wbGFjZVNoaXAocm93TnVtLCBjb2xOdW0sIHNoaXApO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2VuZEF0dGFjayA9IChyb3dOdW0sIGNvbE51bSwgZ2IpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gZ2IucmVjZWl2ZUF0dGFjayhyb3dOdW0sIGNvbE51bSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNIdW1hbixcclxuICAgIGNyZWF0ZVNoaXAsXHJcbiAgICBkZXBsb3lTaGlwLFxyXG4gICAgZ2V0R2FtZWJvYXJkLFxyXG4gICAgc2VuZEF0dGFjayxcclxuICB9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBTaGlwLFxyXG4gIEdhbWVib2FyZCxcclxuICBQbGF5ZXIsXHJcbn07XHJcbiIsImNvbnN0IGFpR2FtZWJvYXJkUm93U3RyID0gJy5nYi1haSA+IC5nYi1yb3cgPiAjZ2ItYWktJztcclxuY29uc3QgaHVtYW5HYW1lYm9hcmRSb3dTdHIgPSAnLmdiLWh1bWFuID4gLmdiLXJvdyA+ICNnYi1odW1hbi0nO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q2xhc3NlcyhlbGVtZW50KSB7XHJcbiAgY29uc3QgY2xhc3NMaXN0ID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICByZXR1cm4gY2xhc3NMaXN0O1xyXG59XHJcbi8qKlxyXG4gKiBBZGRzIGFsbCBjbGFzc2VzIGluIGFuIGFycmF5IHRvIGEgRE9NIG5vZGVcclxuICogQHBhcmFtIHtET00gTm9kZX0gbm9kZSBcclxuICogQHBhcmFtIHthcnJheX0gY2xhc3NlcyBcclxuICogQHJldHVybnMgRE9NIE5vZGVcclxuICovXHJcbmZ1bmN0aW9uIGNsYXNzaWZ5KG5vZGUsIGNsYXNzZXMpIHtcclxuICBpZiAoY2xhc3Nlcy5sZW5ndGggIT09IDApIHtcclxuICAgIG5vZGUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcclxuICB9XHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFsbCBjbGFzc2VzIGluIGFuIGFycmF5IGZyb20gYSBET00gbm9kZVxyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGNsYXNzZXNUb1JlbW92ZSBcclxuICogQHJldHVybnMgRE9NIE5vZGVcclxuICovXHJcbmZ1bmN0aW9uIGRlY2xhc3NpZnkobm9kZSwgY2xhc3Nlc1RvUmVtb3ZlKSB7XHJcbiAgaWYgKGNsYXNzZXNUb1JlbW92ZS5sZW5ndGggIT09IDApIHtcclxuICAgIGZvciAobGV0IGk9MDsgaSA8IGNsYXNzZXNUb1JlbW92ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1RvUmVtb3ZlW2ldKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGUobm9kZSkge1xyXG4gIG5vZGUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmhpZGUobm9kZSkge1xyXG4gIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG59XHJcblxyXG5jb25zdCB0b2dnbGVTaGlwT3JpZW50YXRpb24gPSAoZXZlbnQpID0+IHtcclxuICBjb25zdCBzaGlwTm9kZSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xyXG4gIHNoaXBOb2RlLmNsYXNzTGlzdC50b2dnbGUoJ3ZlcnRpY2FsLXNoaXAnKTtcclxufVxyXG5cclxuY29uc3QgYWRkU2hpcExpc3RlbmVycyA9ICgpID0+IHtcclxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLWNlbGxzJyk7XHJcbiAgc2hpcHMuZm9yRWFjaChmdW5jdGlvbihzaGlwKSB7XHJcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2hpcE9yaWVudGF0aW9uKTtcclxuICB9KVxyXG59XHJcblxyXG5jb25zdCBzdHlsZUdhbWVib2FyZCA9IChnYW1lYm9hcmRPYmosIGh1bWFuKSA9PiB7XHJcbiAgY29uc3QgZ2FtZWJvYXJkID0gZ2FtZWJvYXJkT2JqLmdldEJvYXJkKCk7XHJcbiAgY29uc3QgZ2FtZWJvYXJkRE9NQm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdiJyk7XHJcbiAgbGV0IGdhbWVib2FyZERPTTtcclxuICBpZiAoaHVtYW4pIHtcclxuICAgIGdhbWVib2FyZERPTSAgPSBnYW1lYm9hcmRET01Cb2FyZHNbMF07XHJcbiAgfSBlbHNlIHtcclxuICAgIGdhbWVib2FyZERPTSA9IGdhbWVib2FyZERPTUJvYXJkc1sxXTtcclxuICB9XHJcbiAgZm9yIChsZXQgcm93TnVtPTA7IHJvd051bSA8IGdhbWVib2FyZC5sZW5ndGg7IHJvd051bSsrKSB7XHJcbiAgICBmb3IgKGxldCBjb2xOdW09MDsgY29sTnVtIDwgZ2FtZWJvYXJkLmxlbmd0aDsgY29sTnVtKyspIHtcclxuICAgICAgLy8gaW5jcmVtZW50IHJvdyBudW0gYnkgb25lIGJlY2F1c2UgZmlyc3Qgcm93IGlzIGhlYWRlcnNcclxuICAgICAgY29uc3QgZ2FtZWJvYXJkRE9NUm93ID0gZ2FtZWJvYXJkRE9NLnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYi1yb3cnKVtyb3dOdW0rMV07XHJcbiAgICAgIGNvbnN0IGdhbWVib2FyZERPTUNlbGwgPSBnYW1lYm9hcmRET00ucXVlcnlTZWxlY3RvckFsbCgnLmdiLXJvdycpW3Jvd051bSsxXS5xdWVyeVNlbGVjdG9yQWxsKCcuZ2ItY2VsbCcpW2NvbE51bV07XHJcbiAgICAgIGdhbWVib2FyZERPTUNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hhZG93Jyk7XHJcbiAgICAgIGlmIChnYW1lYm9hcmRPYmouY29udGFpbnNTaGlwKHJvd051bSwgY29sTnVtKSkge1xyXG4gICAgICAgIGdhbWVib2FyZERPTUNlbGwuY2xhc3NMaXN0LmFkZCgnZ2ItY2VsbC1zaGlwJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIGdhbWVib2FyZCBPYmplY3QncyBib2FyZCwgbG9vcHMgdGhyb3VnaCBhbGwgdGhlIHJvd3MgYW5kIGNvbHVtbnMgdG8gY2hlY2sgaWYgdGhlIGNvbnRlbnRzIG9mIHRob3NlIGNlbGxzIGFyZSBhbiBvYmplY3Qgb3IgYSBtaXNzXHJcbiAqIElmIGFuIG9iamVjdCwgdGhlIGJvYXJkIHdpbGwgY2hlY2sgaWYgdGhlIHNoaXAgcG9zaXRpb24gaXMgaGl0IGFuZCBzdHlsZSBhcHByb3ByaWF0ZWx5XHJcbiAqIElmIHRoZSBjb250ZW50cyBhcmUgYSAnbWlzcycsIHRoZW4gdGhlIGFwcHJvcHJpYXRlIHN0eWxlIGZvciBtaXNzZXMgd2lsbCBiZSBhcHBsaWVkXHJcbiAqIFRPRE86IERlcGVuZGluZyBvbiBob3cgbG9uZyB0aGlzIHByb2Nlc3MgdGFrZXMgLSBpdCBtaWdodCBiZXR0ZXIgdG8gaGF2ZSB0aGUgLnJlY2VpdmVBdHRhY2sgbWV0aG9kIGluc3RlYWQgc2VuZCB0aGUgcmVzdWx0cyBvZiB0aGUgYXR0YWNrIHJhdGhlciB0aGFuIHRoZSBlbnRpcmUgYm9hcmRcclxuICogSG93ZXZlciwgdGhpcyB3b3VsZCByZXF1aXJlIHJlZGVzaWduaW5nIHRoZSB0ZXN0cyBpbiBwbGFjZVxyXG4gKiBJZiB0aGlzIHdlcmUgZG9uZSBpbnN0ZWFkLCBubyBsb29waW5nIHdvdWxkIGhhdmUgdG8gYmUgZG9uZSBhbmQgdGhlIGFwcHJvcHJpYXRlIGNlbGwgb24gdGhlIGJvYXJkIGNvdWxkIGltbWVkaWF0ZWx5IGJlIHN0eWxlZFxyXG4gKiBAcGFyYW0geyp9IGdhbWVib2FyZCBcclxuICogQHBhcmFtIHsqfSBpc0h1bWFuIFxyXG4gKi9cclxuY29uc3QgdXBkYXRlR2FtZWJvYXJkID0gKGdhbWVib2FyZCwgaXNIdW1hbj1mYWxzZSkgPT4ge1xyXG4gIGxldCBjb250ZW50cztcclxuICBsZXQgRE9NR2FtZWJvYXJkUm93U3RyID0gKGlzSHVtYW4pID8gaHVtYW5HYW1lYm9hcmRSb3dTdHI6IGFpR2FtZWJvYXJkUm93U3RyO1xyXG4gIGZvciAobGV0IHJvd051bT0wOyByb3dOdW0gPCBnYW1lYm9hcmQubGVuZ3RoOyByb3dOdW0rKykge1xyXG4gICAgZm9yIChsZXQgY29sTnVtPTA7IGNvbE51bSA8IGdhbWVib2FyZC5sZW5ndGg7IGNvbE51bSsrKSB7XHJcbiAgICAgIGNvbnRlbnRzID0gZ2FtZWJvYXJkW3Jvd051bV1bY29sTnVtXVswXTtcclxuICAgICAgbGV0IERPTUNlbGw7XHJcbiAgICAgIERPTUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKERPTUdhbWVib2FyZFJvd1N0cityb3dOdW0rY29sTnVtKTtcclxuICAgICAgaWYgKHR5cGVvZiBjb250ZW50cyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBpZiAoY29udGVudHMuaXNIaXQpIHtcclxuICAgICAgICAgIC8vc3R5bGUgZm9yIGhpdCBoZXJlXHJcbiAgICAgICAgICBjbGFzc2lmeShET01DZWxsLCBbJ2hpdCddKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoY29udGVudHMgPT09ICdtaXNzJykge1xyXG4gICAgICAgICAgY2xhc3NpZnkoRE9NQ2VsbCwgWydtaXNzJ10pO1xyXG4gICAgICB9O1xyXG4gICAgfTtcclxuICB9O1xyXG59XHJcblxyXG5jb25zdCBzZXR1cCA9ICgpID0+IHtcclxuICBhZGRTaGlwTGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBzZXR1cCxcclxuICBzdHlsZUdhbWVib2FyZCxcclxuICB1cGRhdGVHYW1lYm9hcmQsXHJcbiAgaGlkZSxcclxuICB1bmhpZGVcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2FwcCc7XHJcbmltcG9ydCBET00gZnJvbSAnLi9kb20nO1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuXHJcbiAgbGV0IHAxO1xyXG4gIGxldCBwMjtcclxuICBsZXQgcDFHYW1lYm9hcmQ7XHJcbiAgbGV0IHAyR2FtZWJvYXJkO1xyXG5cclxuICBjb25zdCBhaUF0dGVtcHRlZENvb3JkID0gW107XHJcbiAgY29uc3QgaHVtQXR0ZW1wdGVkQ29vcmQgPSBbXTtcclxuXHJcbiAgY29uc3QgZ2V0QXR0YWNrSW5mbyA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBpZCA9IGUudGFyZ2V0LmlkO1xyXG4gICAgY29uc3Qgcm93QW5kQ29sID0gaWQubWF0Y2goL1swLTldezJ9Lyk7XHJcbiAgICBcclxuICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KHJvd0FuZENvbFswXVswXSk7XHJcbiAgICBjb25zdCBjb2wgPSBwYXJzZUludChyb3dBbmRDb2xbMF1bMV0pO1xyXG4gICAgcmV0dXJuIFtyb3csIGNvbF07XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtpbnR9IG1pbiBcclxuICAgKiBAcGFyYW0ge2ludH0gbWF4IFxyXG4gICAqIEByZXR1cm5zIGludCBiZXR3ZWVuIG1pbiBhbmQgbWF4IGluY2x1c2l2ZSBhdCBib3RoIGVuZHNcclxuICAgKi9cclxuICBjb25zdCBnZXRSYW5kSW50RnJvbUludGVydmFsID0gKG1pbiwgbWF4KSA9PiB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldFJhbmRBdHRhY2tDb29yZCA9ICgpID0+IHtcclxuICAgIGxldCByYW5kUm93TnVtO1xyXG4gICAgbGV0IHJhbmRDb2xOdW07XHJcbiAgICAvLyBlbnN1cmVzIHRoYXQgdGhlIGNvb3JkaW5hdGVzIHNlbmQgYXJlIG5vdCBvbmVzIHRoYXQgaGF2ZSBhbHJlYWR5IGJlZW4gdHJpZWRcclxuICAgIC8vIGJ1aWxkIGluIGEgc3RlcCB0aGF0IHdpbGwgcHJldmVudCBhbiBpbmZpbml0ZSBsb29wIGZyb20gb2NjdXJyaW5nIGlmIGFsbCBwb3NzaWJsZSBvY2N1cmVuY2VzIGhhdmUgYmVlbiB0cmllZD9cclxuICAgIGRvIHtcclxuICAgICAgcmFuZFJvd051bSA9IGdldFJhbmRJbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XHJcbiAgICAgIHJhbmRDb2xOdW0gPSBnZXRSYW5kSW50RnJvbUludGVydmFsKDAsIDkpO1xyXG4gICAgfSB3aGlsZSAoYWlBdHRlbXB0ZWRDb29yZC5pbmNsdWRlcyhbcmFuZFJvd051bSwgcmFuZENvbE51bV0pKTtcclxuICAgIHJldHVybiBbcmFuZFJvd051bSwgcmFuZENvbE51bV07XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRSYW5kU2hpcENvb3JkaW5hdGVzID0gKGdiLCBzaGlwKSA9PiB7XHJcbiAgICBsZXQgcmFuZFJvd051bTtcclxuICAgIGxldCByYW5kQ29sTnVtO1xyXG4gICAgZG8ge1xyXG4gICAgICByYW5kUm93TnVtID0gZ2V0UmFuZEludEZyb21JbnRlcnZhbCgwLCA5KTtcclxuICAgICAgcmFuZENvbE51bSA9IGdldFJhbmRJbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XHJcbiAgICB9IHdoaWxlICghZ2IudmFsaWRDb29yZGluYXRlcyhyYW5kUm93TnVtLCByYW5kQ29sTnVtLCBzaGlwKSk7XHJcbiAgICByZXR1cm4gW3JhbmRSb3dOdW0sIHJhbmRDb2xOdW1dO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcHJvY2Vzc0F0dGFjayA9IChlKSA9PiB7XHJcbiAgICAvLyBmaXJzdCBjaGVjayBpZiBhbGwgaHVtYW4gc2hpcHMgYXJlIHBsYWNlZCAtIGlmIG5vdCBkbyBub3QgcHJvY2VzcyBhbnl0aGluZ1xyXG4gICAgaWYgKCFwMUdhbWVib2FyZC5hbGxTaGlwc1BsYWNlZCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICBET00uaGlkZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcC1hcmVhJykpO1xyXG4gICAgLy8gSFVNQU4gbW92ZXMgZmlyc3RcclxuICAgIGxldCBbYWlSb3csIGFpQ29sXSA9IFsuLi5nZXRBdHRhY2tJbmZvKGUpXTtcclxuICAgIGNvbnN0IGFpQm9hcmQgPSBwMS5zZW5kQXR0YWNrKGFpUm93LCBhaUNvbCwgcDJHYW1lYm9hcmQpO1xyXG4gICAgRE9NLnVwZGF0ZUdhbWVib2FyZChhaUJvYXJkLCBmYWxzZSk7XHJcbiAgICBpZiAocDJHYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgICAgY29uc3Qgd2lubmVyQmFubmVySGVhZGVyPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLWJhbm5lci1oZWFkZXInKTtcclxuICAgICAgd2lubmVyQmFubmVySGVhZGVyLnRleHRDb250ZW50ID0gJ1BsYXllciAxIGhhcyB3b24hJ1xyXG4gICAgfVxyXG4gICAgLy8gQUkgTW92ZXMgc2Vjb25kXHJcbiAgICBjb25zdCBbaHVtUm93LCBodW1Db2xdID0gWy4uLmdldFJhbmRBdHRhY2tDb29yZCgpXTtcclxuICAgIGNvbnN0IGh1bWFuQm9hcmQgPSBwMi5zZW5kQXR0YWNrKGh1bVJvdywgaHVtQ29sLCBwMUdhbWVib2FyZCk7XHJcbiAgICBET00udXBkYXRlR2FtZWJvYXJkKGh1bWFuQm9hcmQsIHRydWUpO1xyXG4gICAgaWYgKHAxR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICAgIGNvbnN0IHdpbm5lckJhbm5lckhlYWRlcj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lci1iYW5uZXItaGVhZGVyJyk7XHJcbiAgICAgIHdpbm5lckJhbm5lckhlYWRlci50ZXh0Q29udGVudCA9ICdQbGF5ZXIgMiBoYXMgd29uISdcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgY29uc3QgYWRkU2hpcExpc3RlbmVycyA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGRyYWdzdGFydF9oYW5kbGVyKGUpIHtcclxuICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIGUudGFyZ2V0LmNsYXNzTmFtZSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLWNlbGxzJyk7XHJcbiAgICBzaGlwcy5mb3JFYWNoKGZ1bmN0aW9uKHNoaXApIHtcclxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnc3RhcnRfaGFuZGxlcik7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkR2FtZWJvYXJkTGlzdGVuZXJzID0gKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIGRyYWdvdmVyX2hhbmRsZXIoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NoYWRvdycpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHJhZ2xlYXZlX2hhbmRsZXIoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWRvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzRnJvbUlEKGlkKSB7XHJcbiAgICAgIGNvbnN0IG51bSA9IGlkLm1hdGNoKC9bMC05XXsyfS8pO1xyXG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gW251bVswXVswXSwgbnVtWzBdWzFdXS5tYXAoZnVuY3Rpb24oeFN0cikge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh4U3RyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBbcm93LCBjb2xdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRyb3BfaGFuZGxlcihlKSB7XHJcbiAgICAgIC8vIGdldCBldmVudCBpbmZvIGZyb20gZHJvcHBlZCBlbGVtZW50IC0gc2hpcFR5cGUsIHNoaXBJc0hvcml6b250YWwsIGFuZCBjb29yZGluYXRlcyAocm93LCBjb2wgbnVtYmVycylcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgICBjb25zdCBjbGFzc2VzID0gZGF0YS5zcGxpdCgnICcpO1xyXG4gICAgICBjb25zdCBzaGlwVHlwZSA9IGNsYXNzZXNbMV07XHJcbiAgICAgIGxldCBzaGlwSXNIb3Jpem9udGFsO1xyXG4gICAgICBpZiAoY2xhc3Nlcy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICBzaGlwSXNIb3Jpem9udGFsID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hpcElzSG9yaXpvbnRhbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlc0Zyb21JRChlLnRhcmdldC5pZCk7XHJcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBbLi4uY29vcmRpbmF0ZXNdO1xyXG4gICAgICBjb25zdCBwcmV2U2hpcEN0ID0gcDFHYW1lYm9hcmQuY3RTaGlwcygpO1xyXG4gICAgICBwMS5kZXBsb3lTaGlwKHJvdywgY29sLCBzaGlwVHlwZSwgc2hpcElzSG9yaXpvbnRhbCk7XHJcbiAgICAgIGNvbnN0IG5ld1NoaXBDdCA9IHAxR2FtZWJvYXJkLmN0U2hpcHMoKTtcclxuICAgICAgLy8gdXBkYXRlIHRoZSBnYW1lYm9hcmQgc3R5bGluZ1xyXG4gICAgICBET00uc3R5bGVHYW1lYm9hcmQocDFHYW1lYm9hcmQsIHRydWUpO1xyXG4gICAgICAvLyB1cGRhdGUgdGhlIHNoaXAgc3RhZ2luZyBhcmVhLCBpZiB2YWxpZCBwbGFjZW1lbnRcclxuICAgICAgaWYgKCEocHJldlNoaXBDdCA9PT0gbmV3U2hpcEN0KSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwLWNlbGxzLicgKyBzaGlwVHlwZSkuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgICB9O1xyXG4gICAgfTtcclxuICAgIC8vIGFkZCBodW1hbiBnYW1lYm9hcmQgbGlzdGVuZXJzXHJcbiAgICBjb25zdCBnYkNlbGxzSHVtYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2ItY2VsbC1odW1hbicpO1xyXG4gICAgZ2JDZWxsc0h1bWFuLmZvckVhY2goZnVuY3Rpb24oZ2JDZWxsSHVtYW4pIHtcclxuICAgICAgZ2JDZWxsSHVtYW4uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnb3Zlcl9oYW5kbGVyKTtcclxuICAgICAgZ2JDZWxsSHVtYW4uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ2xlYXZlX2hhbmRsZXIpO1xyXG4gICAgICBnYkNlbGxIdW1hbi5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcF9oYW5kbGVyKTtcclxuICAgIH0pXHJcbiAgICAvLyBhZGQgYWkgZ2FtZWJvYXJkIGxpc3RlbmVyc1xyXG4gICAgY29uc3QgZ2JDZWxsc0FJID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdiLWNlbGwtYWknKTtcclxuICAgIGdiQ2VsbHNBSS5mb3JFYWNoKGZ1bmN0aW9uKGdiQ2VsbEFJKSB7XHJcbiAgICAgIGdiQ2VsbEFJLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc0F0dGFjayk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RhcnR1cCgpIHtcclxuICAgIC8vIGNyZWF0ZSBQbGF5ZXIgb2JqZWN0cyAoR2FtZWJvYXJkIG9iamVjdHMgbm93IGNyZWF0ZWQgYXMgcGFydCBvZiB0aGUgcGxheWVycylcclxuICAgIHAxID0gUGxheWVyKCk7XHJcbiAgICBwMiA9IFBsYXllcihmYWxzZSk7XHJcblxyXG4gICAgLy8gdXNlIHRoZSBnYW1lYm9hcmRzIHRvIGFwcGx5IERPTSBzdHlsaW5nXHJcbiAgICAvLyBvbmx5IGh1bWFuIGdhbWVtYm9hcmQgd2lsbCBoYXZlIHZpc2libGUgc3R5bGluZyAtIGNvbXB1dGVyIHdpbGwganVzdCBoYXZlIGNsYXNzZXMgYnV0IG5vdCBsb29rIGFueSBkaWZmZXJlbnRcclxuICAgIHAxR2FtZWJvYXJkID0gcDEuZ2V0R2FtZWJvYXJkKCk7XHJcbiAgICBwMkdhbWVib2FyZCA9IHAyLmdldEdhbWVib2FyZCgpO1xyXG5cclxuICAgIGNvbnN0IHAyQ2FycmllciA9IHAyLmNyZWF0ZVNoaXAoJ2NhcnJpZXInLCAhIWdldFJhbmRJbnRGcm9tSW50ZXJ2YWwoMCwxKSk7XHJcbiAgICBjb25zdCBwMkJhdHRsZXNoaXAgPSBwMi5jcmVhdGVTaGlwKCdiYXR0bGVzaGlwJywgISFnZXRSYW5kSW50RnJvbUludGVydmFsKDAsMSkpO1xyXG4gICAgY29uc3QgcDJDcnVpc2VyID0gcDIuY3JlYXRlU2hpcCgnY3J1aXNlcicsICEhZ2V0UmFuZEludEZyb21JbnRlcnZhbCgwLDEpKTtcclxuICAgIGNvbnN0IHAyU3VibWFyaW5lID0gcDIuY3JlYXRlU2hpcCgnc3VibWFyaW5lJywgISFnZXRSYW5kSW50RnJvbUludGVydmFsKDAsMSkpO1xyXG4gICAgY29uc3QgcDJEZXN0cm95ZXIgPSBwMi5jcmVhdGVTaGlwKCdkZXN0cm95ZXInLCAhIWdldFJhbmRJbnRGcm9tSW50ZXJ2YWwoMCwxKSk7XHJcblxyXG4gICAgY29uc3QgcDJDYXJyaWVyQ29vcmRpbmF0ZXMgPSBnZXRSYW5kU2hpcENvb3JkaW5hdGVzKHAyR2FtZWJvYXJkLCBwMkNhcnJpZXIpO1xyXG4gICAgY29uc3QgcDJCYXR0bGVzaGlwQ29vcmRpbmF0ZXMgPSBnZXRSYW5kU2hpcENvb3JkaW5hdGVzKHAyR2FtZWJvYXJkLCBwMkJhdHRsZXNoaXApO1xyXG4gICAgY29uc3QgcDJDcnVpc2VyQ29vcmRpbmF0ZXMgPSBnZXRSYW5kU2hpcENvb3JkaW5hdGVzKHAyR2FtZWJvYXJkLCBwMkNydWlzZXIpO1xyXG4gICAgY29uc3QgcDJTdWJtYXJpbmVDb29yZGluYXRlcyA9IGdldFJhbmRTaGlwQ29vcmRpbmF0ZXMocDJHYW1lYm9hcmQsIHAyU3VibWFyaW5lKTtcclxuICAgIGNvbnN0IHAyRGVzdHJveWVyQ29vcmRpbmF0ZXMgPSBnZXRSYW5kU2hpcENvb3JkaW5hdGVzKHAyR2FtZWJvYXJkLCBwMkRlc3Ryb3llcik7XHJcblxyXG4gICAgcDJHYW1lYm9hcmQucGxhY2VTaGlwKC4uLnAyQ2FycmllckNvb3JkaW5hdGVzLCBwMkNhcnJpZXIpO1xyXG4gICAgcDJHYW1lYm9hcmQucGxhY2VTaGlwKC4uLnAyQmF0dGxlc2hpcENvb3JkaW5hdGVzLCBwMkJhdHRsZXNoaXApO1xyXG4gICAgcDJHYW1lYm9hcmQucGxhY2VTaGlwKC4uLnAyQ3J1aXNlckNvb3JkaW5hdGVzLCBwMkNydWlzZXIpO1xyXG4gICAgcDJHYW1lYm9hcmQucGxhY2VTaGlwKC4uLnAyU3VibWFyaW5lQ29vcmRpbmF0ZXMsIHAyU3VibWFyaW5lKTtcclxuICAgIHAyR2FtZWJvYXJkLnBsYWNlU2hpcCguLi5wMkRlc3Ryb3llckNvb3JkaW5hdGVzLCBwMkRlc3Ryb3llcik7XHJcblxyXG4gICAgLy8gcGxhY2UgcDIgKGNvbXB1dGVyKSBzaGlwc1xyXG4gICAgLy8gcDIuZGVwbG95U2hpcCgwLCAwLCAnY2FycmllcicpO1xyXG4gICAgLy8gcDIuZGVwbG95U2hpcCgxLCAwLCAnYmF0dGxlc2hpcCcpO1xyXG4gICAgLy8gcDIuZGVwbG95U2hpcCgyLCAwLCAnY3J1aXNlcicpO1xyXG4gICAgLy8gcDIuZGVwbG95U2hpcCgzLCAwLCAnc3VibWFyaW5lJyk7XHJcbiAgICAvLyBwMi5kZXBsb3lTaGlwKDQsIDAsICdkZXN0cm95ZXInKTtcclxuXHJcbiAgICBET00uc2V0dXAoKTtcclxuICAgIGFkZFNoaXBMaXN0ZW5lcnMoKTtcclxuICAgIGFkZEdhbWVib2FyZExpc3RlbmVycygpO1xyXG4gICAgRE9NLnN0eWxlR2FtZWJvYXJkKHAxR2FtZWJvYXJkLCB0cnVlKTtcclxuXHJcbiAgfVxyXG4gIHN0YXJ0dXAoKTtcclxufVxyXG5cclxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==