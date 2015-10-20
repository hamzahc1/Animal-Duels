      // When a user clicks on a square, it will invoke a function on the global scope called 'clickHandler'. 

      window.clickHandler = function(positionArr) {
        //define variables to aid legibility
        var rowClicked = positionArr[0];
        var columnClicked = positionArr[1];
        var clicked = gameBoard[rowClicked][columnClicked];
        //old stores the details of the piece that will move
        var old = clicked.pieceToMove
        console.log('the user clicked on square:', gameBoard[rowClicked][columnClicked]);

        //  If the user clicks an unhighlighted square, alerts them that this is an illegal move.

        if (gameBoard.isClicked && clicked.color !== 'grey' && !clicked.gamePiece) return alert('By the laws of animal duels, that is an illegal move!! You have to click on one of the grey highlighted squares.');

        //  if the clicked square has a piece on it, highlight the squares that can be moved to(If one of the options to move is a square with another piece on it, it will not highlight due to the fact the clipart images overwrite the color change on a square)

        if (clicked.gamePiece) {
          clicked.gamePiece.highlight(gameBoard,rowClicked,columnClicked);
        }
        //  if the user clicks a grey square move the piece there.
        if (clicked.color === 'grey') {

          // If its player1's turn give them a point for taking player 2's piece.
          if (gameBoard.turnCount % 2 === 0) {
          // If the other team had a piece on the grey square remove it and replace with new "super" piece qualities
            if (clicked.gamePiece.playerBelongsTo === "player2") {
              old.imageURL = "http://www.sevenoaksart.co.uk/images/penguinwalk2.gif";
              old.typeOfPiece = "super";
              player1Score++;

              //Alert the user that they have taken oppositions piece and provide updated scores.
            alert("Score for the penguins!! \nThe Penguins get one point and have gained a super penguin (These pieces can move forwards and backwards! He can move in any direction!\nThe Lions have lost their piece and must make every move count...\n\nPenguins Score: " + player1Score + "\nLions Score: " + player2Score);
            };

          // otherwise it is player2's turn and give them a point if they take player 1's piece and replace the piece with new "super" piece qualities.
          } else if (clicked.gamePiece.playerBelongsTo === "player1") {
            old.imageURL = "http://www.picgifs.com/animal-graphics/animal-graphics/lions/animal-graphics-lions-639794.gif";
            old.typeOfPiece = "super";
            player2Score++;

            //Alert the user that they have taken oppositions piece and provide updated scores.
            alert("The Lions have taken down a penguin :( \nThe Lions get one point and have gained a boxing lion!! Look out, he can move in any direction!\nThe Penguins lose their fallen comrade and must now make a move\n\nPenguins Score: " + player1Score + "\nLions Score: " + player2Score);
          };
          //after alerting the change in score we execute the piece change.

          //  make a new piece on the new square which over-writes the conquered piece that was there.
          clicked.gamePiece = makePiece(gameBoard , clicked.position , old.typeOfPiece , old.playerBelongsTo , old.highlight , old.imageURL);
          //  delete the piece that was moved.
          gameBoard[old.pos[0]][old.pos[1]].gamePiece = "";
          // Reset that square's piecetomove property
          clicked.pieceToMove = "";
          // Check if crazyboard has been selected, if so, rebuild the board with random colors and if not, rebuild the board using the normal color scheme.
          
          if(crazyBoard === true){
          gameBoard.rebuildBoard("white",randomColor());
          } else {
          gameBoard.rebuildBoard();
                }

          // switch turns to the next player by increasing the turn count
          gameBoard.turnCount++;
          //logs player ones turn is true/false
          console.log('player1 turn is ' + (gameBoard.turnCount % 2 === 0))
          
        } 

        console.log('gameboard toggle is: ', gameBoard.isClicked)
        renderGameBoard(gameBoard);
        //If any player reaches 14 (the total number of pieces for each player), then alert them that they are the winners and then reload the page to restart the game.
          if(player1Score === 14 || player2Score === 14){
                alert("And we have a WINNER!!! Congratulations champ, now hit ok to give your opponents another chance!");
                location.reload(true);
          }
      };

