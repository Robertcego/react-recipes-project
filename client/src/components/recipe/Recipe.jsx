import React from 'react';
import { Link } from 'react-router-dom';

import DotsLoader from '../../utils/dotsLoader/DotsLoader';
import FoodTrivia from '../../utils/foodTrivia/FoodTrivia';

import './Recipe.component.css';

function Recipe({ recipes, loading }) {
  if (loading)
    return (
      <div className='loader-container'>
        <h1 className='loader-text'>Please wait...</h1>
        <DotsLoader />;
      </div>
    );
  return (
    <div className='main-container'>
      <FoodTrivia />
      <div className='recipe-container'>
        {recipes.map((recipe) => (
          <div className='recipe-card' key={recipe.id}>
            <img
              src={recipe.image}
              style={{ maxWidth: '100%' }}
              alt={recipe.name}
            />
            <div className='container'>
              <h3>{recipe.name}</h3>
              <p className='diet-types'>
                <span className='diet-type'>{recipe.diets}</span>
              </p>
              <p>
                Health Score: {recipe.healthScore} | Score: {recipe.score}
              </p>
              <Link to={`/recipes/${recipe.id}`}>
                <p className='btn'>More...</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipe;
