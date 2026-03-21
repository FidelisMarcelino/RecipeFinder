import { useState, useEffect } from "react"
import { getRecipes } from "../services/localData"
import type { Recipe } from "../types/recipe"
import RecipeCard from "../components/RecipeCard"
import { Link } from "react-router-dom"

export default function Home() {

  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    setRecipes(getRecipes())
  }, [])

  const handleSearch = () => {
    const allData = getRecipes()
    if (!query.trim()) {
      setRecipes(allData)
    } else {
      setRecipes(allData.filter(r => r.strMeal.toLowerCase().includes(query.toLowerCase())))
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6 text-green-500">Recipe Finder</h1>

      <div className="flex justify-center mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipe..."
          className="border border-gray-300 p-2 rounded-l w-64 focus:outline-none focus:border-green-400"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button 
          className="cursor-pointer border border-green-500 p-2 bg-green-500 text-white rounded-r hover:bg-green-600 transition" 
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">No recipes found. Start by creating a new one!</p>
          <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Create Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
          {recipes.map(r => (
            <RecipeCard key={r.idMeal} recipe={r} />
          ))}
        </div>
      )}
    </div>
  )
}
