import React from 'react';
import './DotsLoader.component.css';
function DotsLoader() {
  return (
    <div>
      <div className='spinner'>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
      </div>
    </div>
  )
}

export default DotsLoader;
