import type { Recipe } from "../types/recipe"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { saveRecipe as updateRecipeInLocal } from "../services/localData"

interface Props {
  recipe: Recipe
  onSaveToggle?: () => void
}

export default function RecipeCard({ recipe, onSaveToggle }: Props) {

  const navigate = useNavigate()
  const [isSaved, setIsSaved] = useState(recipe.isSaved || false)

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newStatus = !isSaved
    setIsSaved(newStatus)
    updateRecipeInLocal({ ...recipe, isSaved: newStatus })
    if (onSaveToggle) onSaveToggle()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden">
      <button
        onClick={handleSaveToggle}
        className={`absolute top-2 right-2 p-2 text-2xl drop-shadow-md transition hover:scale-110 z-10 ${isSaved ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`}
        title={isSaved ? "Remove from Saved" : "Save Recipe"}
      >
        {isSaved ? '★' : '☆'}
      </button>

      <img
        src={recipe.strMealThumb || "https://placehold.co/600x400?text=No+Image"}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{recipe.strMeal}</h3>

        <div className="flex gap-2 mb-4 text-xs">
          {recipe.strCategory && <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{recipe.strCategory}</span>}
          {recipe.strArea && <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{recipe.strArea}</span>}
        </div>

        <div className="mt-auto">
          <button
            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  )
}

