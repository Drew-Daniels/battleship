import { Player } from './app';
import DOM from './dom';

function main() {

  // create Player objects (Gameboard objects now created as part of the players)
  const p1 = Player();
  const p2 = Player(false);

  // Players deploy their ships only after they toggle direction & drag and drop onto their board
  // place P1 (human) ships
  p1.deployShip(0, 0, 'carrier');
  p1.deployShip(1, 0, 'battleship');
  p1.deployShip(2, 0, 'cruiser');
  p1.deployShip(3, 0, 'submarine');
  p1.deployShip(6, 0, 'destroyer');

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

  DOM.styleGameboard(p1Gameboard, true)

}

main();