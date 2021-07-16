import React from 'react';
import './NavBar.component.css';

import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav-container'>
      <p>Robertcego</p>
      <div className='navbar'>
        <NavLink className='navbar-item' to='/'>
          Home
        </NavLink>
        <NavLink className='navbar-item' to='/recipes'>
          Recipes
        </NavLink>
        <NavLink className='navbar-item' to='/search'>
          Search
        </NavLink>
        <NavLink className='navbar-item' to='/create'>
          Create Recipe
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
