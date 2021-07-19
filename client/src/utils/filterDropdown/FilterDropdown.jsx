import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sortByDiet,
  reset,
  sortByLowScore,
  sortByHighScore,
  sortByAscendingName,
  sortByDescendingName,
} from '../../actions/index';
import './FilterDropdown.component.css';

function FilterDropdown() {
  const dispatch = useDispatch();
  const { getDiets } = useSelector((state) => state);

  const handleSort = (e) => {
    if (e.target.value === 'High_Score') {
      return dispatch(sortByHighScore(e.target.value));
    }
    if (e.target.value === 'Ascending_Name') {
      return dispatch(sortByAscendingName(e.target.value));
    }
    if (e.target.value === 'Low_Score') {
      return dispatch(sortByLowScore(e.target.value));
    }
    if (e.target.value === 'Descending_Name') {
      return dispatch(sortByDescendingName(e.target.value));
    }
    if (e.target.value === 'All') {
      return dispatch(reset());
    }
  };

  return (
    <div>
      <select
        className='diet-options'
        onChange={(e) => dispatch(sortByDiet(e.target.value))}
      >
        <option default value='All'>
          All
        </option>
        {getDiets.map((diet) => (
          <option key={diet.id} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
      <select className='sort-options' onChange={(e) => handleSort(e)}>
        <option value='High_Score'>Score: Low to High</option>
        <option value='Low_Score'>Score: High to Low</option>
        <option value='Ascending_Name'>Ascending Name (A-Z)</option>
        <option value='Descending_Name'>Descending Name (Z-A)</option>
      </select>
    </div>
  );
}

export default FilterDropdown;
