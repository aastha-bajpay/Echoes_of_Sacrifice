import React, { useState } from 'react';
import type { UserGoals, ActivityLevel } from '../types';
import { DEFAULT_GOALS, calculateBMR, calculateTDEE } from '../utils/nutrition';

interface GoalSettingProps {
  goals: UserGoals;
  onSave: (goals: UserGoals) => void;
}

const PRESETS = [
  {
    name: 'Weight Loss',
    icon: '📉',
    description: '1500 kcal – moderate protein, lower carbs',
    goals: { calories: 1500, protein: 100, carbs: 150, fat: 50, fiber: 30, waterGlasses: 8 },
  },
  {
    name: 'Maintenance',
    icon: '⚖️',
    description: '2000 kcal – balanced macros',
    goals: { calories: 2000, protein: 50, carbs: 250, fat: 65, fiber: 28, waterGlasses: 8 },
  },
  {
    name: 'Muscle Gain',
    icon: '💪',
    description: '2500 kcal – high protein, higher carbs',
    goals: { calories: 2500, protein: 150, carbs: 300, fat: 70, fiber: 30, waterGlasses: 10 },
  },
  {
    name: 'Athletic',
    icon: '🏃',
    description: '3000 kcal – high carbs, high protein',
    goals: { calories: 3000, protein: 180, carbs: 400, fat: 80, fiber: 35, waterGlasses: 12 },
  },
];

type FieldKey = keyof Omit<UserGoals, 'waterGlasses' | 'weight' | 'height' | 'age' | 'gender' | 'activityLevel'>;

const FIELDS: {
  key: FieldKey;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: 'calories', label: 'Daily Calories', unit: 'kcal', min: 800, max: 5000, step: 50 },
  { key: 'protein', label: 'Protein', unit: 'g', min: 10, max: 300, step: 5 },
  { key: 'carbs', label: 'Carbohydrates', unit: 'g', min: 20, max: 600, step: 10 },
  { key: 'fat', label: 'Fat', unit: 'g', min: 10, max: 300, step: 5 },
  { key: 'fiber', label: 'Fiber', unit: 'g', min: 5, max: 60, step: 1 },
];

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
  { value: 'light', label: 'Light (1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (3-5 days/week)' },
  { value: 'active', label: 'Active (6-7 days/week)' },
  { value: 'very_active', label: 'Very Active (hard daily exercise)' },
];

function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' };
  if (bmi < 25) return { label: 'Normal weight', color: '#22c55e' };
  if (bmi < 30) return { label: 'Overweight', color: '#f97316' };
  return { label: 'Obese', color: '#ef4444' };
}

