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

// Destroyers - Length of 3
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
let gameboardH;
let gameboardV;

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
  gameboardAI = Gameboard(false);
  gameboardH = Gameboard();
  gameboardV = Gameboard();
}

function initializeAll() {
  initializePlayers();
  initializeShips();
  initializeGameboards();
}

beforeAll(() => {
  return initializeAll();
})

describe('Carrier tests', () => {
  describe('Length tests', () => {
    test('Creates a Carrier with a length of 5', () => {
      expect(carrierH.getLength()).toBe(5);
    });
  });
  describe('Direction tests', () => {
    test('Creates a Carrier with a default direction of horizontal', () => {
      expect(carrierH.isHorizontal()).toBe(true);
    });
    test('Creates a Carrier with a specified direction of vertical', () => {
      expect(carrierV.isHorizontal()).toBe(false);
    });
  });
  describe('Hit tests', ()=> {
    test('A Carrier hit at position 5 throws an error since only positions 0-4 are valid', () => {
      expect(() => {
        carrierH.hit(5);
      }).toThrow('Integer provided to .hit() must be less than the length of the ship');
    });
    test('A Carrier hit at position 0 returns [0] as the hit positions', () => {
      expect(carrierH.hit(0)).toEqual([0]);
    });
    test('A Carrier hit in 1/5 positions returns false with .isSunk()', () => {
      expect(carrierH.isSunk()).toBe(false);
    });
    test('A Carrier hit at positions 0, 1 returns [0, 1] as the hit positions', () => {
      expect(carrierH.hit(1)).toEqual([0, 1]);
    });
    test('A Carrier hit in 2/5 positions returns false with .isSunk()', () => {
      expect(carrierH.isSunk()).toBe(false);
    });
    
    test('A Carrier hit at positions 0, 1, 2 returns [0, 1, 2] as the hit positions', () => {
      expect(carrierH.hit(2)).toEqual([0, 1, 2]);
    });
    test('A Carrier hit in 3/5 positions returns false with .isSunk()', () => {
      expect(carrierH.isSunk()).toBe(false);
    });
    
    test('A Carrier hit at positions 0, 1, 2, 3 returns [0, 1, 2, 3] as the hit positions', () => {
      expect(carrierH.hit(3)).toEqual([0, 1, 2, 3]);
    });
    test('A Carrier hit in 4/5 positions returns false with .isSunk()', () => {
      expect(carrierH.isSunk()).toBe(false);
    });
    
    test('A Carrier hit at position 0, 1, 2, 3, 4 returns [0, 1, 2, 3, 4] as the hit positions', () => {
      expect(carrierH.hit(4)).toEqual([0, 1, 2, 3, 4]);
    });
    test('A Carrier hit in 5/5 positions returns true with .isSunk()', () => {
      expect(carrierH.isSunk()).toBe(true);
    });
    
    test('A carrier that is already sunk cannot accept more hits', () => {
      expect(() => {
        carrierH.hit(4)
      }).toThrow('This ship is already sunk');
    });
  });
});
describe('Battleship tests', () => {
  describe('Length', () => {
    test('Creates a Battleship with a length of 4', () => {
      expect(battleshipH.getLength()).toBe(4);
    });
  });
  describe('Direction', () => {
    test('Creates a Battleship with a default direction of horizontal', () => {
      expect(battleshipH.isHorizontal()).toBe(true);
    });
    test('Creates a Battleship with a specified direction of vertical', () => {
      expect(battleshipV.isHorizontal()).toBe(false);
    });
  });
  describe('Hits', () => {
    test('A Battleship hit at position 4 throws an error since only positions 0-3 are valid', () => {
      expect(() => {
        battleshipH.hit(4);
      }).toThrow('Integer provided to .hit() must be less than the length of the ship');
    });
    test('A Battleship hit at position 0 returns [0] as the hit positions', () => {
      expect(battleshipH.hit(0)).toEqual([0]);
    });
    test('A Battleship hit in 1/4 positions returns false with .isSunk()', () => {
      expect(battleshipH.isSunk()).toBe(false);
    });
    
    test('A Battleship hit at positions 0, 1 returns [0, 1] as the hit positions', () => {
      expect(battleshipH.hit(1)).toEqual([0, 1]);
    });
    test('A Battleship hit in 2/4 positions returns false with .isSunk()', () => {
      expect(battleshipH.isSunk()).toBe(false);
    });
    
    test('A Battleship hit at positions 0, 1, 2 returns [0, 1, 2] as the hit positions', () => {
      expect(battleshipH.hit(2)).toEqual([0, 1, 2]);
    });
    test('A Battleship hit in 3/4 positions returns false with .isSunk()', () => {
      expect(battleshipH.isSunk()).toBe(false);
    });
    
    test('A Battleship hit at positions 0, 1, 2, 3 returns [0, 1, 2, 3] as the hit positions', () => {
      expect(battleshipH.hit(3)).toEqual([0, 1, 2, 3]);
    });
    test('A Battleship hit in 4/4 positions returns true with .isSunk()', () => {
      expect(battleshipH.isSunk()).toBe(true);
    });
    
    test('A Battleship that is already sunk cannot accept more hits', () => {
      expect(() => {
        battleshipH.hit(4)
      }).toThrow('This ship is already sunk');
    });
  });
});

