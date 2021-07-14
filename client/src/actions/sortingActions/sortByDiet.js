import { SORT_BY_DIET } from '../index';

const sortByDiet = (sortType) => (dispatch, getState) => {
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
    const recipeSortedByDiet = getState()
      .getRecipes.slice()
      .filter((recipe) => recipe.diets.includes(sortType));
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
