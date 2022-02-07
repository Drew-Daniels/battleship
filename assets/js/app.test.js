import { Ship, Gameboard, Player } from './app';

// Declare SHIPS
// Carriers - Length of 5
let carrierH;
let carrierV;

// Battleships - Length of 4
let battleshipH;
let battleshipV;

// Cruisers - Length of 3
let cruiserH;
let cruiserV;

// Submarines - Length of 3
let submarineH;
let submarineV;

// Destroyers - Length of 2
let destroyerH;
let destroyerV;

// Declare PLAYERS
let playerHuman;
let playerAI;

// Declare GAMEBOARDS
let gameboardHuman;
let gameboardAI;

function initializeShips () {
  carrierH = Ship('carrier');
  carrierV = Ship('carrier', false);

  battleshipH = Ship('battleship');
  battleshipV = Ship('battleship', false);

  cruiserH = Ship('cruiser');
  cruiserV = Ship('cruiser', false);

  submarineH = Ship('submarine');
  submarineV = Ship('submarine', false);

  destroyerH = Ship('destroyer');
  destroyerV = Ship('destroyer', false);
}

function initializePlayers() {
  playerHuman = Player();
  playerAI = Player(false);
}

function initializeGameboards() {
  gameboardHuman = Gameboard();
  gameboardAI = Gameboard();
}

function initializeAll() {
  initializePlayers();
  initializeShips();
  //initial gameboards
}

beforeAll(() => {
  return initializeAll();
})

// SHIP tests
// Carriers
test('Creates a Carrier with a length of 5', () => {
  expect(carrierH.getLength()).toBe(5);
});
test('Creates a Carrier with a default direction of horizontal', () => {
  expect(carrierH.isHorizontal()).toBe(true);
});
test('Creates a Carrier with a specified direction of vertical', () => {
  expect(carrierV.isHorizontal()).toBe(false);
});
// Battleships
test('Creates a Battleship with a length of 4', () => {
  expect(battleshipH.getLength()).toBe(4);
});
test('Creates a Battleship with a default direction of horizontal', () => {
  expect(battleshipH.isHorizontal()).toBe(true);
});
test('Creates a Battleship with a specified direction of vertical', () => {
  expect(battleshipV.isHorizontal()).toBe(false);
});
// Cruisers
test('Creates a Cruiser with a length of 3', () => {
  expect(cruiserH.getLength()).toBe(3);
});
test('Creates a Cruiser with a default direction of horizontal', () => {
  expect(cruiserH.isHorizontal()).toBe(true);
});
test('Creates a Cruiser with a specified direction of vertical', () => {
  expect(cruiserV.isHorizontal()).toBe(false);
});
// Submarines
test('Creates a Submarine with a length of 3', () => {
  expect(submarineH.getLength()).toBe(3);
});
test('Creates a Submarine with a default direction of horizontal', () => {
  expect(submarineH.isHorizontal()).toBe(true);
});
test('Creates a Submarine with a specified direction of vertical', () => {
  expect(submarineV.isHorizontal()).toBe(false);
});
// Destroyers
test('Creates a Destroyer with a length of 2', () => {
  expect(destroyerH.getLength()).toBe(2);
});
test('Creates a Destroyer with a default direction of horizontal', () => {
  expect(destroyerH.isHorizontal()).toBe(true);
});
test('Creates a Destroyer with a specified direction of vertical', () => {
  expect(destroyerV.isHorizontal()).toBe(false);
});

// PLAYER tests
test('Human player object returns correct type', () => {
  expect(playerHuman.isHuman()).toBe(true);
});
test('AI player object returns correct type', () => {
  expect(playerAI.isHuman()).toBe(false);
});

// GAMEBOARD tests
