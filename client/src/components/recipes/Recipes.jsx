import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../actions/index';
import { useSelector, useDispatch } from 'react-redux';

import Recipe from '../recipe/Recipe';
import Pagination from '../../utils/Pagination';

import './Recipes.component.css';

function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.getRecipes);

  const [loading, setLoading] = useState(true);
  const [currentRecipes, setCurrentRecipes] = useState(1);
  const [recipesPerPage] = useState(9);

  useEffect(() => {
    if (recipes.length !== 0) return setLoading(false);
    dispatch(getRecipes());
  }, [dispatch, recipes]);

  const indexOfLastRecipe = currentRecipes * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const recipesToDisplay = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentRecipes(pageNumber);
  };

  return (
    <div className='container'>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
      />
      <Recipe recipes={recipesToDisplay} loading={loading} />
    </div>
  );
}

export default Recipes;
