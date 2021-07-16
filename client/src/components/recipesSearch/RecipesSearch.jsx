import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeNames } from '../../actions/index';
import Recipe from '../recipe/Recipe';

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
        <input
          type='text'
          name='q'
          value={recipeNames}
          onChange={handleRecipeName}
        />
      </form>
      {/* <div>
        {getRecipesName.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.name}</h3>
          </div>
        ))}
      </div> */}
      <Recipe recipes={getRecipesName} />
    </div>
  );
}

export default RecipesSearch;
