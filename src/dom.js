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

export default {
  setup,
  styleGameboard,
  updateGameboard,
}