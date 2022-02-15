import { Player } from './app';
import DOM from './dom';

const aiAttemptedCoord = [];
const humAttemptedCoord = [];

function main() {

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
  
  const addGameboardListeners = () => {
    const gbCells = document.querySelectorAll('.gb-cell-ai')
    gbCells.forEach(function(gbCell) {
      gbCell.addEventListener('click', processAttack)
    })
  }

  // create Player objects (Gameboard objects now created as part of the players)
  const p1 = Player();
  const p2 = Player(false);

  // Players deploy their ships only after they toggle direction & drag and drop onto their board
  // place P1 (human) ships
  p1.deployShip(0, 0, 'carrier');
  p1.deployShip(3, 5, 'battleship');
  p1.deployShip(5, 2, 'cruiser', false);
  p1.deployShip(6, 5, 'submarine');
  p1.deployShip(8, 9, 'destroyer', false);

  // place p2 (computer) ships
  p2.deployShip(0, 0, 'carrier');
  p2.deployShip(1, 0, 'battleship');
  p2.deployShip(2, 0, 'cruiser');
  p2.deployShip(3, 0, 'submarine');
  p2.deployShip(4, 0, 'destroyer');

  // use the gameboards to apply DOM styling
  // only human gamemboard will have visible styling - computer will just have classes but not look any different
  const p1Gameboard = p1.getGameboard();
  const p2Gameboard = p2.getGameboard();

  DOM.setup();
  addGameboardListeners();
  DOM.styleGameboard(p1Gameboard, true)


}

main();