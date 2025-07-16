import React from 'react';

const GameControls = ({ gameStatus, onRestart, onBackToMenu, gameMode }) => {
  const getStatusClasses = () => {
    let classes = 'game-status';
    
    if (gameStatus.status === 'winner') {
      classes += ' winner';
    } else if (gameStatus.status === 'draw') {
      classes += ' draw';
    } else {
      classes += ' playing';
    }
    
    return classes;
  };
  
  const getModeDisplayName = () => {
    switch (gameMode) {
      case 'human':
        return 'Two Players';
      case 'ai-easy':
        return 'vs AI (Easy)';
      case 'ai-hard':
        return 'vs AI (Hard)';
      default:
        return 'Unknown Mode';
    }
  };
  
  return (
    <div className="card text-center">
      <div className="mb-4">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {getModeDisplayName()}
        </span>
      </div>
      
      <div className={getStatusClasses()}>
        {gameStatus.message}
      </div>
      
      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={onRestart}
          className="btn-primary"
        >
          🔄 Restart Game
        </button>
        
        <button
          onClick={onBackToMenu}
          className="btn-secondary"
        >
          🏠 Back to Menu
        </button>
      </div>
    </div>
  );
};

export default GameControls;