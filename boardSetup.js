//Creates the initial gameboard
window.gameBoard = makeGameBoard(9);

//This method is for resetting the rest of the board once a piece has been moved 
gameBoard.rebuildBoard = function (color1, color2) {
	if(!color1 || !color2){
		color1 = "white"
		color2 = "purple"
	}

	//Toggle the gameboard off
  gameBoard.isClicked = false;

  myEach(gameBoard, function (row,rowNum) {
    myEach(row, function (square, sqrNum) {
      //set toggle off on every square
      square.isClicked = false;
      //Recolor each square accordingly
      if((square.position[0] + square.position[1]) % 2 === 0) 
         square.color = color1;
      else square.color = color2;
    })

})}

//first turn belongs to player one, even turnCount means it is player1's turn, odd is for player2.
gameBoard.turnCount = 0;

//set player scores to zero at the beginning of the game.
player1Score = 0;
player2Score = 0;
