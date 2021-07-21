import { SORT_BY_DIET } from '../index';

const sortByDiet = (sortType) => (dispatch, getState) => {
  // ! If the value is all
  // ! then return all the recipes
  if (sortType === 'All') {
    const recipeSortedByDiet = getState().getRecipes.slice();
    dispatch({
      type: SORT_BY_DIET,
      payload: {
        sortType,
        recipeSortedByDiet,
      },
    });
  } else {
    // ! Else if the value is a diet
    // ! and a recipe has the diet
    // ! return those recipes
    const recipeSortedByDiet = getState()
      .getRecipes.slice()
      .filter((recipe) => recipe.diets.includes(sortType));
    // ! filter all the recipes that have the diet
    dispatch({
      type: SORT_BY_DIET,
      payload: {
        recipeSortedByDiet,
        sortType,
      },
    });
  }
};

export default sortByDiet;
