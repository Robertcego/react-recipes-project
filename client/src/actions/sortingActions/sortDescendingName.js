import { SORT_BY_DESCENDING_NAME } from '../index';

const sortDescendingName = (sortType) => (dispatch, getState) => {
  const filterRecipes = getState().filterRecipes.slice();

  if (sortType === 'Descending_Name') {
    const sortedRecipes = filterRecipes.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    dispatch({
      type: SORT_BY_DESCENDING_NAME,
      payload: {
        sortedRecipes,
        name: sortType,
      },
    });
  }
};

export default sortDescendingName;
