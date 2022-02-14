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
      if (gameboardObj.containsShip(rowNum, colNum)) {
        // get dom element
        // increment row num by one because first row is headers
        const gameboardDOMRow = gameboardDOM.querySelectorAll('.gb-row')[rowNum+1];
        const gameboardDOMCell = gameboardDOM.querySelectorAll('.gb-row')[rowNum+1].querySelectorAll('.gb-cell')[colNum];
        gameboardDOMCell.classList.add('gb-cell-ship');
      }
    }
  }
}

const setup = () => {
  addShipListeners();
}

export default {
  setup,
  styleGameboard,
}