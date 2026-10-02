import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeToggleProps {
  variant?: 'header' | 'mobile' | 'compact';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { language } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors ${className}`}>
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium text-sm">
          {isDark ? (
            <Moon className="w-4 h-4 text-indigo-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <span>{language === 'hi' ? 'डार्क मोड / थीम' : 'Dark Mode / Theme'}</span>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
            isDark ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isDark ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  }

  // Header desktop / compact toggle button
  return (
    <button
      id="header-theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={
        isDark
          ? language === 'hi' ? 'लाइट मोड चालू करें' : 'Switch to Light Mode'
          : language === 'hi' ? 'डार्क मोड चालू करें' : 'Switch to Dark Mode'
      }
      className={`p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100/90 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 transition-all duration-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-fadeIn" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 hover:text-blue-600 animate-fadeIn" />
      )}
    </button>
  );
};
