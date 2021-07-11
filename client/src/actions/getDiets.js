import { GET_DIETS } from '.';

const getDiets = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/types');
    const diets = await response.json();
    dispatch({
      type: GET_DIETS,
      payload: diets,
    });
  };
};

export default getDiets;
