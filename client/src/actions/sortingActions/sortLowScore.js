import { SORT_BY_LOW_SCORE } from '../index';

const sortLowScore = (sortType) => (dispatch, getState) => {
  const filterRecipes = getState().filterRecipes.slice();

  if (sortType === 'Low_Score') {
    const sortedRecipes = filterRecipes.sort(
      (a, b) => b.healthScore - a.healthScore
    );
    dispatch({
      type: SORT_BY_LOW_SCORE,
      payload: {
        sortedRecipes,
        name: sortType,
      },
    });
  }
};

export default sortLowScore;
