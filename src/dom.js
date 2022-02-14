const styleGameboard = (gameboardObj, human) => {
  const gameboard = gameboardObj.getBoard();
  const gameboardDOMBoards = document.querySelectorAll('.gb');
  let gameboardDOM;
  if (human) {
    gameboardDOM  = gameboardDOMBoards[0];
  } else {
    gameboardDOM = gameboardDOMBoards[1];
  }
  for (let rowNum=0; rowNum < gameboard.length; rowNum++) {
    for (let colNum=0; colNum < gameboard.length; colNum++) {
      if (gameboardObj.containsShip(rowNum, colNum)) {
        // get dom element
        // increment row num by one because first row is headers
        const gameboardDOMRow = gameboardDOM.querySelectorAll('.gb-row')[rowNum+1];
        const gameboardDOMCell = gameboardDOM.querySelectorAll('.gb-row')[rowNum+1].querySelectorAll('.gb-cell')[colNum];
        gameboardDOMCell.innerText = 'spam';
      }
    }
  }
}

export default {
  styleGameboard,
}