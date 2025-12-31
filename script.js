"use strict";

const gameBoardContainer = document.querySelector(".gameboard-container");
const gameText = document.querySelector(".text-area");

// - creating gameboard object that has slots 1-9 for the tic tac toe game
// - creating empty array for clicked elements on our gameboard
const gameboard = {
  board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  winningBoard: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
  ],
};

// creating player factory function to create players
const player = function (name, symbol, boardChoice) {
  return {
    name,
    symbol,
    boardChoice: [],
  };
};

// creating players for the game
const player1 = player("Jake", "🔴");
const player2 = player("Marcui", "🔵");

// creating variable for changing game state
let currplayer = true;

// creating function to display board
const displayBoard = function () {
  gameboard.board.forEach((item) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (typeof item === "number") {
      gameBoardContainer.appendChild(cell);
      cell.textContent = item;
    }
  });
};

// helper function to compare array contents
// comparing the length of the two array arguements
// standard for loop to iterate over array elements
const arrChecker = function (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  {
    // return true;
    return console.log("Winner");
  }
};

// - using the Object.values() method to return a new array containing
// the values of all of an object's own, enumerable string-keyed properties
const checkWinner = function (playerObj, gameboardObj) {
  let playerChoiceArr;
  let winningBoardArr;
  let winningBoardCombination;
  for (const key in playerObj) {
    if (key === "boardChoice") {
      playerChoiceArr = playerObj[key];
      console.log(playerChoiceArr);
    }
  }
  for (const key in gameboardObj) {
    if (key === "winningBoard") {
      winningBoardArr = gameboardObj[key];
      console.log(winningBoardArr);
    }
  }
  winningBoardCombination = winningBoardArr.some((item) => {
    console.log(item);
    arrChecker(playerChoiceArr, item);
  });
};

// - creating function to capture the players box choice
// - adding event listener to the parent container gameBoardContainer (instead of attaching a listener for every div individually)
// - e.target to refer to the exact element clicked
// - .closest() method to travers up the DOM tree from e.target until it finds an ancestor that matches the provided css selector ('.cell')
// - pushing the clicked element to the empty array in the gameboard object, also converting to number from string
// TODO: add guard clause for not being able to select already selected cells
const playerChoice = function () {
  let clickedEl;
  gameBoardContainer.addEventListener("click", (e) => {
    clickedEl = e.target.closest(".cell");
    if (currplayer) {
      player1.boardChoice.push(Number(clickedEl.innerHTML));
      clickedEl.textContent = player1.symbol;
      currplayer = false;
      gameText.textContent = "Now it's 🔵 turn!";
      checkWinner(player1, gameboard);
    } else if (!currplayer) {
      player2.boardChoice.push(Number(clickedEl.innerHTML));
      clickedEl.textContent = player2.symbol;
      currplayer = true;
      gameText.textContent = "Now it's 🔴 turn!";
      checkWinner(player2, gameboard);
    }
  });
};

displayBoard();
playerChoice();
