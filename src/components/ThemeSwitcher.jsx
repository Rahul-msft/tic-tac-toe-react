import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {isDark ? (
          <span className="text-yellow-500 text-xl">☀️</span>
        ) : (
          <span className="text-gray-700 text-xl">🌙</span>
        )}
      </div>
    </button>
  );
};

export default ThemeSwitcher;