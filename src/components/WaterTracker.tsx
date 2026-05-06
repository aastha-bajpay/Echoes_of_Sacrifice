import React from 'react';

interface WaterTrackerProps {
  goal: number;
  consumed: number;
  onUpdate: (glasses: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ goal, consumed, onUpdate }) => {
  const pct = goal > 0 ? Math.min(Math.round((consumed / goal) * 100), 100) : 0;
  const safeGoal = Math.max(1, Math.min(goal, 16));

  return (
    <div className="card water-tracker">
      <div className="water-tracker__header">
        <h2 className="card__title">💧 Water Intake</h2>
        <span className="water-tracker__stat">
          {consumed} / {safeGoal} glasses · {pct}%
        </span>
      </div>

      <div className="water-tracker__glasses">
        {Array.from({ length: safeGoal }, (_, i) => (
          <button
            key={i}
            className={`water-glass${i < consumed ? ' water-glass--filled' : ''}`}
            onClick={() =>
              onUpdate(i < consumed ? i : i + 1)
            }
            title={i < consumed ? 'Click to reduce' : 'Mark as drunk'}
          >
            {i < consumed ? '💧' : '🫙'}
          </button>
        ))}
      </div>

      <div className="water-tracker__bar-track">
        <div className="water-tracker__bar-fill" style={{ width: `${pct}%` }} />
      </div>

      {consumed >= safeGoal && (
        <p className="water-tracker__done">🎉 Daily water goal reached!</p>
      )}
    </div>
  );
};

export default WaterTracker;
