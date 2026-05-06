export interface Food {
  id: string;
  name: string;
  category: string;
  servingSize: number; // grams
  servingUnit: string;
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  sugar: number; // g
  sodium: number; // mg
  tags: string[];
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Theme = 'light' | 'dark' | 'ocean';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export interface MealEntry {
  id: string;
  foodId: string;
  foodName: string;
  mealType: MealType;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  loggedAt: string; // ISO date string
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  entries: MealEntry[];
}

export interface UserGoals {
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  waterGlasses: number;
  weight?: number; // kg
  height?: number; // cm
  age?: number;
  gender?: 'male' | 'female' | 'other';
  activityLevel?: ActivityLevel;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'protein' | 'fiber' | 'balance' | 'hydration' | 'habit' | 'calories';
  foods?: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface ActivityEntry {
  id: string;
  name: string;
  icon: string;
  duration: number; // minutes
  caloriesBurned: number;
  loggedAt: string;
}

export interface DailyActivity {
  date: string;
  entries: ActivityEntry[];
}
