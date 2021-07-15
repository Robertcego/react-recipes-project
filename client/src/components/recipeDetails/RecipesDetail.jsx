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

  // const recipe = [];
  // recipe.push(recipeDetail);
  // console.log(recipeDetail);

  // DOM element rendered with dangeorouslySetInnerHTML
  const summary = () => {
    return { __html: recipeDetail.summary };
  };
  const instructions = () => {
    return { __html: recipeDetail.instructions };
  };

  return (
    <div>
      {/* {recipe.map((recipe) => ( */}
      <div key={recipeDetail.id}>
        <h2>{recipeDetail.name}</h2>
        Health Score: {recipeDetail.healthScore} Score: {recipeDetail.score}
        <p>{recipeDetail.diets}</p>
        <div dangerouslySetInnerHTML={summary()} />
        <h3>Instructions:</h3>
        <div dangerouslySetInnerHTML={instructions()} />
        <img src={recipeDetail.image} alt={recipeDetail.name} />
      </div>
      {/* ))} */}
    </div>
  );
}

export default RecipesDetail;
