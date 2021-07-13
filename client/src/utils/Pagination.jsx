import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link onClick={() => paginate(pageNumber)} to={pageNumber}>
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
