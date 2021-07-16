import './App.css';
import React from 'react';
import Recipes from './components/recipes/Recipes.jsx';
import RecipesDetail from './components/recipeDetails/RecipesDetail';
import NavBar from './components/Navbar/NavBar';
import RecipesSearch from './components/recipesSearch/RecipesSearch';

import { Route } from 'react-router-dom';
import AddRecipe from './components/addRecipe/AddRecipe';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <h1>Henry Food</h1>
      <Route exact path='/recipes' component={Recipes} />
      <Route exact path='/recipes/:id' component={RecipesDetail} />
      <Route exact path='/search' component={RecipesSearch} />
      <Route exact path='/create' component={AddRecipe} />
    </div>
  );
}

export default App;
