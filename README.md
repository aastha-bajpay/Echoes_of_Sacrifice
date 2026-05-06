# 🥗 WellFuel – Smart Nutrition Tracker

A feature-rich nutrition tracking MVP built with **React 19**, **TypeScript**, and **Vite**.

---

## ✨ Features

### 🎨 Theme System
- **Light 🌱, Dark 🌙, and Ocean 🌊** themes switchable in real time
- Fully themed with CSS custom properties — persisted in `localStorage`

### 📊 Dashboard
- **Calorie ring** showing consumed / burned / remaining calories
- **Net calories** = eaten − exercise burned
- **Macro bars** for protein, carbs, fat, and fiber vs goals
- **Streak counter** 🔥 for consecutive days of logging
- **Water tracker** with interactive glass-by-glass UI 💧
- **7-day weekly progress chart** (SVG bar chart)
- Meal breakdown by type

### 🔍 Food Search & Logging
- **50+ foods** across 6 categories (Fruits, Vegetables, Proteins, Grains, Dairy, Nuts & Seeds, Beverages)
- **Recent foods** surfaced at the top for quick re-logging
- Category filter chips for narrowed browsing
- Per-food macro expansion with meal selector and serving adjuster

### 🏃 Activity Log *(new)*
- Log 12 exercise types (Walking, Running, HIIT, Swimming, Yoga, and more)
- Calorie burn calculated via MET × weight × duration
- Calorie burn reflected in dashboard's **net calories**

### 🎯 Goal Setting
- Manual macro sliders for calories, protein, carbs, fat, fiber, water
- 4 quick presets: Weight Loss, Maintenance, Muscle Gain, Athletic
- **Macro distribution bar** with calorie alignment warning

### 🧮 BMI & TDEE Calculator *(new)*
- Input weight, height, age, gender, activity level
- Calculates BMI with health category
- **Mifflin-St Jeor BMR** and TDEE
- One-click "Use TDEE as calorie goal"

### 💡 Smart Insights
- Personalized recommendations based on intake vs goals
- Detects low protein, low fiber, high fat, under-eating, breakfast skipping
- Healthy eating tips grid

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** for bundling
- CSS Custom Properties for themeable design
- `localStorage` for full offline persistence
- Zero external UI libraries — pure CSS

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx       # Home tab with ring, macros, water, weekly chart
│   ├── FoodSearch.tsx      # Search + add foods with recent history
│   ├── MealLog.tsx         # Per-day meal history + remove
│   ├── ActivityLog.tsx     # Exercise logging with calorie burn ⭐ new
│   ├── Recommendations.tsx # Smart insights + tips
│   ├── GoalSetting.tsx     # Goal sliders + BMI calculator ⭐ improved
│   ├── NutritionBar.tsx    # Reusable macro progress bar
│   ├── ThemeToggle.tsx     # Light / Dark / Ocean switcher ⭐ new
│   ├── WaterTracker.tsx    # Glass-by-glass water tracker ⭐ new
│   └── WeeklyProgress.tsx  # 7-day SVG calorie chart ⭐ new
├── hooks/
│   ├── useMealLog.ts       # Meal log state + localStorage
│   ├── useTheme.ts         # Theme state + document attribute ⭐ new
│   ├── useWater.ts         # Per-day water tracking ⭐ new
│   └── useActivity.ts      # Exercise log state ⭐ new
├── data/foods.ts           # 50+ foods database (expanded)
├── types/index.ts          # Shared TypeScript types
├── utils/nutrition.ts      # Calculations: BMR, TDEE, streak, macros
└── index.css               # Full theme-aware CSS
```