describe('Cruiser tests', () => {
  describe('Length', () => {
    test('Creates a Cruiser with a length of 3', () => {
      expect(cruiserH.getLength()).toBe(3);
    });
  });
  describe('Direction', () => {
    test('Creates a Cruiser with a default direction of horizontal', () => {
      expect(cruiserH.isHorizontal()).toBe(true);
    });
    test('Creates a Cruiser with a specified direction of vertical', () => {
      expect(cruiserV.isHorizontal()).toBe(false);
    });
  });
  describe('Hits', () => {
    test('A Cruiser hit at position 3 throws an error since only positions 0-2 are valid', () => {
      expect(() => {
        cruiserH.hit(3);
      }).toThrow('Integer provided to .hit() must be less than the length of the ship');
    });
    test('A Cruiser hit at position 0 returns [0] as the hit positions', () => {
      expect(cruiserH.hit(0)).toEqual([0]);
    });
    test('A Cruiser hit in 1/3 positions returns false with .isSunk()', () => {
      expect(cruiserH.isSunk()).toBe(false);
    });
    
    test('A Cruiser hit at positions 0, 1 returns [0, 1] as the hit positions', () => {
      expect(cruiserH.hit(1)).toEqual([0, 1]);
    });
    test('A Cruiser hit in 2/3 positions returns false with .isSunk()', () => {
      expect(cruiserH.isSunk()).toBe(false);
    });
    
    test('A Cruiser hit at positions 0, 1, 2 returns [0, 1, 2] as the hit positions', () => {
      expect(cruiserH.hit(2)).toEqual([0, 1, 2]);
    });
    test('A Cruiser hit in 3/3 positions returns true with .isSunk()', () => {
      expect(cruiserH.isSunk()).toBe(true);
    });
    
    test('A Cruiser that is already sunk cannot accept more hits', () => {
      expect(() => {
        cruiserH.hit(2)
      }).toThrow('This ship is already sunk');
    });
  });
});

describe('Submarine tests', () => {
  describe('Length', () => {
    test('Creates a Submarine with a length of 3', () => {
      expect(submarineH.getLength()).toBe(3);
    });
  });
  describe('Direction', () => {
    test('Creates a Submarine with a default direction of horizontal', () => {
      expect(submarineH.isHorizontal()).toBe(true);
    });
    test('Creates a Submarine with a specified direction of vertical', () => {
      expect(submarineV.isHorizontal()).toBe(false);
    });
  });
  describe('Hits', () => {
    test('A Submarine hit at position 3 throws an error since only positions 0-2 are valid', () => {
      expect(() => {
        submarineH.hit(3);
      }).toThrow('Integer provided to .hit() must be less than the length of the ship');
    });
    test('A Submarine hit at position 0 returns [0] as the hit positions', () => {
      expect(submarineH.hit(0)).toEqual([0]);
    });
    test('A Submarine hit in 1/3 positions returns false with .isSunk()', () => {
      expect(submarineH.isSunk()).toBe(false);
    });

    test('A Submarine hit at positions 0, 1 returns [0, 1] as the hit positions', () => {
      expect(submarineH.hit(1)).toEqual([0, 1]);
    });
    test('A Submarine hit in 2/3 positions returns false with .isSunk()', () => {
      expect(submarineH.isSunk()).toBe(false);
    });

    test('A Submarine hit at positions 0, 1, 2 returns [0, 1, 2] as the hit positions', () => {
      expect(submarineH.hit(2)).toEqual([0, 1, 2]);
    });
    test('A Submarine hit in 3/3 positions returns true with .isSunk()', () => {
      expect(submarineH.isSunk()).toBe(true);
    });

    test('A Submarine that is already sunk cannot accept more hits', () => {
      expect(() => {
        submarineH.hit(2)
      }).toThrow('This ship is already sunk');
    });
  });
});

