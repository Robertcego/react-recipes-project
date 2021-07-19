import React from 'react';
import './NavBar.component.css';
import { NavLink } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';

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
        <NavLink className='navbar-item' to='/create'>
          Create Recipe
        </NavLink>
        <NavLink className='navbar-item' to='/search'>
          <FaSearch />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
