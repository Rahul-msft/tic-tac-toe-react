import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import Scoreboard from './components/Scoreboard';
import ThemeSwitcher from './components/ThemeSwitcher';
import { createEmptyBoard, getGameStatus, makeMove } from './utils/helpers';
import { getAIMove } from './utils/ai';

const App = () => {
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameStatus, setGameStatus] = useState(getGameStatus(createEmptyBoard(), 'X'));
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const [isAITurn, setIsAITurn] = useState(false);
  
  // Handle AI moves
  useEffect(() => {
    if (gameMode && gameMode.startsWith('ai-') && currentPlayer === 'O' && gameStatus.status === 'playing') {
      setIsAITurn(true);
      
      const timer = setTimeout(() => {
        const difficulty = gameMode === 'ai-hard' ? 'hard' : 'easy';
        const aiMove = getAIMove(board, 'O', difficulty);
        
        if (aiMove !== -1) {
          handleCellClick(aiMove);
        }
        setIsAITurn(false);
      }, 500); // Small delay to make AI move visible
      
      return () => clearTimeout(timer);
    }
  }, [gameMode, currentPlayer, board, gameStatus.status]);
  
  // Update game status when board changes
  useEffect(() => {
    const status = getGameStatus(board, currentPlayer);
    setGameStatus(status);
    
    // Update scores when game ends
    if (status.status === 'winner') {
      setScores(prev => ({
        ...prev,
        [status.message.includes('X') ? 'X' : 'O']: prev[status.message.includes('X') ? 'X' : 'O'] + 1
      }));
    } else if (status.status === 'draw') {
      setScores(prev => ({
        ...prev,
        draw: prev.draw + 1
      }));
    }
  }, [board, currentPlayer]);
  
  const handleModeSelect = (mode) => {
    setGameMode(mode);
    resetGame();
  };
  
  const handleCellClick = (index) => {
    if (gameStatus.status !== 'playing' || board[index] !== null || isAITurn) {
      return;
    }
    
    const newBoard = makeMove(board, index, currentPlayer);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };
  
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setIsAITurn(false);
  };
  
  const resetScores = () => {
    setScores({ X: 0, O: 0, draw: 0 });
  };
  
  const backToMenu = () => {
    setGameMode(null);
    resetGame();
    resetScores();
  };
  
  if (!gameMode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div>
          <StartScreen onModeSelect={handleModeSelect} />
          <ThemeSwitcher />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column - Scoreboard */}
          <div className="lg:order-1">
            <Scoreboard scores={scores} gameMode={gameMode} />
          </div>
          
          {/* Center column - Game */}
          <div className="lg:order-2 space-y-6">
            <GameControls
              gameStatus={gameStatus}
              onRestart={resetGame}
              onBackToMenu={backToMenu}
              gameMode={gameMode}
            />
            
            <GameBoard
              board={board}
              onCellClick={handleCellClick}
              gameStatus={gameStatus}
              disabled={isAITurn}
            />
          </div>
          
          {/* Right column - Additional info or future features */}
          <div className="lg:order-3">
            <div className="card">
              <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
                How to Play
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Players take turns placing X's and O's</p>
                <p>• Get three in a row to win</p>
                <p>• Horizontal, vertical, or diagonal</p>
                <p>• Have fun! 🎉</p>
              </div>
              
              {gameMode.startsWith('ai-') && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold">AI Difficulty:</p>
                    <p>{gameMode === 'ai-hard' ? '🧠 Hard (Minimax)' : '🤖 Easy (Random)'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ThemeSwitcher />
    </div>
  );
};

export default App;