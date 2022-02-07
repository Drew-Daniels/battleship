import { Ship, Gameboard, Player } from './app';

let carrierHorizontal;
let carrierVertical;

let playerHuman;
let playerAI;

function initializeShips () {
  carrierHorizontal = Ship('carrier');
  carrierVertical = Ship('carrier', 'vertical');
}

function initializePlayers() {
  playerHuman = Player('human');
  playerAI = Player('ai');
}

function initializeAll() {
  initializePlayers();
  initializeShips();
  //initial gameboards
}

beforeAll(() => {
  return initializeAll();
})

test('Creates a Carrier Ship with a length of 5', () => {
  expect(carrierHorizontal.getLength()).toBe(5);
});

test('Creates a Carrier Ship with a default direction of horizontal', () => {
  expect(carrierHorizontal.getDirection()).toMatch(/horizontal/);
});

test('Creates a Carrier Ship with a length of 5 and specified direction of vertical', () => {
  expect(carrierVertical.getDirection()).toMatch(/vertical/);
});

test('Human player object returns correct type', () => {
  expect(playerHuman.getType()).toMatch(/human/);
});

test('AI player object returns correct type', () => {
  expect(playerAI.getType()).toMatch(/ai/);
});