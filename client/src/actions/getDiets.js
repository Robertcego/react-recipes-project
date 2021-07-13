import { GET_DIETS } from '.';

const getDiets = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/types');
      const diets = await response.json();
      dispatch({
        type: GET_DIETS,
        payload: diets,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default getDiets;
