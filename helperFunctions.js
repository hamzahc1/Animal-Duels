
//Function to initialise the gameboard
var makeGameBoard = function(boardSize) {
  var board = [];

  // The board is made up of an array of arrays
  for(var i = 0; i < boardSize; i++) {
    var row = [];
    for(var j = 0; j < boardSize; j++) {
      var white = 'white'; 
      var purple = 'purple';
      //set an initial pattern of alternating colors on each square. 
      if ( (i + j) % 2 === 0 ) {
        var color = white; 
      } else {
        color = purple;  
      }
      //each square (position on the board) is represented by an object. 
      var square = {
        position: [i, j],
        color: color,
        gamePiece: "", // This property will contain our gamePiece object if one is on that square. 
        text: ""
      };
      row.push(square);
    }
    board.push(row);
  }

  return board;
};

var renderGameBoard = function(gameBoard) {
  $('.gameBoard').html('');
  var boardSize = gameBoard.length;
  // We scale the gameBoard to the user's screen
  var browserSize = Math.min($(window).height(), $(window).width());
  $('.gameBoard').width(browserSize - 110);
  // then we leave some room around the edges and divide by the number of squares to find how large the squares should be to fill that space perfectly. 
  var squareSize = (browserSize- 110) / boardSize - 2;
  gameBoard.forEach(function(rowArr, rowIndex) {
    rowArr.forEach(function(squareObj, columnIndex) {
      
        // We're setting it's background color to be the color of that squareObj. 
      // To keep track of which square this is (necessary for figuring out which square was clicked on later), we set a data "property" on each square as well. 
      // Inside of each div we put in the text from the object at that position, if one exists. 

      if(squareObj.gamePiece && squareObj.gamePiece.imageURL) {
        var squareHtml = '<img src="' + squareObj.gamePiece.imageURL + '" class="gameSquare" style="height:' + squareSize + 'px; width:' + squareSize + 'px" data-position="[' + rowIndex + ',' + columnIndex + ']">'
      } else {
        var squareText = '';
        if(squareObj.gamePiece) {
          squareText = squareObj.gamePiece.name;
        }
        var squareHtml = '<div class="gameSquare" style="background-color:' + squareObj.color + '; height:' + squareSize + 'px; width:' + squareSize + 'px" data-position="[' + rowIndex + ',' + columnIndex + ']">' + squareText + '</div>';
      }
      $('.gameBoard').append(squareHtml);
    });
  });

}

//Accessing the clickhandler here
$(document).on('click', '.gameSquare', function() {
  clickHandler($(this).data('position'));
});

//here we're going to keep track of the count of all pieces added to our gameBoard. 
var totalPieceCount = {};

//initialPosition represent the starting position for each piece.
var makePiece = function(gameBoard, initialPosition, pieceType, playerBelongsTo , highlight , imageURL) {
  // Increase the total Piece count by 1 for each piece 
  if(totalPieceCount[pieceType]) {
    totalPieceCount[pieceType]++;
  } else {
    totalPieceCount[pieceType] = 1;
  }

  // default player to Player1 if no player name is passed in, then defines a unique name for this gamePiece 
  playerBelongsTo = playerBelongsTo || 'Player1';
  var pieceName = playerBelongsTo + ' ' + pieceType + ' #' + totalPieceCount[pieceType];

//This object outlines the properties of squares with game pieces on them, outlining their descriptions and image properties as well as which team they belong to.
  var gamePiece = {
    movementDescription: 'Moves diagonally one space forward',
    collisionDescription: 'The capturing piece earns a point for their team, the opposition loses the captured piece!',
    name: pieceName,
    typeOfPiece: pieceType,
    imageURL: imageURL,
    pos: initialPosition,
    highlight: highlight,
    playerBelongsTo: playerBelongsTo 
  }
//Outlines the position of the piece by accessing the numbers in the initialPosition array passed to it which are its row and column number, together make up the piece's position on the board! 
  var row = initialPosition[0];
  var column = initialPosition[1];

  gameBoard[row][column].gamePiece = gamePiece;
  return gamePiece;
};

//This function is my own version of underscore's each function.
var myEach = function (list, f) {
  if(Array.isArray(list)){
  for(var i = 0; i < list.length; i++) {
    f(list[i], i, list);
  }
}
  else { for (var key in list) {
    f(list[key], key, list);
  }
}
};

//This function checks to see which player's turn it is by checking if the turncount is even or odd. Even represents player 1 and odd represents player 2. Each player has a unique return to feed into the checkScore function.
var whoseTurn = function(){
  if(gameBoard.turnCount %2 === 0){
    return "Team Penguin's turn. Let's see that waddle!";} else {
      return "Team Lion's turn. Time to ROAAAAAAAAR to victory!";
    }
};

//This function checks the current scoring of the game and lets the users know whose turn it is to go next! 
var checkScore = function(){
    alert("The current score is:" + "\nPenguins: " + player1Score + "\nLions: " + player2Score + "\n\nIt is " + whoseTurn());
};

//This function alerts the instructions for playing the game to the users
var instructions = function(){
  alert("Welcome to Animal Duels!!\n\nThe rules are simple, click on a piece to select it and the grey highlighted squares will show you where you are allowed to move to. The objective of the game is to take out your opposition before they get you!\n\nAll pieces start of only able to move ONE space forwards diagonally, however a piece that conquers another also gains special powers...\n\nPenguins always start the game and players then take alternating turns until there is a winner!")
};

//Generates random colors for the wackyBoard function to use! Each variable represents a separate number on the RGB scale. The random number is then changed to a hexadecimal value and concatenated together with the hash symbol to form a new hexadecimal color.
var randomColor = function(){
    var r = (Math.floor(Math.random()*256)).toString(16);
    var g = (Math.floor(Math.random()*256)).toString(16);
    var b = (Math.floor(Math.random()*256)).toString(16);
  return "#" + r + g + b;
};

//This function connects to the html button that lets the user turn Crazy Board mode on and off! 

var wackyBoard = function(){
  if(crazyBoard === false && confirm("Are you sure you want to turn on crazy board? This will change the board colors on each move!")){
    crazyBoard = true;
  } else if (crazyBoard === true && confirm("You already have Crazy Board on!! Click OK below to return to Normal Mode or click Cancel to carry on in Crazy Board mode!!")){
    crazyBoard = false;
  }

};
  // This is a toggle for crazy board mode controlled by the button on the screen
  var crazyBoard = false;

//This is a welcome message for the players when the page loads! 
alert("Welcome to Animal Checkers! Use the buttons on the left to check the current score, reset the game, read the instructions or to bring on the Crazy Board!!!");