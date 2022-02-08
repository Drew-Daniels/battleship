import { Ship, Gameboard, Player } from './app';

function main() {
  
  const p1 = Player();
  const p2 = Player(false);

  const p1GB = Gameboard();
  const p2GB = Gameboard(false);

  // p1 ships
  const p1Carrier = Ship('carrier');
  const p1Battleship = Ship('battleship');
  const p1Cruiser = Ship('cruiser');
  const p1Submarine = Ship('submarine');
  const p1Destroyer = Ship('destroyer');
  // p2 ships
  const p2Carrier = Ship('carrier');
  const p2Battleship = Ship('battleship');
  const p2Cruiser = Ship('cruiser');
  const p2Submarine = Ship('submarine');
  const p2Destroyer = Ship('destroyer');

  // add event listeners, draw DOM elements etc.

}

main();