import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-200 flex justify-between items-center mb-6">
      <div>
        <Link to="/" className="font-bold text-xl">Recipe Finder</Link>
      </div>
      <div>
        <Link to="/" className="mr-6 hover:underline">Home</Link>
        <Link to="/saved" className="mr-6 hover:underline">Saved Recipes</Link>
        <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition">Create Recipe</Link>
      </div>
    </nav>
  )
}