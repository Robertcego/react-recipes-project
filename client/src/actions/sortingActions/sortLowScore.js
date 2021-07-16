import { SORT_BY_LOW_SCORE } from '../index';

const sortLowScore = (sortType) => (dispatch, getState) => {
  // const filterBy = getState().filterBy;
  // const getRecipes = getState().getRecipes.slice();
  const filterRecipes = getState().filterRecipes.slice();

  // if (filterBy === 'All') {
  //   if (sortType === 'Low_Score') {
  //     const sortedRecipes = getRecipes.sort(
  //       (a, b) => a.healthScore - b.healthScore
  //     );
  //     dispatch({
  //       type: SORT_BY_LOW_SCORE,
  //       payload: {
  //         sortedRecipes,
  //         name: sortType,
  //       },
  //     });
  //   }
  // } else {
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
  // }
};

export default sortLowScore;
