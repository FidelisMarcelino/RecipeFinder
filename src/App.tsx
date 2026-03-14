import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import RecipeForm from './pages/RecipeForm'
import SavedRecipes from './pages/SavedRecipe'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/saved' element={<SavedRecipes />}/>
        <Route path='/create' element={<RecipeForm />}/>
        <Route path='/edit/:id' element={<RecipeForm />}/>
        <Route path='/recipe/:id' element={<RecipeDetail />}/>
      </Routes>
    </>
  )
}

export default App