const GoalSetting: React.FC<GoalSettingProps> = ({ goals, onSave }) => {
  const [form, setForm] = useState<UserGoals>({ ...goals });
  const [saved, setSaved] = useState(false);

  const handlePreset = (preset: (typeof PRESETS)[0]) => {
    setForm((prev) => ({ ...prev, ...preset.goals }));
    setSaved(false);
  };

  const handleChange = (key: keyof UserGoals, value: number | string | undefined) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setForm({ ...DEFAULT_GOALS });
    setSaved(false);
  };

  // Macro distribution
  const proteinCal = form.protein * 4;
  const carbsCal = form.carbs * 4;
  const fatCal = form.fat * 9;
  const totalMacroCal = proteinCal + carbsCal + fatCal;
  const proteinPct = totalMacroCal > 0 ? Math.round((proteinCal / totalMacroCal) * 100) : 0;
  const carbsPct = totalMacroCal > 0 ? Math.round((carbsCal / totalMacroCal) * 100) : 0;
  const fatPct = totalMacroCal > 0 ? Math.round((fatCal / totalMacroCal) * 100) : 0;

  // BMI & TDEE
  const hasBiometrics = form.weight && form.height && form.age;
  const bmi =
    form.weight && form.height
      ? parseFloat((form.weight / (form.height / 100) ** 2).toFixed(1))
      : null;
  const bmiCat = bmi ? getBMICategory(bmi) : null;
  const bmr =
    form.weight && form.height && form.age && form.gender
      ? calculateBMR(form.weight, form.height, form.age, form.gender)
      : null;
  const tdee =
    bmr && form.activityLevel ? calculateTDEE(bmr, form.activityLevel) : null;

  return (
    <div className="goal-setting">
      <h2 className="section-title">Nutrition Goals</h2>
      <p className="section-subtitle">
        Set your daily targets to get personalized tracking and recommendations.
      </p>

      {/* Presets */}
      <div className="presets">
        <h3 className="presets__title">Quick Presets</h3>
        <div className="presets__grid">
          {PRESETS.map((p) => (
            <button key={p.name} className="preset-card" onClick={() => handlePreset(p)}>
              <span className="preset-card__icon">{p.icon}</span>
              <span className="preset-card__name">{p.name}</span>
              <span className="preset-card__desc">{p.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom goal fields */}
      <div className="goal-fields card">
        <h3 className="card__title">Custom Goals</h3>
        {FIELDS.map((field) => (
          <div key={field.key} className="goal-field">
            <div className="goal-field__header">
              <label className="goal-field__label">{field.label}</label>
              <span className="goal-field__value">
                {form[field.key]} {field.unit}
              </span>
            </div>
            <input
              type="range"
              className="goal-field__slider"
              min={field.min}
              max={field.max}
              step={field.step}
              value={form[field.key] as number}
              onChange={(e) => handleChange(field.key, Number(e.target.value))}
            />
            <div className="goal-field__range">
              <span>{field.min}</span>
              <span>{field.max}</span>
            </div>
          </div>
        ))}

        <div className="goal-field">
          <div className="goal-field__header">
            <label className="goal-field__label">💧 Daily Water</label>
            <span className="goal-field__value">{form.waterGlasses} glasses</span>
          </div>
          <input
            type="range"
            className="goal-field__slider"
            min={4}
            max={16}
            step={1}
            value={form.waterGlasses}
            onChange={(e) => handleChange('waterGlasses', Number(e.target.value))}
          />
          <div className="goal-field__range">
            <span>4</span>
            <span>16</span>
          </div>
        </div>
      </div>

      {/* Macro distribution preview */}
      <div className="macro-dist card">
        <h3 className="card__title">Macro Distribution</h3>
        <div className="macro-dist__bar">
          <div className="macro-dist__seg macro-dist__seg--protein" style={{ width: `${proteinPct}%` }} />
          <div className="macro-dist__seg macro-dist__seg--carbs" style={{ width: `${carbsPct}%` }} />
          <div className="macro-dist__seg macro-dist__seg--fat" style={{ width: `${fatPct}%` }} />
        </div>
        <div className="macro-dist__legend">
          <span className="macro-dist__item macro-dist__item--protein">Protein {proteinPct}%</span>
          <span className="macro-dist__item macro-dist__item--carbs">Carbs {carbsPct}%</span>
          <span className="macro-dist__item macro-dist__item--fat">Fat {fatPct}%</span>
        </div>
        <p className="macro-dist__note">
          Macro calories: {totalMacroCal} kcal · Goal: {form.calories} kcal
          {Math.abs(totalMacroCal - form.calories) > 100 && (
            <span className="macro-dist__warning">
              {' '}⚠️ Macros are {totalMacroCal > form.calories ? 'above' : 'below'} calorie goal
            </span>
          )}
        </p>
      </div>

      {/* BMI & TDEE Calculator */}
      <div className="card bmi-calc">
        <h3 className="card__title">🧮 BMI & Calorie Calculator</h3>
        <p className="section-subtitle" style={{ marginBottom: 12 }}>
          Enter your body stats to calculate BMI and recommended daily calories.
        </p>

        <div className="bmi-fields">
          <div className="bmi-field">
            <label className="goal-field__label">Weight (kg)</label>
            <input
              type="number"
              className="bmi-input"
              min={30}
              max={300}
              value={form.weight ?? ''}
              placeholder="e.g. 70"
              onChange={(e) =>
                handleChange('weight', e.target.value ? Number(e.target.value) : ('' as unknown as number))
              }
            />
          </div>
          <div className="bmi-field">
            <label className="goal-field__label">Height (cm)</label>
            <input
              type="number"
              className="bmi-input"
              min={100}
              max={250}
              value={form.height ?? ''}
              placeholder="e.g. 170"
              onChange={(e) =>
                handleChange('height', e.target.value ? Number(e.target.value) : ('' as unknown as number))
              }
            />
          </div>
          <div className="bmi-field">
            <label className="goal-field__label">Age</label>
            <input
              type="number"
              className="bmi-input"
              min={10}
              max={120}
              value={form.age ?? ''}
              placeholder="e.g. 28"
              onChange={(e) =>
                handleChange('age', e.target.value ? Number(e.target.value) : ('' as unknown as number))
              }
            />
          </div>
          <div className="bmi-field bmi-field--select">
            <label className="goal-field__label">Gender</label>
            <select
              className="bmi-select"
              value={form.gender ?? ''}
              onChange={(e) => handleChange('gender', e.target.value as UserGoals['gender'])}
            >
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="bmi-field bmi-field--full">
            <label className="goal-field__label">Activity Level</label>
            <select
              className="bmi-select"
              value={form.activityLevel ?? ''}
              onChange={(e) =>
                handleChange('activityLevel', e.target.value as ActivityLevel)
              }
            >
              <option value="">Select…</option>
              {ACTIVITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasBiometrics && bmi && bmiCat && (
          <div className="bmi-results">
            <div className="bmi-result-item">
              <span className="bmi-result-label">BMI</span>
              <span className="bmi-result-val" style={{ color: bmiCat.color }}>
                {bmi}
              </span>
              <span className="bmi-result-cat" style={{ color: bmiCat.color }}>
                {bmiCat.label}
              </span>
            </div>
            {bmr && (
              <div className="bmi-result-item">
                <span className="bmi-result-label">BMR</span>
                <span className="bmi-result-val">{bmr}</span>
                <span className="bmi-result-cat">kcal/day (at rest)</span>
              </div>
            )}
            {tdee && (
              <div className="bmi-result-item">
                <span className="bmi-result-label">TDEE</span>
                <span className="bmi-result-val" style={{ color: 'var(--color-primary)' }}>
                  {tdee}
                </span>
                <span className="bmi-result-cat">kcal/day (maintenance)</span>
              </div>
            )}
            {tdee && (
              <button
                className="btn btn--outline btn--small"
                style={{ marginTop: 8 }}
                onClick={() => handleChange('calories', tdee)}
              >
                Use TDEE as calorie goal
              </button>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="goal-actions">
        <button className="btn btn--outline" onClick={handleReset}>
          Reset to Default
        </button>
        <button
          className={`btn btn--primary${saved ? ' btn--success' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✓ Saved!' : 'Save Goals'}
        </button>
      </div>
    </div>
  );
};

export default GoalSetting;
