import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRecipeById, saveRecipe } from "../services/localData"
import type { Recipe } from "../types/recipe"

export default function RecipeForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Partial --> supaya bisa isi form yang hanya berisi sebagian field aja
  const [formData, setFormData] = useState<Partial<Recipe>>({
    strMeal: "",
    strCategory: "",
    strArea: "",
    strMealThumb: "",
    strInstructions: ""
  })

  useEffect(() => {
    if (id) {
      const recipe = getRecipeById(id)
      if (recipe) {
        setFormData(recipe)
      } else {
        alert("Recipe not found!")
        navigate('/')
      }
    }
  }, [id, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.strMeal) {
      alert("Recipe name is required!")
      return
    }

    saveRecipe(formData as any)
    navigate('/')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, strMealThumb: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border border-gray-300 rounded shadow-sm">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Recipe" : "Create Recipe"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-semibold mb-1">Recipe Name *</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.strMeal || ""}
            onChange={e => setFormData({ ...formData, strMeal: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            list="category-options"
            className="w-full border border-gray-300 p-2 rounded bg-white"
            value={formData.strCategory || ""}
            onChange={e => setFormData({ ...formData, strCategory: e.target.value })}
            placeholder="Type or select category..."
          />
          <datalist id="category-options">
            <option value="Beef" />
            <option value="Breakfast" />
            <option value="Chicken" />
            <option value="Dessert" />
            <option value="Goat" />
            <option value="Lamb" />
            <option value="Miscellaneous" />
            <option value="Pasta" />
            <option value="Pork" />
            <option value="Seafood" />
            <option value="Side" />
            <option value="Starter" />
            <option value="Vegan" />
            <option value="Vegetarian" />
          </datalist>
        </div>

        <div>
          <label className="block font-semibold mb-1">Area / Cuisine</label>
          <input
            list="area-options"
            className="w-full border border-gray-300 p-2 rounded bg-white"
            value={formData.strArea || ""}
            onChange={e => setFormData({ ...formData, strArea: e.target.value })}
            placeholder="Type or select cuisine..."
          />
          <datalist id="area-options">
            <option value="American" />
            <option value="British" />
            <option value="Canadian" />
            <option value="Chinese" />
            <option value="Croatian" />
            <option value="Dutch" />
            <option value="Egyptian" />
            <option value="Filipino" />
            <option value="French" />
            <option value="Greek" />
            <option value="Indian" />
            <option value="Indonesian" />
            <option value="Irish" />
            <option value="Italian" />
            <option value="Jamaican" />
            <option value="Japanese" />
            <option value="Kenyan" />
            <option value="Malaysian" />
            <option value="Mexican" />
            <option value="Moroccan" />
            <option value="Polish" />
            <option value="Portuguese" />
            <option value="Russian" />
            <option value="Spanish" />
            <option value="Thai" />
            <option value="Tunisian" />
            <option value="Turkish" />
            <option value="Vietnamese" />
            <option value="Unknown" />
          </datalist>
        </div>

        <div>
          <label className="block font-semibold mb-1">Image (Upload or URL)</label>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-1.5 rounded bg-white text-sm"
            />
            <div className="text-center text-gray-500 font-medium text-xs">OR</div>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Paste image URL here (https://...)"
              value={formData.strMealThumb || ""}
              onChange={e => setFormData({ ...formData, strMealThumb: e.target.value })}
            />
          </div>
          {formData.strMealThumb && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img src={formData.strMealThumb} alt="Preview" className="h-32 w-auto object-cover rounded border border-gray-200" />
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Instructions</label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.strInstructions || ""}
            onChange={e => setFormData({ ...formData, strInstructions: e.target.value })}
          ></textarea>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {id ? "Update" : "Save"} Recipe
          </button>
        </div>
      </form>
    </div>
  )
}