describe('Destroyer tests', () => {
  describe('Length', () => {
    test('Creates a Destroyer with a length of 2', () => {
      expect(destroyerH.getLength()).toBe(2);
    });
  })
  describe('Direction', () => {
    test('Creates a Destroyer with a default direction of horizontal', () => {
      expect(destroyerH.isHorizontal()).toBe(true);
    });
    test('Creates a Destroyer with a specified direction of vertical', () => {
      expect(destroyerV.isHorizontal()).toBe(false);
    });
  });
  describe('Hits', () => {
    test('A Destroyer hit at position 2 throws an error since only positions 0-1 are valid', () => {
      expect(() => {
        destroyerH.hit(2);
      }).toThrow('Integer provided to .hit() must be less than the length of the ship');
    });
    test('A Destroyer hit at position 0 returns [0] as the hit positions', () => {
      expect(destroyerH.hit(0)).toEqual([0]);
    });
    test('A Destroyer hit in 1/2 positions returns false with .isSunk()', () => {
      expect(destroyerH.isSunk()).toBe(false);
    });
  
    test('A Destroyer hit at positions 0, 1 returns [0, 1] as the hit positions', () => {
      expect(destroyerH.hit(1)).toEqual([0, 1]);
    });
    test('A Destroyer hit in 2/2 positions returns true with .isSunk()', () => {
      expect(destroyerH.isSunk()).toBe(true);
    });
  
    test('A Destroyer that is already sunk cannot accept more hits', () => {
      expect(() => {
        destroyerH.hit(2)
      }).toThrow('This ship is already sunk');
    });
  });
});

describe('Player tests', () => {
  describe('Human Player tests', () => {
    test('Human player object returns correct type', () => {
      expect(playerHuman.isHuman()).toBe(true);
    });
  });
  describe('AI Player tests', () => {
    test('AI player object returns correct type', () => {
      expect(playerAI.isHuman()).toBe(false);
    });
  })
});

