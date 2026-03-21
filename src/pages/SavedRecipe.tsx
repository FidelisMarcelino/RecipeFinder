import { useEffect, useState } from "react"
import { getRecipes } from "../services/localData"
import type { Recipe } from "../types/recipe"
import RecipeCard from "../components/RecipeCard"
import { Link } from "react-router-dom"

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    loadSavedRecipes()
  }, [])

  const loadSavedRecipes = () => {
    const allData = getRecipes()
    setRecipes(allData.filter(r => r.isSaved))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Saved Recipes</h1>

      {recipes.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">No saved recipes yet. Go to Home to save some!</p>
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
          {recipes.map(r => (
            <div key={r.idMeal} className="relative group">
              <RecipeCard recipe={r} onSaveToggle={loadSavedRecipes} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
