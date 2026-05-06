import React, { useState } from 'react';
import type { ActivityEntry } from '../types';

interface ActivityLogProps {
  entries: ActivityEntry[];
  onAdd: (entry: Omit<ActivityEntry, 'id' | 'loggedAt'>) => void;
  onRemove: (id: string) => void;
  userWeight: number; // kg
}

const EXERCISES = [
  { name: 'Walking', icon: '🚶', met: 3.5 },
  { name: 'Running', icon: '🏃', met: 7.0 },
  { name: 'Cycling', icon: '🚴', met: 6.0 },
  { name: 'Swimming', icon: '🏊', met: 8.0 },
  { name: 'Yoga', icon: '🧘', met: 3.0 },
  { name: 'Weight Training', icon: '🏋️', met: 5.0 },
  { name: 'HIIT', icon: '⚡', met: 10.0 },
  { name: 'Dancing', icon: '💃', met: 5.5 },
  { name: 'Jump Rope', icon: '🪢', met: 11.0 },
  { name: 'Hiking', icon: '🥾', met: 6.0 },
  { name: 'Basketball', icon: '🏀', met: 7.5 },
  { name: 'Football', icon: '⚽', met: 7.0 },
];

const ActivityLog: React.FC<ActivityLogProps> = ({
  entries,
  onAdd,
  onRemove,
  userWeight,
}) => {
  const [selected, setSelected] = useState(EXERCISES[0]);
  const [duration, setDuration] = useState(30);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const caloriesBurned = Math.round(selected.met * userWeight * (duration / 60));

  const handleAdd = () => {
    onAdd({ name: selected.name, icon: selected.icon, duration, caloriesBurned });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleRemove = (id: string) => {
    if (confirmDelete === id) {
      onRemove(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const totalBurned = entries.reduce((sum, e) => sum + e.caloriesBurned, 0);
  const totalMinutes = entries.reduce((sum, e) => sum + e.duration, 0);

  return (
    <div className="activity-log">
      <h2 className="section-title">Activity Log</h2>
      <p className="section-subtitle">
        Track workouts and see your net calorie balance.
      </p>

      {/* Summary badges */}
      {entries.length > 0 && (
        <div className="activity-summary">
          <div className="activity-summary__item">
            <span className="activity-summary__val activity-summary__val--blue">
              {totalBurned}
            </span>
            <span className="activity-summary__lbl">kcal burned</span>
          </div>
          <div className="activity-summary__item">
            <span className="activity-summary__val">{totalMinutes}</span>
            <span className="activity-summary__lbl">minutes active</span>
          </div>
          <div className="activity-summary__item">
            <span className="activity-summary__val">{entries.length}</span>
            <span className="activity-summary__lbl">workouts</span>
          </div>
        </div>
      )}

      {/* Add Activity Panel */}
      <div className="card add-activity">
        <h3 className="card__title">Log a Workout</h3>

        <div className="exercise-grid">
          {EXERCISES.map((ex) => (
            <button
              key={ex.name}
              className={`exercise-chip${selected.name === ex.name ? ' exercise-chip--active' : ''}`}
              onClick={() => setSelected(ex)}
            >
              <span className="exercise-chip__icon">{ex.icon}</span>
              <span className="exercise-chip__name">{ex.name}</span>
            </button>
          ))}
        </div>

        <div className="duration-row">
          <span className="add-panel__label">Duration</span>
          <div className="add-panel__servings">
            <button
              className="serving-btn"
              onClick={() => setDuration((d) => Math.max(5, d - 5))}
            >
              −
            </button>
            <span className="serving-count">{duration} min</span>
            <button
              className="serving-btn"
              onClick={() => setDuration((d) => Math.min(300, d + 5))}
            >
              +
            </button>
          </div>
        </div>

        <div className="activity-preview">
          <span>
            {selected.icon} {selected.name} · {duration} min
          </span>
          <span className="activity-preview__cal">≈ {caloriesBurned} kcal burned</span>
        </div>

        <button
          className={`btn btn--primary btn--full${justAdded ? ' btn--success' : ''}`}
          onClick={handleAdd}
        >
          {justAdded ? '✓ Logged!' : 'Log Activity'}
        </button>
      </div>

      {/* Activity list */}
      {entries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🏃</div>
          <p className="empty-state__text">No activities logged yet</p>
          <p className="empty-state__sub">Add your first workout above</p>
        </div>
      ) : (
        <div className="activity-list">
          {entries.map((entry) => (
            <div key={entry.id} className="activity-item card">
              <div className="activity-item__info">
                <span className="activity-item__icon">{entry.icon}</span>
                <div className="activity-item__text">
                  <span className="activity-item__name">{entry.name}</span>
                  <span className="activity-item__detail">
                    {entry.duration} min · {entry.caloriesBurned} kcal burned
                  </span>
                </div>
              </div>
              <button
                className={`remove-btn${confirmDelete === entry.id ? ' remove-btn--confirm' : ''}`}
                onClick={() => handleRemove(entry.id)}
                title={confirmDelete === entry.id ? 'Confirm remove' : 'Remove'}
              >
                {confirmDelete === entry.id ? '✓?' : '✕'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
