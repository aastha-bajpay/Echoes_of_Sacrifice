import type { Food } from '../types';

export const FOODS: Food[] = [
  // Fruits
  { id: 'apple', name: 'Apple', category: 'Fruits', servingSize: 182, servingUnit: 'medium (182g)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, sugar: 19, sodium: 2, tags: ['fruit', 'snack', 'sweet', 'fiber'] },
  { id: 'banana', name: 'Banana', category: 'Fruits', servingSize: 118, servingUnit: 'medium (118g)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, sugar: 14, sodium: 1, tags: ['fruit', 'snack', 'sweet', 'potassium'] },
  { id: 'orange', name: 'Orange', category: 'Fruits', servingSize: 131, servingUnit: 'medium (131g)', calories: 62, protein: 1.2, carbs: 15, fat: 0.2, fiber: 3.1, sugar: 12, sodium: 0, tags: ['fruit', 'vitamin-c', 'citrus'] },
  { id: 'strawberries', name: 'Strawberries', category: 'Fruits', servingSize: 152, servingUnit: '1 cup (152g)', calories: 49, protein: 1, carbs: 12, fat: 0.5, fiber: 3, sugar: 7, sodium: 2, tags: ['fruit', 'berry', 'vitamin-c', 'low-calorie'] },
  { id: 'blueberries', name: 'Blueberries', category: 'Fruits', servingSize: 148, servingUnit: '1 cup (148g)', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6, sugar: 15, sodium: 1, tags: ['fruit', 'berry', 'antioxidant'] },
  { id: 'avocado', name: 'Avocado', category: 'Fruits', servingSize: 150, servingUnit: 'medium (150g)', calories: 240, protein: 3, carbs: 13, fat: 22, fiber: 10, sugar: 1, sodium: 11, tags: ['fruit', 'healthy-fat', 'fiber'] },
  { id: 'mango', name: 'Mango', category: 'Fruits', servingSize: 165, servingUnit: '1 cup sliced (165g)', calories: 99, protein: 1.4, carbs: 25, fat: 0.6, fiber: 2.6, sugar: 23, sodium: 2, tags: ['fruit', 'tropical', 'vitamin-c'] },
  { id: 'grapes', name: 'Grapes', category: 'Fruits', servingSize: 151, servingUnit: '1 cup (151g)', calories: 104, protein: 1.1, carbs: 27, fat: 0.2, fiber: 1.4, sugar: 23, sodium: 3, tags: ['fruit', 'snack', 'sweet'] },
  { id: 'watermelon', name: 'Watermelon', category: 'Fruits', servingSize: 280, servingUnit: '2 cups (280g)', calories: 84, protein: 1.7, carbs: 21, fat: 0.4, fiber: 1.1, sugar: 17, sodium: 3, tags: ['fruit', 'hydrating', 'summer', 'low-calorie'] },
  { id: 'pear', name: 'Pear', category: 'Fruits', servingSize: 178, servingUnit: 'medium (178g)', calories: 101, protein: 0.7, carbs: 27, fat: 0.2, fiber: 5.5, sugar: 17, sodium: 2, tags: ['fruit', 'fiber', 'snack'] },

  // Vegetables
  { id: 'broccoli', name: 'Broccoli', category: 'Vegetables', servingSize: 91, servingUnit: '1 cup chopped (91g)', calories: 31, protein: 2.6, carbs: 6, fat: 0.3, fiber: 2.4, sugar: 1.5, sodium: 30, tags: ['vegetable', 'fiber', 'vitamin-c', 'low-calorie'] },
  { id: 'spinach', name: 'Spinach', category: 'Vegetables', servingSize: 30, servingUnit: '1 cup (30g)', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7, sugar: 0.1, sodium: 24, tags: ['vegetable', 'leafy-green', 'iron', 'low-calorie'] },
  { id: 'sweet-potato', name: 'Sweet Potato', category: 'Vegetables', servingSize: 130, servingUnit: 'medium (130g)', calories: 112, protein: 2, carbs: 26, fat: 0.1, fiber: 3.8, sugar: 5, sodium: 72, tags: ['vegetable', 'complex-carb', 'fiber', 'vitamin-a'] },
  { id: 'carrots', name: 'Carrots', category: 'Vegetables', servingSize: 128, servingUnit: '1 cup chopped (128g)', calories: 52, protein: 1.2, carbs: 12, fat: 0.3, fiber: 3.6, sugar: 6, sodium: 88, tags: ['vegetable', 'fiber', 'vitamin-a'] },
  { id: 'bell-pepper', name: 'Bell Pepper', category: 'Vegetables', servingSize: 149, servingUnit: 'medium (149g)', calories: 31, protein: 1, carbs: 7, fat: 0.3, fiber: 2.5, sugar: 3.5, sodium: 4, tags: ['vegetable', 'vitamin-c', 'low-calorie'] },
  { id: 'tomato', name: 'Tomato', category: 'Vegetables', servingSize: 123, servingUnit: 'medium (123g)', calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, fiber: 1.5, sugar: 3.2, sodium: 6, tags: ['vegetable', 'lycopene', 'low-calorie'] },
  { id: 'cucumber', name: 'Cucumber', category: 'Vegetables', servingSize: 119, servingUnit: '½ cup sliced (119g)', calories: 16, protein: 0.7, carbs: 3.8, fat: 0.1, fiber: 0.5, sugar: 1.8, sodium: 2, tags: ['vegetable', 'hydrating', 'low-calorie', 'snack'] },
  { id: 'kale', name: 'Kale', category: 'Vegetables', servingSize: 67, servingUnit: '1 cup chopped (67g)', calories: 33, protein: 2.9, carbs: 6, fat: 0.5, fiber: 2.6, sugar: 1.6, sodium: 29, tags: ['vegetable', 'superfood', 'leafy-green', 'calcium'] },
  { id: 'cauliflower', name: 'Cauliflower', category: 'Vegetables', servingSize: 107, servingUnit: '1 cup (107g)', calories: 27, protein: 2.1, carbs: 5, fat: 0.3, fiber: 2.1, sugar: 2, sodium: 32, tags: ['vegetable', 'low-carb', 'fiber'] },
  { id: 'zucchini', name: 'Zucchini', category: 'Vegetables', servingSize: 124, servingUnit: '1 cup sliced (124g)', calories: 21, protein: 1.5, carbs: 3.9, fat: 0.4, fiber: 1.2, sugar: 3.1, sodium: 10, tags: ['vegetable', 'low-calorie', 'low-carb'] },

  // Proteins
  { id: 'chicken-breast', name: 'Chicken Breast (cooked)', category: 'Proteins', servingSize: 85, servingUnit: '3 oz (85g)', calories: 140, protein: 26, carbs: 0, fat: 3, fiber: 0, sugar: 0, sodium: 63, tags: ['protein', 'lean-meat', 'low-fat'] },
  { id: 'salmon', name: 'Salmon (cooked)', category: 'Proteins', servingSize: 85, servingUnit: '3 oz (85g)', calories: 177, protein: 25, carbs: 0, fat: 8, fiber: 0, sugar: 0, sodium: 55, tags: ['protein', 'fish', 'omega-3', 'healthy-fat'] },
  { id: 'eggs', name: 'Eggs', category: 'Proteins', servingSize: 100, servingUnit: '2 large eggs (100g)', calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5, fiber: 0, sugar: 0.4, sodium: 142, tags: ['protein', 'breakfast', 'versatile'] },
  { id: 'greek-yogurt', name: 'Greek Yogurt (plain)', category: 'Proteins', servingSize: 170, servingUnit: '6 oz (170g)', calories: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, sugar: 6, sodium: 65, tags: ['protein', 'dairy', 'probiotic', 'snack'] },
  { id: 'tuna', name: 'Tuna (canned in water)', category: 'Proteins', servingSize: 85, servingUnit: '3 oz (85g)', calories: 100, protein: 22, carbs: 0, fat: 1, fiber: 0, sugar: 0, sodium: 287, tags: ['protein', 'fish', 'low-fat', 'lean'] },
  { id: 'black-beans', name: 'Black Beans (cooked)', category: 'Proteins', servingSize: 172, servingUnit: '1 cup (172g)', calories: 227, protein: 15, carbs: 41, fat: 0.9, fiber: 15, sugar: 0.6, sodium: 2, tags: ['protein', 'legume', 'fiber', 'plant-based'] },
  { id: 'lentils', name: 'Lentils (cooked)', category: 'Proteins', servingSize: 198, servingUnit: '1 cup (198g)', calories: 230, protein: 18, carbs: 40, fat: 0.8, fiber: 16, sugar: 3.6, sodium: 4, tags: ['protein', 'legume', 'fiber', 'plant-based'] },
  { id: 'tofu', name: 'Tofu (firm)', category: 'Proteins', servingSize: 126, servingUnit: '½ cup (126g)', calories: 94, protein: 10, carbs: 2.3, fat: 5.6, fiber: 0.3, sugar: 0.9, sodium: 9, tags: ['protein', 'plant-based', 'vegan'] },
  { id: 'turkey-breast', name: 'Turkey Breast (cooked)', category: 'Proteins', servingSize: 85, servingUnit: '3 oz (85g)', calories: 125, protein: 26, carbs: 0, fat: 1.8, fiber: 0, sugar: 0, sodium: 44, tags: ['protein', 'lean-meat', 'low-fat'] },
  { id: 'shrimp', name: 'Shrimp (cooked)', category: 'Proteins', servingSize: 85, servingUnit: '3 oz (85g)', calories: 84, protein: 18, carbs: 0.2, fat: 0.9, fiber: 0, sugar: 0, sodium: 190, tags: ['protein', 'seafood', 'low-calorie', 'low-fat'] },
  { id: 'chickpeas', name: 'Chickpeas (cooked)', category: 'Proteins', servingSize: 164, servingUnit: '1 cup (164g)', calories: 269, protein: 14.5, carbs: 45, fat: 4.2, fiber: 12.5, sugar: 7.9, sodium: 11, tags: ['protein', 'legume', 'fiber', 'plant-based'] },
  { id: 'edamame', name: 'Edamame', category: 'Proteins', servingSize: 155, servingUnit: '1 cup shelled (155g)', calories: 188, protein: 18.4, carbs: 13.8, fat: 8.1, fiber: 8, sugar: 3.4, sodium: 9, tags: ['protein', 'plant-based', 'soy', 'fiber'] },

  // Grains
  { id: 'oatmeal', name: 'Oatmeal (cooked)', category: 'Grains', servingSize: 234, servingUnit: '1 cup cooked (234g)', calories: 166, protein: 6, carbs: 28, fat: 3.6, fiber: 4, sugar: 0.6, sodium: 115, tags: ['grain', 'breakfast', 'fiber', 'complex-carb'] },
  { id: 'brown-rice', name: 'Brown Rice (cooked)', category: 'Grains', servingSize: 195, servingUnit: '1 cup cooked (195g)', calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, sugar: 0.7, sodium: 10, tags: ['grain', 'complex-carb', 'fiber'] },
  { id: 'whole-wheat-bread', name: 'Whole Wheat Bread', category: 'Grains', servingSize: 56, servingUnit: '2 slices (56g)', calories: 138, protein: 6, carbs: 26, fat: 2, fiber: 4, sugar: 3, sodium: 258, tags: ['grain', 'bread', 'fiber'] },
  { id: 'quinoa', name: 'Quinoa (cooked)', category: 'Grains', servingSize: 185, servingUnit: '1 cup cooked (185g)', calories: 222, protein: 8, carbs: 39, fat: 3.6, fiber: 5, sugar: 1.6, sodium: 13, tags: ['grain', 'complete-protein', 'fiber', 'gluten-free'] },
  { id: 'pasta', name: 'Whole Wheat Pasta (cooked)', category: 'Grains', servingSize: 140, servingUnit: '1 cup cooked (140g)', calories: 174, protein: 7.5, carbs: 37, fat: 0.8, fiber: 4.2, sugar: 1.1, sodium: 4, tags: ['grain', 'pasta', 'complex-carb'] },
  { id: 'white-rice', name: 'White Rice (cooked)', category: 'Grains', servingSize: 186, servingUnit: '1 cup cooked (186g)', calories: 242, protein: 4.4, carbs: 53, fat: 0.4, fiber: 0.6, sugar: 0, sodium: 1, tags: ['grain', 'carb', 'staple'] },
  { id: 'granola', name: 'Granola', category: 'Grains', servingSize: 58, servingUnit: '½ cup (58g)', calories: 251, protein: 6, carbs: 39, fat: 9, fiber: 3.5, sugar: 15, sodium: 78, tags: ['grain', 'breakfast', 'snack', 'energy'] },
  { id: 'corn-tortilla', name: 'Corn Tortilla', category: 'Grains', servingSize: 52, servingUnit: '2 small tortillas (52g)', calories: 114, protein: 3, carbs: 24, fat: 1.4, fiber: 3.4, sugar: 0.4, sodium: 43, tags: ['grain', 'gluten-free', 'mexican'] },

  // Dairy
  { id: 'milk', name: 'Milk (1% fat)', category: 'Dairy', servingSize: 244, servingUnit: '1 cup (244ml)', calories: 102, protein: 8, carbs: 12, fat: 2.4, fiber: 0, sugar: 13, sodium: 107, tags: ['dairy', 'calcium', 'protein'] },
  { id: 'cottage-cheese', name: 'Cottage Cheese (low-fat)', category: 'Dairy', servingSize: 113, servingUnit: '½ cup (113g)', calories: 81, protein: 14, carbs: 3, fat: 1.1, fiber: 0, sugar: 3, sodium: 360, tags: ['dairy', 'protein', 'snack', 'low-fat'] },
  { id: 'cheddar-cheese', name: 'Cheddar Cheese', category: 'Dairy', servingSize: 28, servingUnit: '1 oz (28g)', calories: 113, protein: 7, carbs: 0.4, fat: 9.3, fiber: 0, sugar: 0.1, sodium: 174, tags: ['dairy', 'protein', 'calcium'] },
  { id: 'mozzarella', name: 'Mozzarella (part-skim)', category: 'Dairy', servingSize: 28, servingUnit: '1 oz (28g)', calories: 72, protein: 6.9, carbs: 0.8, fat: 4.5, fiber: 0, sugar: 0.3, sodium: 132, tags: ['dairy', 'protein', 'calcium', 'pizza'] },

  // Nuts & Seeds
  { id: 'almonds', name: 'Almonds', category: 'Nuts & Seeds', servingSize: 28, servingUnit: '1 oz / ~23 almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, sugar: 1.2, sodium: 0, tags: ['nuts', 'healthy-fat', 'snack', 'vitamin-e'] },
  { id: 'walnuts', name: 'Walnuts', category: 'Nuts & Seeds', servingSize: 28, servingUnit: '1 oz (28g)', calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, fiber: 1.9, sugar: 0.7, sodium: 1, tags: ['nuts', 'omega-3', 'healthy-fat', 'snack'] },
  { id: 'peanut-butter', name: 'Peanut Butter (natural)', category: 'Nuts & Seeds', servingSize: 32, servingUnit: '2 tbsp (32g)', calories: 191, protein: 7, carbs: 7, fat: 16, fiber: 1.6, sugar: 2, sodium: 147, tags: ['nuts', 'protein', 'healthy-fat', 'spread'] },
  { id: 'chia-seeds', name: 'Chia Seeds', category: 'Nuts & Seeds', servingSize: 28, servingUnit: '1 oz / 2 tbsp (28g)', calories: 138, protein: 4.7, carbs: 12, fat: 8.7, fiber: 9.8, sugar: 0, sodium: 5, tags: ['seeds', 'omega-3', 'fiber', 'superfood'] },
  { id: 'sunflower-seeds', name: 'Sunflower Seeds', category: 'Nuts & Seeds', servingSize: 28, servingUnit: '1 oz (28g)', calories: 165, protein: 5.5, carbs: 6.5, fat: 14, fiber: 2.4, sugar: 1, sodium: 1, tags: ['seeds', 'healthy-fat', 'vitamin-e', 'snack'] },
  { id: 'flaxseeds', name: 'Flaxseeds (ground)', category: 'Nuts & Seeds', servingSize: 14, servingUnit: '2 tbsp (14g)', calories: 75, protein: 2.6, carbs: 4, fat: 5.9, fiber: 3.8, sugar: 0.2, sodium: 4, tags: ['seeds', 'omega-3', 'fiber', 'superfood'] },

  // Beverages
  { id: 'water', name: 'Water', category: 'Beverages', servingSize: 240, servingUnit: '1 cup (240ml)', calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0, tags: ['beverage', 'hydration', 'essential'] },
  { id: 'green-tea', name: 'Green Tea', category: 'Beverages', servingSize: 240, servingUnit: '1 cup (240ml)', calories: 2, protein: 0, carbs: 0.5, fat: 0, fiber: 0, sugar: 0, sodium: 2, tags: ['beverage', 'antioxidant', 'low-calorie'] },
  { id: 'orange-juice', name: 'Orange Juice (fresh)', category: 'Beverages', servingSize: 240, servingUnit: '1 cup (240ml)', calories: 112, protein: 1.7, carbs: 26, fat: 0.5, fiber: 0.5, sugar: 21, sodium: 2, tags: ['beverage', 'vitamin-c', 'fruit-juice'] },
  { id: 'black-coffee', name: 'Black Coffee', category: 'Beverages', servingSize: 240, servingUnit: '1 cup (240ml)', calories: 5, protein: 0.3, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 5, tags: ['beverage', 'caffeine', 'low-calorie'] },
  { id: 'protein-shake', name: 'Protein Shake (whey)', category: 'Beverages', servingSize: 240, servingUnit: '1 serving (240ml)', calories: 130, protein: 25, carbs: 5, fat: 2, fiber: 1, sugar: 3, sodium: 160, tags: ['beverage', 'protein', 'post-workout', 'supplement'] },
];

export const FOOD_CATEGORIES = [...new Set(FOODS.map((f) => f.category))];

export function searchFoods(query: string): Food[] {
  const q = query.toLowerCase().trim();
  if (!q) return FOODS;
  return FOODS.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.tags.some((t) => t.includes(q))
  );
}
