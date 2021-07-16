import { SORT_BY_HIGH_SCORE } from '../index';

const sortHighScore = (sortType) => (dispatch, getState) => {
 
  const filterRecipes = getState().filterRecipes.slice();


  if (sortType === 'High_Score') {
    const sortedRecipes = filterRecipes.sort(
      (a, b) => a.healthScore - b.healthScore
    );
    dispatch({
      type: SORT_BY_HIGH_SCORE,
      payload: {
        sortedRecipes,
        name: sortType,
      },
    });
  }

};

export default sortHighScore;
