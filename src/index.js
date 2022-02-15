import { Player } from './app';
import DOM from './dom';

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
    DOM.updateGameboard(aiBoard, false);
    // AI Moves second
    // have robot make randomized move here
    const [humRow, humCol] = [...getRandAttackCoord()];
    const humanBoard = p2.sendAttack(humRow, humCol, p1Gameboard);
    DOM.updateGameboard(humanBoard, true);
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
      DOM.styleGameboard(p1Gameboard, true);
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
    p1 = Player();
    p2 = Player(false);

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

    DOM.setup();
    addShipListeners();
    addGameboardListeners();
    DOM.styleGameboard(p1Gameboard, true);

  }
  startup();
}

main();