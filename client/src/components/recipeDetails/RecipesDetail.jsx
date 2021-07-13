import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getRecipeDetails } from '../../actions/index';

function RecipesDetail() {
  const { id } = useParams();
  const recipeDetail = useSelector((state) => state.recipeDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const recipe = [];
  recipe.push(recipeDetail);
  console.log(recipe);
  return (
    <div>
      {recipe.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.diets}</p>
          <p>{recipe.summary}</p>
          <p>
            {recipe.healthScore} {recipe.score}
          </p>
          <p>{recipe.instructions}</p>
          <img src={recipe.image} alt={recipe.name} />
        </div>
      ))}
    </div>
  );
}

export default RecipesDetail;
