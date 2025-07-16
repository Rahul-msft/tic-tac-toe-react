import React from 'react';

const StartScreen = ({ onModeSelect }) => {
  return (
    <div className="card max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Tic-Tac-Toe</h1>
        <p className="text-gray-600 mb-8">Choose your game mode</p>
        
        <div className="space-y-4">
          <button
            onClick={() => onModeSelect('human')}
            className="btn-primary w-full text-lg py-3"
          >
            🎮 Two Players
          </button>
          
          <button
            onClick={() => onModeSelect('ai-easy')}
            className="btn-secondary w-full text-lg py-3"
          >
            🤖 vs AI (Easy)
          </button>
          
          <button
            onClick={() => onModeSelect('ai-hard')}
            className="btn-success w-full text-lg py-3"
          >
            🧠 vs AI (Hard)
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Made with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;