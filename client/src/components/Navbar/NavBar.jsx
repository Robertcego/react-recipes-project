import React from 'react';
import './NavBar.component.css';

import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav-container'>
      <div className='navbar'>
        <NavLink className='navbar-item' to='/'>
          Home
        </NavLink>
        <NavLink className='navbar-item' to='/recipes'>
          Recipes
        </NavLink>
        <NavLink className='navbar-item' to=''>
          Search
        </NavLink>
        <NavLink className='navbar-item' to=''>
          Create Recipe
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
