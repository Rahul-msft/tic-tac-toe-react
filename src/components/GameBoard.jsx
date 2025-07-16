import React from 'react';

const GameBoard = ({ board, onCellClick, gameStatus, disabled = false }) => {
  const { winningLine } = gameStatus;
  
  const getCellClasses = (index) => {
    let classes = 'game-cell';
    
    if (disabled || board[index] !== null) {
      classes += ' disabled';
    }
    
    if (winningLine && winningLine.includes(index)) {
      classes += ' winning';
    }
    
    return classes;
  };
  
  const getCellContent = (value) => {
    if (value === 'X') {
      return <span className="text-blue-600">✕</span>;
    } else if (value === 'O') {
      return <span className="text-red-600">○</span>;
    }
    return '';
  };
  
  return (
    <div className="card">
      <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
        {board.map((cell, index) => (
          <button
            key={index}
            className={getCellClasses(index)}
            onClick={() => onCellClick(index)}
            disabled={disabled || cell !== null}
            aria-label={`Cell ${index + 1}`}
          >
            {getCellContent(cell)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;