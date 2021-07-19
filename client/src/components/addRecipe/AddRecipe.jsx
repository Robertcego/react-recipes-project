import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postRecipe, getDiets } from '../../actions/index';

import './AddRecipe.component.css';

// import { validation } from '../../utils/formErrorHandler/errorHandler';

const recipePlaceholder = 'https://source.unsplash.com/650x700?food';

function AddRecipe() {
  const dispatch = useDispatch();

  const diets = useSelector((state) => state.getDiets);
  console.log(diets);

  // const [next, setNext] = useState(0);
  const [input, setInput] = useState({
    name: '',
    summary: '',
    score: 0,
    healthScore: 0,
    instructions: '',
    diets: [],
  });

  // ! Get all the diets for the checkboxes from the Redux state
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // ! Set the methods for the form steps
  // const handleSteps = () => {
  //   if (next <= 3) setNext(next + 1);
  // };

  // const renderNextButton = () => {
  //   if (next > 2) {
  //     return undefined;
  //   }
  //   if (next === 3) {
  //     return (
  //       <button type='submit' onClick={handleSteps}>
  //         Submit Recipe
  //       </button>
  //     );
  //   } else {
  //     return <button onClick={handleSteps}>Next Step</button>;
  //   }
  // };

  // const handlePreviousButton = () => {
  //   if (next > 0) setNext(next - 1);
  // };

  // const renderPreviousButton = () => {
  //   if (next > 2) {
  //     return undefined;
  //   } else if (next > 0) {
  //     return <button onClick={handlePreviousButton}>Previous Step</button>;
  //   }
  // };

  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const recipeInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    if (e.target.name === 'diets') {
      let diet = input[e.target.name];
      setInput({
        ...input,
        [e.target.name]: diet.concat(e.target.value),
      });
    } else {
      setInput(recipeInput);
      // setErrors(validation(recipeInput));
    }
  };
  const handleChecked = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((d) => d !== e.target.value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert('Your recipe has been created!');
    setInput({
      name: '',
      summary: '',
      score: 0,
      healthScore: 0,
      instructions: '',
      diets: [],
    });
    e.target.reset();
  };

  console.log(input);
  return (
    <div className='main-form-container'>
      <div className='form-card'>
        <div className='img-form-container'>
          <img src={recipePlaceholder} alt='' />
        </div>
        <form onSubmit={handleSubmit}>
          {/* {next === 0 && ( */}
          <div>
            <h1 className='form-title'>Create your own recipe!</h1>
            <h4>Name</h4>
            <input
              onChange={handleChange}
              type='text'
              name='name'
              // className={errors.name ? 'danger' : ''}
              placeholder='Name'
              // value={input.name}
            />
            {input.name === '' && (
              <p className='danger'>Recipe name required.</p>
            )}
            <h4>Summary</h4>
            <textarea
              onChange={handleChange}
              name='summary'
              // className={errors.summary && 'danger'}
              placeholder='Recipe Summary'
              // value={input.summary}
            />
            {input.summary === '' && (
              <p className='danger'>Recipe summary is required.</p>
            )}
          </div>
          {/* )} */}
          {/* {next === 1 && ( */}
          <div>
            <h4>Score</h4>
            <input
              type='number'
              name='score'
              // value={input.score}
              min='0'
              max='100'
              placeholder='Score'
              onChange={handleChange}
            />
            <h4>Health Score</h4>
            <input
              type='number'
              name='healthScore'
              // value={input.healthScore}
              min='0'
              max='100'
              placeholder='Health Score'
              onChange={handleChange}
            />
          </div>
          {/* )} */}
          {/* {next === 2 && ( */}
          <div>
            <h4>Instructions</h4>
            <textarea
              name='instructions'
              // value={input.instructions}
              cols='30'
              rows='10'
              placeholder='Instructions'
              onChange={handleChange}
            />
            <h4>Diets</h4>

            {diets.map((diet) => (
              <div className='checkbox-container' key={diet.id}>
                <div className='checkbox-items'>
                  <label>{diet.name}</label>
                  <input
                    className='checkbox-item-list'
                    type='checkbox'
                    name='diets'
                    value={diet.id}
                    onChange={handleChecked}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* )} */}
          {/* {next === 3 && <h1>Success!</h1>} */}
          {/* {next <= 3 && <p>{`Step: ${next} / 3`}</p>} */}
          {/* {renderPreviousButton()} */}
          {/* {renderNextButton()} */}
          <button className='form-submit-btn' type='submit'>
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
