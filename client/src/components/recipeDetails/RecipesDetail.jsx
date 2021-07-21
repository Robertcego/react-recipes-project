import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getRecipeDetails } from '../../actions/index';
// import DotsLoader from '../../utils/dotsLoader/DotsLoader';

import './RecipesDetail.component.css';

const recipePlaceholder = 'https://source.unsplash.com/650x500?food';

function RecipesDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetails);

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (recipeDetail.length !== 0) return setIsLoading(false);
    return dispatch(getRecipeDetails(id));
  }, []);

  // DOM element rendered with dangeorouslySetInnerHTML
  const summary = () => {
    return { __html: recipeDetail.summary };
  };
  const instructions = () => {
    return { __html: recipeDetail.instructions };
  };

  // if (isLoading) {
  //   return (
  //     <div className='loader-container'>
  //       <h1 className='loader-text'>Please wait...</h1>
  //       <DotsLoader />;
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className='details-container' key={recipeDetail.id}>
        <div className='details-card'>
          <div className='details-left-container'>
            <div className='details-name-container'>
              <h1>{recipeDetail.name}</h1>
              <br />
              Health Score: {recipeDetail.healthScore} Score:{' '}
              {recipeDetail.score}
              <br />
              <br />
              <p>
                <span className='diets-style'>{recipeDetail.diets}</span>
              </p>
              <br />
              <div
                className='dangerously-summary'
                dangerouslySetInnerHTML={summary()}
              />
              <br />
              <h3>Instructions:</h3>
              <br />
              <div
                className='dangerously-instructions'
                dangerouslySetInnerHTML={instructions()}
              />
            </div>
          </div>

          <div className='details-right-container'>
            <div className='details-img-container'>
              <img
                style={{ maxHeight: '30rem', maxWidth: '100%' }}
                src={
                  recipeDetail.image
                    ? recipeDetail.image
                    : `${recipePlaceholder}`
                }
                alt={recipeDetail.name}
              />
            </div>
          </div>
        </div>

        {/* // ! MAIN CONTAINER */}
      </div>
    </div>
  );
}

export default RecipesDetail;
