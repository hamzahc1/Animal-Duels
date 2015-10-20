
//Toggles board, and  highlights the squares that player 1 can move to on this turn.
gameBoard.player1Highlight = function (gameBoard , rowNum , columnNum) {
//define clicked as the square that was clicked.
var clicked = gameBoard[rowNum][columnNum];
  

    //if it's player ones turn
    if(gameBoard.turnCount % 2 === 0) {
      if (!gameBoard.isClicked) {
          //if it isnt clicked 

          //toggle set to true
          gameBoard.isClicked = true;
          
          //If the piece is a super piece, it should be able to move in any direction
        if(clicked.gamePiece.typeOfPiece === "super"){
          //if there is a square there.
          if (rowNum !== 0 && gameBoard[rowNum - 1][columnNum - 1]) {
            //color the square grey and set the piece object as a property on it.
            gameBoard[rowNum - 1][columnNum - 1].color = 'grey';
            gameBoard[rowNum - 1][columnNum - 1].pieceToMove = clicked.gamePiece;
          }
          //repeat for each direction
          if (rowNum !== 0 && gameBoard[rowNum - 1][columnNum + 1]) {
            
            gameBoard[rowNum - 1][columnNum + 1].color = 'grey';
            gameBoard[rowNum - 1][columnNum + 1].pieceToMove = clicked.gamePiece;
          }

          if (rowNum !== 8 && gameBoard[rowNum + 1][columnNum - 1]) {

            gameBoard[rowNum + 1][columnNum - 1].color = 'grey';
            gameBoard[rowNum + 1][columnNum - 1].pieceToMove = clicked.gamePiece;
          }

          if (rowNum !== 8 && gameBoard[rowNum + 1][columnNum + 1]) {
            
            gameBoard[rowNum + 1][columnNum + 1].color = 'grey';
            gameBoard[rowNum + 1][columnNum + 1].pieceToMove = clicked.gamePiece;
          }
          //Else if the piece is not a super piece, it can only move forward
        } else {
          if (rowNum !== 0 && gameBoard[rowNum - 1][columnNum - 1]) {

            gameBoard[rowNum - 1][columnNum - 1].color = 'grey';
            gameBoard[rowNum - 1][columnNum - 1].pieceToMove = clicked.gamePiece;
          }

          if (rowNum !== 0 && gameBoard[rowNum - 1][columnNum + 1]) {
            
            gameBoard[rowNum - 1][columnNum + 1].color = 'grey';
            gameBoard[rowNum - 1][columnNum + 1].pieceToMove = clicked.gamePiece;
          }

        }           

      } else {

          // If any piece/board is clicked on turn it off and reset the board
          gameBoard.isClicked = false;
          gameBoard.rebuildBoard();
          console.log("toggle off")
      
      }
    }
  renderGameBoard(gameBoard);
}

//Highlights the squares player2 can move to (similar to player 1's highlight feature!)
gameBoard.player2Highlight = function (gameBoard , rowNum , columnNum) {
  console.log('player 2 clicked')
var clicked = gameBoard[rowNum][columnNum];
  

  //If it is player2's turn
    if(gameBoard.turnCount % 2 !== 0) {
      if (!gameBoard.isClicked) {
          //if it isnt clicked 

          //toggle set to on/true
          gameBoard.isClicked = true;
          

        if(clicked.gamePiece.typeOfPiece === "super"){

          if (rowNum !== 0 && gameBoard[rowNum - 1][columnNum - 1]) {

            gameBoard[rowNum - 1][columnNum - 1].color = 'grey';
            gameBoard[rowNum - 1][columnNum - 1].pieceToMove = clicked.gamePiece;
          }
          
          if (rowNum !== 0 && gameBoard[rowNum - 1][columnNum + 1]) {
            
            gameBoard[rowNum - 1][columnNum + 1].color = 'grey';
            gameBoard[rowNum - 1][columnNum + 1].pieceToMove = clicked.gamePiece;
          }

          if (rowNum !== 8 && gameBoard[rowNum + 1][columnNum - 1]) {

            gameBoard[rowNum + 1][columnNum - 1].color = 'grey';
            gameBoard[rowNum + 1][columnNum - 1].pieceToMove = clicked.gamePiece;
          }
         
          if (rowNum !== 8 && gameBoard[rowNum + 1][columnNum + 1]) {
            
            gameBoard[rowNum + 1][columnNum + 1].color = 'grey';
            gameBoard[rowNum + 1][columnNum + 1].pieceToMove = clicked.gamePiece;
          }
        } 
        //Else if it is not a super piece, piece can only move one space forward (which is one row down in the index)
        else {
          if (rowNum !== 8 && gameBoard[rowNum + 1][columnNum - 1]) {

            gameBoard[rowNum + 1][columnNum - 1].color = 'grey';
            gameBoard[rowNum + 1][columnNum - 1].pieceToMove = clicked.gamePiece;
          }

          if (rowNum !== 8 && gameBoard[rowNum + 1][columnNum + 1]) {
            
            gameBoard[rowNum + 1][columnNum + 1].color = 'grey';
            gameBoard[rowNum + 1][columnNum + 1].pieceToMove = clicked.gamePiece;
          }

        }           

      } else {

          // If any piece/board is clicked on turn it off and reset the board
          gameBoard.isClicked = false;
          gameBoard.rebuildBoard();
          console.log("toggle off")
      
      }
    }
  renderGameBoard(gameBoard);
}


//Set up the initial position of the pieces 

var defaultPieces = function (img1, img2) {
  // iterate through each row and each square on that row
    myEach(gameBoard, function (row,rowNum){
      myEach(row, function (square,sqrNum) {

      // If on the last 3 rows assign the pieces to player one, attach the highlight method to the piece here.
        if (rowNum >= 6) { 
          // only assign every other square a piece
          if ( (rowNum + sqrNum) % 2 === 0 ) makePiece(gameBoard, [rowNum,sqrNum], 'normal' , 'player1' , gameBoard.player1Highlight, img1);
          //if on the first 3 rows, assign pieces for player 2
        } else if (rowNum <= 2) {
          //only on every other square
          if ( (rowNum + sqrNum) % 2 === 0 ) makePiece(gameBoard, [rowNum,sqrNum], 'normal' , 'player2' , gameBoard.player2Highlight, img2);        }
      })
  })
}

//This initializes the board and sets the pieces with default clip art photos for each team! 
defaultPieces("http://www.cliparthut.com/clip-arts/529/penguin-clip-art-529942.png", "http://cronaldofan.mobi/wp-content/uploads/baby-lion-face-clip-art-hd-images-4.png"  );




