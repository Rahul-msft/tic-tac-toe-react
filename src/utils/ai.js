// AI logic for Tic-Tac-Toe game

import { checkWinner, isDraw, getAvailableMoves, makeMove } from './helpers';

/**
 * Easy AI - Makes random moves
 * @param {Array} board - The current board state
 * @param {string} aiPlayer - The AI player ('X' or 'O')
 * @returns {number} - The index of the AI's move
 */
export const getEasyAIMove = (board, aiPlayer) => {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    return -1;
  }
  
  // Random move selection
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

/**
 * Hard AI - Uses minimax algorithm for optimal play
 * @param {Array} board - The current board state
 * @param {string} aiPlayer - The AI player ('X' or 'O')
 * @returns {number} - The index of the AI's move
 */
export const getHardAIMove = (board, aiPlayer) => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  
  const minimax = (board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    const winner = checkWinner(board);
    
    // Terminal states
    if (winner) {
      if (winner.player === aiPlayer) {
        return 10 - depth; // AI wins (prefer quicker wins)
      } else {
        return depth - 10; // Human wins (prefer later losses)
      }
    }
    
    if (isDraw(board)) {
      return 0; // Draw
    }
    
    const availableMoves = getAvailableMoves(board);
    
    if (isMaximizing) {
      let maxEval = -Infinity;
      
      for (let move of availableMoves) {
        const newBoard = makeMove(board, move, aiPlayer);
        const evaluation = minimax(newBoard, depth + 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        
        // Alpha-beta pruning
        if (beta <= alpha) {
          break;
        }
      }
      
      return maxEval;
    } else {
      let minEval = Infinity;
      
      for (let move of availableMoves) {
        const newBoard = makeMove(board, move, humanPlayer);
        const evaluation = minimax(newBoard, depth + 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        
        // Alpha-beta pruning
        if (beta <= alpha) {
          break;
        }
      }
      
      return minEval;
    }
  };
  
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    return -1;
  }
  
  // For the first move, choose center or corner for better performance
  if (availableMoves.length === 9) {
    return Math.random() < 0.7 ? 4 : [0, 2, 6, 8][Math.floor(Math.random() * 4)];
  }
  
  let bestMove = availableMoves[0];
  let bestValue = -Infinity;
  
  for (let move of availableMoves) {
    const newBoard = makeMove(board, move, aiPlayer);
    const moveValue = minimax(newBoard, 0, false);
    
    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }
  }
  
  return bestMove;
};

/**
 * Gets AI move based on difficulty
 * @param {Array} board - The current board state
 * @param {string} aiPlayer - The AI player ('X' or 'O')
 * @param {string} difficulty - 'easy' or 'hard'
 * @returns {number} - The index of the AI's move
 */
export const getAIMove = (board, aiPlayer, difficulty = 'easy') => {
  if (difficulty === 'hard') {
    return getHardAIMove(board, aiPlayer);
  } else {
    return getEasyAIMove(board, aiPlayer);
  }
};