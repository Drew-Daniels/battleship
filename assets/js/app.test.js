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
  // direction
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
    test('A Carrier hit at position 0 returns [0] as the hit position', () => {
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
    test('A Battleship hit at position 0 returns [0] as the hit position', () => {
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

// Cruisers
describe('Cruiser tests', () => {
  describe('Length', () => {
    test('Creates a Cruiser with a length of 3', () => {
      expect(cruiserH.getLength()).toBe(3);
    });
  })
  describe('Direction', () => {
  // direction
  test('Creates a Cruiser with a default direction of horizontal', () => {
    expect(cruiserH.isHorizontal()).toBe(true);
  });
  test('Creates a Cruiser with a specified direction of vertical', () => {
    expect(cruiserV.isHorizontal()).toBe(false);
  });
  })
  describe('Hits', () => {
    test('A Cruiser hit at position 3 throws an error since only positions 0-2 are valid', () => {
      expect(() => {
        cruiserH.hit(3);
      }).toThrow('Integer provided to .hit() must be less than the length of the ship');
    });
    test('A Cruiser hit at position 0 returns [0] as the hit position', () => {
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
  })
  describe('Direction', () => {
  // direction
  test('Creates a Submarine with a default direction of horizontal', () => {
    expect(submarineH.isHorizontal()).toBe(true);
  });
  test('Creates a Submarine with a specified direction of vertical', () => {
    expect(submarineV.isHorizontal()).toBe(false);
  });
  })
  describe('Hits', () => {
    // hit
    test('A Submarine hit at position 3 throws an error since only positions 0-2 are valid', () => {
      expect(() => {
        submarineH.hit(3);
      }).toThrow('Integer provided to .hit() must be less than the length of the ship');
    });
    test('A Submarine hit at position 0 returns [0] as the hit position', () => {
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
    // direction
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
    test('A Destroyer hit at position 0 returns [0] as the hit position', () => {
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

// PLAYER tests
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

// GAMEBOARD tests
describe('Gameboard tests', () => {
  beforeAll(() => {
    gameboardHuman.placeShip(0,0, destroyerH);
  });
  describe('Placing destroyer horizontally at R0C0 creates object references at R0C0 and R0C1', () => {
    // ship types
    test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C0', () => {
      expect(gameboardHuman.getBoard()[0][0][0].shipType).toBe('destroyer');
    })
    test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C1', () => {
      expect(gameboardHuman.getBoard()[0][1][0].shipType).toBe('destroyer');
    })
    // ship positions
    test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C0', () => {
      expect(gameboardHuman.getBoard()[0][0][0].shipPosition).toBe(0);
    })
    test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C1', () => {
      expect(gameboardHuman.getBoard()[0][1][0].shipPosition).toBe(1);
    })
    test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C0', () => {
      expect(gameboardHuman.getBoard()[0][0][0].isHit).toBe(false);
    })
    test('Horizontal destroyer placed at coordinates R0C0 has object reference in R0C1', () => {
      expect(gameboardHuman.getBoard()[0][1][0].isHit).toBe(false);
    });
  });
});
