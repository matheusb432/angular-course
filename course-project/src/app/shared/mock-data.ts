import { Recipe } from '../components/recipe/recipe.model';
import { Ingredient } from './ingredient.model';

// ? recipes mock list
export const mockRecipes: Recipe[] = [
  new Recipe(
    'Beef Recipe',
    'recipe description',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    [new Ingredient('beef ing 1', 10), new Ingredient('beef ing 2', 15)]
  ),
  new Recipe(
    'Shrimp Recipe',
    'recipe desc',
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
    [
      new Ingredient('shrimp ing 1', 20),
      new Ingredient('shrimp ing 2', 12),
      new Ingredient('shrimp ing 3', 530),
      new Ingredient('shrimp ing 4', 5),
    ]
  ),
  new Recipe(
    'Dish Recipe',
    'Long Recipe description hmmm yes this is indeed a recipe',
    'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
    [
      new Ingredient('dish ing 1', 9),
      new Ingredient('dish ing 2', 2),
      new Ingredient('dish ing 3', 6),
    ]
  ),
];
