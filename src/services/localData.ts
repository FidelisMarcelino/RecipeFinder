import type { Recipe } from '../types/recipe'

export const getRecipes = (): Recipe[] => {
  try {
    return JSON.parse(localStorage.getItem('recipes') || '[]')
  } catch {
    return []
  }
}

export const getRecipeById = (id: string): Recipe | undefined => {
  return getRecipes().find(r => r.idMeal === id)
}

export const saveRecipe = (recipe: Omit<Recipe, "idMeal"> & { idMeal?: string }): Recipe => {
  const recipes = getRecipes()
  
  if (recipe.idMeal) {
    const index = recipes.findIndex(r => r.idMeal === recipe.idMeal)
    if (index !== -1) {
      recipes[index] = recipe as Recipe
      localStorage.setItem('recipes', JSON.stringify(recipes))
      return recipe as Recipe
    }
  }
  
  const newRecipe: Recipe = {
    ...recipe,
    idMeal: Date.now().toString() + Math.random().toString(36).substring(2, 9)
  }
  
  recipes.push(newRecipe)
  localStorage.setItem('recipes', JSON.stringify(recipes))
  
  return newRecipe
}

export const deleteRecipe = (id: string): void => {
  const recipes = getRecipes().filter(r => r.idMeal !== id)
  localStorage.setItem('recipes', JSON.stringify(recipes))
}
