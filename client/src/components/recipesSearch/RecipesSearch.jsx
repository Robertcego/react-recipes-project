import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeNames } from '../../actions/index';
import Recipe from '../recipe/Recipe';

import './RecipesSearch.component.css';

function RecipesSearch() {
  const dispatch = useDispatch();
  const getRecipesName = useSelector((state) => state.getRecipesName);
  const [recipeNames, setRecipeNames] = useState('');

  const handleRecipeName = (e) => {
    e.preventDefault();
    setRecipeNames(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeNames(recipeNames));
  };

  console.log(getRecipesName);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className='search-form-title'>Search for a recipe</h2>
        <input
          className='search-input-bar'
          type='text'
          placeholder='Search and hit enter'
          value={recipeNames}
          onChange={handleRecipeName}
        />
      </form>
      <Recipe recipes={getRecipesName} />
    </div>
  );
}

export default RecipesSearch;
