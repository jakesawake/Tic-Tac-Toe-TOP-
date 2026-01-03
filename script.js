"use strict";

const gameBoardContainer = document.querySelector(".gameboard-container");
const gameText = document.querySelector(".text-area");

// - creating gameboard object that has a board with empty strings (9 places)
// - creating winningLines property that has all possible wins
const gameboard = {
  board: ["", "", "", "", "", "", "", "", ""],
  winningLines: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
  ],
};

// creating player factory function to create players
const player = function (name, symbol, playerBoard) {
  return {
    name,
    symbol,
    playerBoard,
  };
};

// creating players for the game
const player1 = player("Jake", "X", []);
const player2 = player("Marcui", "O", []);

// making player1 the current player (X)
let currplayer = player1;

// function for switching player
// - if the currplayer is player 1 -> then make player2 the current player, else make player1 the current player
const switchPlayer = () => {
  currplayer = currplayer === player1 ? player2 : player1;
};

// creating function to display board
const displayBoard = function () {
  gameboard.board.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (item === "") {
      gameBoardContainer.appendChild(cell);
      cell.dataset.index = index;
    }
  });
};

// - function to compare the players playerboard with any winninglines
// - using some method to check if atleast one arr is a match
// - for loop to iterate over the innerArr
// - if the innerArr equals the currPlayersPositions array
// - log the winner to the console
const winCheck = function (currPlayersPositions) {
  winningLinesArr.some((innerArr) => {
    if (innerArr.length !== currPlayersPositions.length) {
      return false;
    }
    for (let i = 0; i < innerArr.length; i++) {
      if (innerArr[i] !== currPlayersPositions[i]) {
        return false;
      }
    }
    return console.log(`${currplayer.name} is the winner!`);
  });
};

// - creating global variables so they can be accessed in the other functions
// - assigning gameboard.winningLines to variable winningLinesArr so it removes one layer of nesting (the object)
let clickedEl;
let clickedElData;
let currBoard = gameboard.board;
let winningLinesArr = gameboard.winningLines;

// - event listener on the entire container
// - storing the click event in clickedEl
// - explicitly converting the clickedEl.dataset.index to a number (implicitly returns string)
// - pushing the dataset index to the player1 or player2 playerboard
// - then passing the arrays to the winCheck() fn to check for win
// - calling the switchPlayer() fn to switch player
gameBoardContainer.addEventListener("click", (e) => {
  clickedEl = e.target.closest(".cell");
  clickedEl.style.color = "white";
  clickedEl.style.fontFamily = "system-ui, -apple-system";
  if (currplayer === player1) {
    clickedEl.textContent = player1.symbol;
    clickedElData = Number(clickedEl.dataset.index);
    player1.playerBoard.push(clickedElData);
    winCheck(player1.playerBoard, winningLinesArr);
    switchPlayer();
    gameText.textContent = "Now it's O turn!";
  } else if (currplayer === player2) {
    clickedEl.textContent = player2.symbol;
    clickedElData = Number(clickedEl.dataset.index);
    player2.playerBoard.push(clickedElData);
    winCheck(player2.playerBoard, winningLinesArr);
    switchPlayer();
    gameText.textContent = "Now it's X turn!";
  }
});

displayBoard();