describe('Gameboard tests', () => {
  describe('Horizontal placement', () => {
    describe('Carrier - Should occupy 1 row and 5 columns', () => {
      beforeAll(() => {
        gameboardH.placeShip(0, 0, carrierH);
      });
      describe('Placing carrier horizontally at R0C0 creates object references at R0C0, R0C1, R0C2, R0C3, R0C4', () => {
        describe('shipType', () => {
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "carrier"', () => {
            expect(gameboardH.getBoard()[0][0][0].shipType).toBe('carrier');
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C1 w/ .shipType value of "carrier"', () => {
            expect(gameboardH.getBoard()[0][1][0].shipType).toBe('carrier');
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C2 w/ .shipType value of "carrier"', () => {
            expect(gameboardH.getBoard()[0][2][0].shipType).toBe('carrier');
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C3 w/ .shipType value of "carrier"', () => {
            expect(gameboardH.getBoard()[0][3][0].shipType).toBe('carrier');
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C4 w/ .shipType value of "carrier"', () => {
            expect(gameboardH.getBoard()[0][4][0].shipType).toBe('carrier');
          });
        });
        describe('shipPosition', () => {
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardH.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C1 w/ .shipPosition value of 1', () => {
            expect(gameboardH.getBoard()[0][1][0].shipPosition).toBe(1);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C2 w/ .shipPosition value of 2', () => {
            expect(gameboardH.getBoard()[0][2][0].shipPosition).toBe(2);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C3 w/ .shipPosition value of 3', () => {
            expect(gameboardH.getBoard()[0][3][0].shipPosition).toBe(3);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C4 w/ .shipPosition value of 4', () => {
            expect(gameboardH.getBoard()[0][4][0].shipPosition).toBe(4);
          });
        });
        describe('isHit', () => {
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C1 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][1][0].isHit).toBe(false);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C2 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][2][0].isHit).toBe(false);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C3 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][3][0].isHit).toBe(false);
          });
          test('Horizontal carrier placed at coordinates R0C0 has object reference in R0C4 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][4][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardH.removeShip(0, 0, carrierH);
      })
    });
    describe('Battleship - Should occupy 1 row and 4 columns', () => {
      beforeAll(() => {
        gameboardH.placeShip(0, 0, battleshipH);
      });
      describe('Placing battleship horizontally at R0C0 creates object references at R0C0, R0C1, R0C2, R0C3', () => {
        describe('shipType', () => {
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "battleship"', () => {
            expect(gameboardH.getBoard()[0][0][0].shipType).toBe('battleship');
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C1 w/ .shipType value of "battleship"', () => {
            expect(gameboardH.getBoard()[0][1][0].shipType).toBe('battleship');
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C2 w/ .shipType value of "battleship"', () => {
            expect(gameboardH.getBoard()[0][2][0].shipType).toBe('battleship');
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C3 w/ .shipType value of "battleship"', () => {
            expect(gameboardH.getBoard()[0][3][0].shipType).toBe('battleship');
          });
        });
        describe('shipPosition', () => {
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardH.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C1 w/ .shipPosition value of 1', () => {
            expect(gameboardH.getBoard()[0][1][0].shipPosition).toBe(1);
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C2 w/ .shipPosition value of 2', () => {
            expect(gameboardH.getBoard()[0][2][0].shipPosition).toBe(2);
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C3 w/ .shipPosition value of 3', () => {
            expect(gameboardH.getBoard()[0][3][0].shipPosition).toBe(3);
          });
        });
        describe('isHit', () => {
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C1 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][1][0].isHit).toBe(false);
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C2 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][2][0].isHit).toBe(false);
          });
          test('Horizontal battleship placed at coordinates R0C0 has object reference in R0C3 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][3][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardH.removeShip(0, 0, battleshipH);
      });
    });
    describe('Cruiser - Should occupy 1 row and 3 columns', () => {
      beforeAll(() => {
        gameboardH.placeShip(0, 0, cruiserH);
      });
      describe('Placing cruiser horizontally at R0C0 creates object references at R0C0, R0C1, R0C2', () => {
        describe('shipType', () => {
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "cruiser"', () => {
            expect(gameboardH.getBoard()[0][0][0].shipType).toBe('cruiser');
          });
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C1 w/ .shipType value of "cruiser"', () => {
            expect(gameboardH.getBoard()[0][1][0].shipType).toBe('cruiser');
          });
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C2 w/ .shipType value of "cruiser"', () => {
            expect(gameboardH.getBoard()[0][2][0].shipType).toBe('cruiser');
          });
        });
        describe('shipPosition', () => {
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardH.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C1 w/ .shipPosition value of 1', () => {
            expect(gameboardH.getBoard()[0][1][0].shipPosition).toBe(1);
          });
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C2 w/ .shipPosition value of 2', () => {
            expect(gameboardH.getBoard()[0][2][0].shipPosition).toBe(2);
          });
        });
        describe('isHit', () => {
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C1 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][1][0].isHit).toBe(false);
          });
          test('Horizontal cruiser placed at coordinates R0C0 has object reference in R0C2 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][2][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardH.removeShip(0, 0, submarineH);
      });
    });
    describe('Submarine - Should occupy 1 row and 3 columns', () => {
      beforeAll(() => {
        gameboardH.placeShip(0, 0, submarineH);
      });
      describe('Placing submarine horizontally at R0C0 creates object references at R0C0 and R0C1', () => {
        describe('shipType', () => {
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "submarine"', () => {
            expect(gameboardH.getBoard()[0][0][0].shipType).toBe('submarine');
          });
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C1 w/ .shipType value of "submarine"', () => {
            expect(gameboardH.getBoard()[0][1][0].shipType).toBe('submarine');
          });
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C2 w/ .shipType value of "submarine"', () => {
            expect(gameboardH.getBoard()[0][2][0].shipType).toBe('submarine');
          });
        });
        describe('shipPosition', () => {
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardH.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C1 w/ .shipPosition value of 1', () => {
            expect(gameboardH.getBoard()[0][1][0].shipPosition).toBe(1);
          });
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C2 w/ .shipPosition value of 2', () => {
            expect(gameboardH.getBoard()[0][2][0].shipPosition).toBe(2);
          });
        });
        describe('isHit', () => {
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C1 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][1][0].isHit).toBe(false);
          });
          test('Horizontal submarine placed at coordinates R0C0 has object reference in R0C2 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][2][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardH.removeShip(0, 0, submarineH);
      });
    });
    describe('Destroyer - Should occupy 1 row and 2 columns', () => {
      beforeAll(() => {
        gameboardH.placeShip(0, 0, destroyerH);
      });
      describe('Placing destroyer horizontally at R0C0 creates object references at R0C0 and R0C1', () => {
        describe('shipType', () => {
          test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "destroyer"', () => {
            expect(gameboardH.getBoard()[0][0][0].shipType).toBe('destroyer');
          });
          test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C1 w/ .shipType value of "destroyer"', () => {
            expect(gameboardH.getBoard()[0][1][0].shipType).toBe('destroyer');
          });
        });
        describe('shipPosition', () => {
          test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardH.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C1 w/ .shipPosition value of 1', () => {
            expect(gameboardH.getBoard()[0][1][0].shipPosition).toBe(1);
          });
        });
        describe('isHit', () => {
          test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C1 w/ .isHit value of false', () => {
            expect(gameboardH.getBoard()[0][1][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardH.removeShip(0, 0, destroyerH);
      });
    });
  });
  describe('Vertical placement', () => {
    describe('Carrier - Should occupy 5 rows and 1 colummn', () => {
      beforeAll(() => {
        gameboardV.placeShip(0, 0, carrierV);
      });
      describe('Placing carrier horizontally at R0C0 creates object references at R0C0 and R1C0', () => {
        describe('shipType', () => {
          test('Vertical carrier placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "carrier"', () => {
            expect(gameboardV.getBoard()[0][0][0].shipType).toBe('carrier');
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R1C0 w/ .shipType value of "carrier"', () => {
            expect(gameboardV.getBoard()[1][0][0].shipType).toBe('carrier');
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R2C0 w/ .shipType value of "carrier"', () => {
            expect(gameboardV.getBoard()[2][0][0].shipType).toBe('carrier');
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R3C0 w/ .shipType value of "carrier"', () => {
            expect(gameboardV.getBoard()[3][0][0].shipType).toBe('carrier');
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R4C0 w/ .shipType value of "carrier"', () => {
            expect(gameboardV.getBoard()[4][0][0].shipType).toBe('carrier');
          });
        });
        describe('shipPosition', () => {
          test('Vertical carrier placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardV.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R1C0 w/ .shipPosition value of 1', () => {
            expect(gameboardV.getBoard()[1][0][0].shipPosition).toBe(1);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R2C0 w/ .shipPosition value of 2', () => {
            expect(gameboardV.getBoard()[2][0][0].shipPosition).toBe(2);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R3C0 w/ .shipPosition value of 3', () => {
            expect(gameboardV.getBoard()[3][0][0].shipPosition).toBe(3);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R4C0 w/ .shipPosition value of 4', () => {
            expect(gameboardV.getBoard()[4][0][0].shipPosition).toBe(4);
          });
        });
        describe('isHit', () => {
          test('Vertical carrier placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R1C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[1][0][0].isHit).toBe(false);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R2C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[2][0][0].isHit).toBe(false);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R3C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[3][0][0].isHit).toBe(false);
          });
          test('Vertical carrier placed at coordinates R0C0 has object reference in R4C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[4][0][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardV.removeShip(0, 0, carrierV);
      });
    });
    describe('Battleship - Should occupy 4 rows and 1 colummn', () => {
      beforeAll(() => {
        gameboardV.placeShip(0, 0, battleshipV);
      });
      describe('Placing battleship horizontally at R0C0 creates object references at R0C0 and R1C0', () => {
        describe('shipType', () => {
          test('Vertical battleship placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "battleship"', () => {
            expect(gameboardV.getBoard()[0][0][0].shipType).toBe('battleship');
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R1C0 w/ .shipType value of "battleship"', () => {
            expect(gameboardV.getBoard()[1][0][0].shipType).toBe('battleship');
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R2C0 w/ .shipType value of "battleship"', () => {
            expect(gameboardV.getBoard()[2][0][0].shipType).toBe('battleship');
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R3C0 w/ .shipType value of "battleship"', () => {
            expect(gameboardV.getBoard()[3][0][0].shipType).toBe('battleship');
          });
        });
        describe('shipPosition', () => {
          test('Vertical battleship placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardV.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R1C0 w/ .shipPosition value of 1', () => {
            expect(gameboardV.getBoard()[1][0][0].shipPosition).toBe(1);
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R2C0 w/ .shipPosition value of 2', () => {
            expect(gameboardV.getBoard()[2][0][0].shipPosition).toBe(2);
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R3C0 w/ .shipPosition value of 3', () => {
            expect(gameboardV.getBoard()[3][0][0].shipPosition).toBe(3);
          });
        });
        describe('isHit', () => {
          test('Vertical battleship placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R1C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[1][0][0].isHit).toBe(false);
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R2C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[2][0][0].isHit).toBe(false);
          });
          test('Vertical battleship placed at coordinates R0C0 has object reference in R3C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[3][0][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardV.removeShip(0, 0, battleshipV);
      });
    });
    describe('Cruiser - Should occupy 3 rows and 1 colummn', () => {
      beforeAll(() => {
        gameboardV.placeShip(0, 0, cruiserV);
      });
      describe('Placing cruiser horizontally at R0C0 creates object references at R0C0 and R1C0', () => {
        describe('shipType', () => {
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "cruiser"', () => {
            expect(gameboardV.getBoard()[0][0][0].shipType).toBe('cruiser');
          });
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R1C0 w/ .shipType value of "cruiser"', () => {
            expect(gameboardV.getBoard()[1][0][0].shipType).toBe('cruiser');
          });
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R2C0 w/ .shipType value of "cruiser"', () => {
            expect(gameboardV.getBoard()[2][0][0].shipType).toBe('cruiser');
          });
        });
        describe('shipPosition', () => {
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardV.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R1C0 w/ .shipPosition value of 1', () => {
            expect(gameboardV.getBoard()[1][0][0].shipPosition).toBe(1);
          });
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R2C0 w/ .shipPosition value of 2', () => {
            expect(gameboardV.getBoard()[2][0][0].shipPosition).toBe(2);
          });
        });
        describe('isHit', () => {
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R1C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[1][0][0].isHit).toBe(false);
          });
          test('Vertical cruiser placed at coordinates R0C0 has object reference in R2C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[2][0][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardV.removeShip(0, 0, cruiserV);
      });
    });
    describe('Submarine - Should occupy 3 rows and 1 colummn', () => {
      beforeAll(() => {
        gameboardV.placeShip(0, 0, submarineV);
      });
      describe('Placing submarine horizontally at R0C0 creates object references at R0C0 and R1C0', () => {
        describe('shipType', () => {
          test('Vertical submarine placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "submarine"', () => {
            expect(gameboardV.getBoard()[0][0][0].shipType).toBe('submarine');
          });
          test('Vertical submarine placed at coordinates R0C0 has object reference in R1C0 w/ .shipType value of "submarine"', () => {
            expect(gameboardV.getBoard()[1][0][0].shipType).toBe('submarine');
          });
          test('Vertical submarine placed at coordinates R0C0 has object reference in R2C0 w/ .shipType value of "submarine"', () => {
            expect(gameboardV.getBoard()[2][0][0].shipType).toBe('submarine');
          });
        });
        describe('shipPosition', () => {
          test('Vertical submarine placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardV.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Vertical submarine placed at coordinates R0C0 has object reference in R1C0 w/ .shipPosition value of 0', () => {
            expect(gameboardV.getBoard()[1][0][0].shipPosition).toBe(1);
          });
          test('Vertical submarine placed at coordinates R0C0 has object reference in R2C0 w/ .shipPosition value of 0', () => {
            expect(gameboardV.getBoard()[2][0][0].shipPosition).toBe(2);
          });
        });
        describe('isHit', () => {
          test('Vertical submarine placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Vertical submarine placed at coordinates R0C0 has object reference in R1C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[1][0][0].isHit).toBe(false);
          });
          test('Vertical submarine placed at coordinates R0C0 has object reference in R2C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[2][0][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardV.removeShip(0, 0, submarineV);
      });
    });
    describe('Destroyer - Should occupy 2 rows and 1 colummn', () => {
      beforeAll(() => {
        gameboardV.placeShip(0, 0, destroyerV);
      });
      describe('Placing destroyer horizontally at R0C0 creates object references at R0C0 and R1C0', () => {
        describe('shipType', () => {
          test('Vertical destroyer placed at coordinates R0C0 has object reference in R0C0 w/ .shipType value of "destroyer"', () => {
            expect(gameboardV.getBoard()[0][0][0].shipType).toBe('destroyer');
          });
          test('Vertical destroyer placed at coordinates R0C0 has object reference in R1C0 w/ .shipType value of "destroyer"', () => {
            expect(gameboardV.getBoard()[1][0][0].shipType).toBe('destroyer');
          });
        });
        describe('shipPosition', () => {
          test('Vertical destroyer placed at coordinates R0C0 has object reference in R0C0 w/ .shipPosition value of 0', () => {
            expect(gameboardV.getBoard()[0][0][0].shipPosition).toBe(0);
          });
          test('Vertical destroyer placed at coordinates R0C0 has object reference in R1C0 w/ .shipPosition value of 1', () => {
            expect(gameboardV.getBoard()[1][0][0].shipPosition).toBe(1);
          });
        });
        describe('isHit', () => {
          test('Vertical destroyer placed at coordinates R0C0 has object reference in R0C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[0][0][0].isHit).toBe(false);
          });
          test('Vertical destroyer placed at coordinates R0C0 has object reference in R1C0 w/ .isHit value of false', () => {
            expect(gameboardV.getBoard()[1][0][0].isHit).toBe(false);
          });
        });
      });
      afterAll(() => {
        gameboardV.removeShip(0, 0, destroyerV);
      });
    });
  });
  describe('Duplicate ship types', () => {

  });
  describe('Overlap tests', () => {

  });
  describe('Out of Bounds tests', () => {

  });
  describe('Gameboard.allShipsSunk()', () => {

    const gameboardSinkTest = Gameboard();

    const carrierToSink = Ship('carrier');
    const battleshipToSink = Ship('battleship');
    const cruiserToSink = Ship('cruiser');
    const submarineToSink = Ship('submarine');
    const destroyerToSink = Ship('destroyer');

    function sink(ship) {
      for (let i=0; i < ship.getLength(); i++) {
        ship.hit(i);
      };
    }


    test('Having 1 ship on the board and calling .allShipsSunk throws an error', () => {
      gameboardSinkTest.placeShip(0, 0, carrierToSink);
      expect(() => {
        gameboardSinkTest.allShipsSunk()
      }).toThrow('Not enough ships on the board!');
    });
    test('Having 2 ships on the board and calling .allShipsSunk throws an error', () => {
      gameboardSinkTest.placeShip(1, 0, battleshipToSink);
      expect(() => {
        gameboardSinkTest.allShipsSunk()
      }).toThrow('Not enough ships on the board!');
    });
    test('Having 3 ships on the board and calling .allShipsSunk throws an error', () => {
      gameboardSinkTest.placeShip(2, 0, cruiserToSink);
      expect(() => {
        gameboardSinkTest.allShipsSunk()
      }).toThrow('Not enough ships on the board!');
    });
    test('Having 4 ship on the board and calling .allShipsSunk throws an error', () => {
      gameboardSinkTest.placeShip(3, 0, submarineToSink);
      expect(() => {
        gameboardSinkTest.allShipsSunk()
      }).toThrow('Not enough ships on the board!');
    });
    test('Having 5 ships on the board and calling .allShipsSunk returns false unless they are all sunk', () => {
      gameboardSinkTest.placeShip(4, 0, destroyerToSink);
      expect(gameboardSinkTest.allShipsSunk()).toBe(false);
    });
  });
});
