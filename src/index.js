import { Ship, Gameboard, Player } from './app';

function main() {

  // create Player objects
  const p1 = Player();
  const p2 = Player(false);

  // create Gamemboard objects
  const p1GB = Gameboard();
  const p2GB = Gameboard(false);

  // create Player 1 Ship objects
  const p1Carrier = Ship('carrier');
  const p1Battleship = Ship('battleship');
  const p1Cruiser = Ship('cruiser');
  const p1Submarine = Ship('submarine');
  const p1Destroyer = Ship('destroyer');
  
  // create Player 2 Ship objects
  const p2Carrier = Ship('carrier');
  const p2Battleship = Ship('battleship');
  const p2Cruiser = Ship('cruiser');
  const p2Submarine = Ship('submarine');
  const p2Destroyer = Ship('destroyer');


}

main();