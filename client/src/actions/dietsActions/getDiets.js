import { GET_DIETS } from '../index';
const axios = require('axios');
const getDiets = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/types');
      const diets = await response.data;
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
