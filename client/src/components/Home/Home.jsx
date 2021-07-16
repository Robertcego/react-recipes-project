import React from 'react';

import { NavLink } from 'react-router-dom';

import './Home.component.css';

const recipePlaceholder1 = 'https://source.unsplash.com/650x501?food';
const recipePlaceholder2 = 'https://source.unsplash.com/650x502?food';

function Home() {
  return (
    <div>
      <div className='hero-container'>
        <div className='hero-image'>
          <img
            style={{ width: '70%', height: '70%' }}
            src={recipePlaceholder1}
            alt='recipe'
          />
        </div>
        <div className='hero-text'>
          <h2 className='hero-title'>Get Some Food</h2>
          <p>
            Spicy jalapeno bacon ipsum dolor amet jerky porchetta capicola
            andouille drumstick. Pig chuck picanha, cow drumstick prosciutto
            jowl kevin landjaeger short ribs. Ball tip sausage drumstick fatback
            chuck doner tri-tip turkey kevin ground round swine beef meatloaf
            tongue jerky. Alcatra biltong drumstick, kielbasa beef ham ham hock
            pork belly shank bresaola cupim. Landjaeger ribeye frankfurter
            boudin tail beef ribs. Boudin bresaola cow, ribeye turkey short loin
            tail pancetta cupim drumstick capicola chislic.
          </p>
          <div className='hero-button'>
            <NavLink className='h-btn' to='/recipes'>
              See more...
            </NavLink>
          </div>
        </div>
      </div>{' '}
      <div className='hero-container'>
        <div className='hero-text'>
          <h2 className='hero-title'>Get Some Food</h2>
          <p>
            Chislic ground round capicola tri-tip. Beef biltong jowl, bresaola
            rump hamburger kevin beef ribs ham sausage. Pork chislic sausage,
            bresaola brisket landjaeger tail. Pastrami doner landjaeger, brisket
            t-bone tongue pork loin fatback hamburger pork belly jowl venison
            burgdoggen ham hock. Leberkas pork loin kielbasa, shank boudin
            buffalo sirloin. Doner capicola fatback prosciutto venison
            tenderloin ribeye.
          </p>
          <div className='hero-button'>
            <NavLink className='h-btn' to='/recipes'>
              See more...
            </NavLink>
          </div>
        </div>
        <div className='hero-image'>
          <img
            style={{ width: '70%', height: '70%' }}
            src={recipePlaceholder2}
            alt='recipe'
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
