import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getRecipeDetails } from '../../actions/index';
import DotsLoader from '../../utils/dotsLoader/DotsLoader';

import './RecipesDetails.component.css';

function RecipesDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetails);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recipeDetail.length !== 0) return setIsLoading(false);
    dispatch(getRecipeDetails(id));
  }, [dispatch, id, recipeDetail.length]);

  // const recipe = [];
  // recipe.push(recipeDetail);
  // console.log(recipeDetail);

  // DOM element rendered with dangeorouslySetInnerHTML
  const summary = () => {
    return { __html: recipeDetail.summary };
  };
  const instructions = () => {
    return { __html: recipeDetail.instructions };
  };

  // const HandleLoading = ({ isLoading }) => {
  //   if (isLoading === true) {
  //     return <DotsLoader />;
  //   } else {
  //     return (
  //       <div key={recipeDetail.id}>
  //         <h2>{recipeDetail.name}</h2>
  //         Health Score: {recipeDetail.healthScore} Score: {recipeDetail.score}
  //         <p>{recipeDetail.diets}</p>
  //         <div dangerouslySetInnerHTML={summary()} />
  //         <h3>Instructions:</h3>
  //         <div dangerouslySetInnerHTML={instructions()} />
  //         <img src={recipeDetail.image} alt={recipeDetail.name} />
  //       </div>
  //     );
  //   }
  // };

  return (
    <div>
      {/* {recipe.map((recipe) => ( */}
      {isLoading === true ? (
        <div className='loader-container'>
          <h1 className='loader-text'>Please wait...</h1>
          <DotsLoader />;
        </div>
      ) : (
        <>
          <div className='details-container' key={recipeDetail.id}>
            <img
              style={{ maxHeight: '16rem', maxWidth: '100%' }}
              src={recipeDetail.image}
              alt={recipeDetail.name}
            />
            <h2>{recipeDetail.name}</h2>
            Health Score: {recipeDetail.healthScore} Score: {recipeDetail.score}
            <p>{recipeDetail.diets}</p>
            <div dangerouslySetInnerHTML={summary()} />
          </div>

          <div>
            <h3>Instructions:</h3>
            <div dangerouslySetInnerHTML={instructions()} />
          </div>
        </>
      )}
      {/* ))} */}
      {/* <HandleLoading isLoading={isLoading} /> */}
    </div>
  );
}

export default RecipesDetail;
