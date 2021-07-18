import './App.css';
import React from 'react';
import Recipes from './components/recipes/Recipes.jsx';
import RecipesDetail from './components/recipeDetails/RecipesDetail';
import NavBar from './components/Navbar/NavBar';
import RecipesSearch from './components/recipesSearch/RecipesSearch';

import { Route } from 'react-router-dom';
import AddRecipe from './components/addRecipe/AddRecipe';
import Home from './components/Home/Home';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Route exact path='/' component={Home} />
      <Route exact path='/recipes' component={Recipes} />
      <Route path='/recipes/:id' component={RecipesDetail} />
      <Route exact path='/search' component={RecipesSearch} />
      <Route exact path='/create' component={AddRecipe} />
    </div>
  );
}

export default App;
