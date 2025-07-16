import React from 'react';

const Scoreboard = ({ scores, gameMode }) => {
  const getPlayerLabel = (player) => {
    if (gameMode === 'human') {
      return `Player ${player}`;
    } else {
      return player === 'X' ? 'You' : 'AI';
    }
  };
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
        Scoreboard
      </h3>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600">
            {scores.X}
          </div>
          <div className="text-sm text-gray-600">
            {getPlayerLabel('X')}
          </div>
          <div className="text-lg text-blue-600 font-semibold">
            ✕
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-gray-600">
            {scores.draw}
          </div>
          <div className="text-sm text-gray-600">
            Draws
          </div>
          <div className="text-lg text-gray-600 font-semibold">
            ═
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-600">
            {scores.O}
          </div>
          <div className="text-sm text-gray-600">
            {getPlayerLabel('O')}
          </div>
          <div className="text-lg text-red-600 font-semibold">
            ○
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">
          Total Games: {scores.X + scores.O + scores.draw}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;