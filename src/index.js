import { Player } from './app';
import DOM from './dom';

const getAttackInfo = (e) => {
  const row = e.target.parentNode.firstElementChild.innerText;
  // const col = ;
  // const gb = ;
  console.log(row);
}


const addGameboardListeners = () => {
  const gbCells = document.querySelectorAll('.gb-cell-ai')
  gbCells.forEach(function(gbCell) {
    gbCell.addEventListener('click', getAttackInfo)
  })
}

function main() {

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