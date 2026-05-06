import React from 'react';
import type { Theme } from '../types';

const THEMES: { id: Theme; emoji: string; label: string }[] = [
  { id: 'light', emoji: '☀️', label: 'Light' },
  { id: 'dark', emoji: '🌙', label: 'Dark' },
  { id: 'ocean', emoji: '🌊', label: 'Ocean' },
];

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange }) => {
  return (
    <div className="theme-toggle" role="group" aria-label="Choose theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          className={`theme-btn${theme === t.id ? ' theme-btn--active' : ''}`}
          onClick={() => onThemeChange(t.id)}
          title={`${t.label} theme`}
          aria-pressed={theme === t.id}
        >
          {t.emoji}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
