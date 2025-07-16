// Helper functions for Tic-Tac-Toe game logic

export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6]  // Diagonal top-right to bottom-left
];

/**
 * Creates a new empty board
 */
export const createEmptyBoard = () => {
  return Array(9).fill(null);
};

/**
 * Checks if there's a winner on the board
 * @param {Array} board - The current board state
 * @returns {Object|null} - Winner object with player and line, or null if no winner
 */
export const checkWinner = (board) => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        player: board[a],
        line: WINNING_COMBINATIONS[i]
      };
    }
  }
  return null;
};

/**
 * Checks if the game is a draw
 * @param {Array} board - The current board state
 * @returns {boolean} - True if it's a draw, false otherwise
 */
export const isDraw = (board) => {
  return board.every(cell => cell !== null) && !checkWinner(board);
};

/**
 * Gets all available moves (empty cells) on the board
 * @param {Array} board - The current board state
 * @returns {Array} - Array of available move indices
 */
export const getAvailableMoves = (board) => {
  return board
    .map((cell, index) => cell === null ? index : null)
    .filter(val => val !== null);
};

/**
 * Checks if a move is valid
 * @param {Array} board - The current board state
 * @param {number} index - The index to check
 * @returns {boolean} - True if the move is valid, false otherwise
 */
export const isValidMove = (board, index) => {
  return index >= 0 && index < 9 && board[index] === null;
};

/**
 * Makes a move on the board
 * @param {Array} board - The current board state
 * @param {number} index - The index to place the move
 * @param {string} player - The player making the move ('X' or 'O')
 * @returns {Array} - New board state with the move applied
 */
export const makeMove = (board, index, player) => {
  if (!isValidMove(board, index)) {
    return board;
  }
  
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};

/**
 * Gets the game status
 * @param {Array} board - The current board state
 * @param {string} currentPlayer - The current player
 * @returns {Object} - Game status object
 */
export const getGameStatus = (board, currentPlayer) => {
  const winner = checkWinner(board);
  
  if (winner) {
    return {
      status: 'winner',
      message: `Player ${winner.player} wins!`,
      winningLine: winner.line
    };
  }
  
  if (isDraw(board)) {
    return {
      status: 'draw',
      message: "It's a draw!",
      winningLine: null
    };
  }
  
  return {
    status: 'playing',
    message: `Player ${currentPlayer}'s turn`,
    winningLine: null
  };
};