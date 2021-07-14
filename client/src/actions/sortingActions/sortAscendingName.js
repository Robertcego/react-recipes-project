import { SORT_BY_ASCENDING_NAME } from '../index';

const sortAscendingName = (sortType) => (dispatch, getState) => {
  const filterBy = getState().filterBy;
  const getRecipes = getState().getRecipes.slice();
  const filterRecipes = getState().filterRecipes.slice();

  if (filterBy === 'All') {
    if (sortType === 'Ascending_Name') {
      const sortedRecipes = getRecipes.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: SORT_BY_ASCENDING_NAME,
        payload: {
          sortedRecipes,
          name: sortType,
        },
      });
    }
  } else {
    if (sortType === 'Ascending_Name') {
      const sortedRecipes = filterRecipes.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: SORT_BY_ASCENDING_NAME,
        payload: {
          sortedRecipes,
          name: sortType,
        },
      });
    }
  }
};

export default sortAscendingName;
