import { RESET } from '../index';

const reset = () => {
  return (dispatch) => {
    dispatch({ type: RESET });
  };
};

export default reset;
