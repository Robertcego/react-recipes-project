import React from 'react';
import { NavLink } from 'react-router-dom';

import './Pagination.component.css';

function Pagination({ recipesPerPage, totalRecipes, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='list-container'>
        {pageNumbers.map((pageNumber) => (
          <li className='list' key={pageNumber}>
            <NavLink
              // activeClassName='active'
              onClick={() => paginate(pageNumber)}
              to={pageNumber}
            >
              {pageNumber}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
