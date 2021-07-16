import React, { useState, useEffect } from 'react';
import { getRecipes, getDiets } from '../../actions/index';
import { useSelector, useDispatch } from 'react-redux';

import Recipe from '../recipe/Recipe';
import Pagination from '../../utils/Pagination';
import FilterDropdown from '../../utils/filterDropdown/FilterDropdown';

import './Recipes.component.css';

function Recipes() {
  const dispatch = useDispatch();

  // Get recipes from store
  const recipes = useSelector((state) => state.getRecipes);
  const [sortedRecipes, setSortedRecipes] = useState([]);

  // Pagination

  const [loading, setLoading] = useState(true);
  const [currentRecipes, setCurrentRecipes] = useState(1);
  const [recipesPerPage] = useState(9);

  // Sorting variables
  const { filterRecipes } = useSelector((state) => state);
  const { orderBy } = useSelector((state) => state);
  const { filterBy } = useSelector((state) => state);

  // Load the recipes
  // Load the diets
  useEffect(() => {
    if (recipes.length !== 0) return setLoading(false);
    dispatch(getDiets());
    dispatch(getRecipes());
  }, [dispatch, recipes]);

  useEffect(() => {
    if (filterBy === 'All' && orderBy === 'Select') {
      setSortedRecipes(recipes.slice());
    } else {
      setSortedRecipes(filterRecipes.slice());
    }
  }, [dispatch, recipes, filterBy, orderBy, filterRecipes]);

  const indexOfLastRecipe = currentRecipes * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const recipesToDisplay = sortedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber) => {
    setCurrentRecipes(pageNumber);
  };

  return (
    <div className='container'>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={sortedRecipes.length}
        paginate={paginate}
      />
      <FilterDropdown />
      {/* Recipes here*/}
      <Recipe recipes={recipesToDisplay} loading={loading} />
      {/* Recipes here*/}
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={sortedRecipes.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Recipes;
