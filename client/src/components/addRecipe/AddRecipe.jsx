import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postRecipe, getDiets } from '../../actions/index';

import './AddRecipe.component.css';

const recipePlaceholder = 'https://source.unsplash.com/650x700?food';

function AddRecipe() {
  const dispatch = useDispatch();

  const diets = useSelector((state) => state.getDiets);
  console.log(diets);

  // const [next, setNext] = useState(0);
  const [recipe, setRecipe] = useState({
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

  const handleChange = (e) => {
    if (e.target.name === 'diets') {
      let diet = recipe[e.target.name];
      setRecipe({
        ...recipe,
        [e.target.name]: diet.concat(e.target.value),
      });
    }
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };
  const handleChecked = (e) => {
    if (e.target.checked) {
      setRecipe({
        ...recipe,
        diets: [...recipe.diets, e.target.value],
      });
    } else {
      setRecipe({
        ...recipe,
        diets: recipe.diets.filter((d) => d !== e.target.value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(recipe));
  };

  console.log(recipe);
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
              type='text'
              name='name'
              placeholder='Name'
              onChange={handleChange}
            />
            <h4>Summary</h4>
            <textarea
              name='summary'
              placeholder='Recipe Summary'
              onChange={handleChange}
            />
          </div>
          {/* )} */}
          {/* {next === 1 && ( */}
          <div>
            <h4>Score</h4>
            <input
              type='number'
              name='score'
              min='0'
              max='100'
              placeholder='Score'
              onChange={handleChange}
            />
            <h4>Health Score</h4>
            <input
              type='number'
              name='healthScore'
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
