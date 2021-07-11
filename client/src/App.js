import './App.css';
import React, { useState, useEffect } from 'react';
const axios = require('axios');
function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/recipes')
      .then((response) => setRecipes(response.data));
    setTimeout(() => setLoading(false), 1500);
    // setLoading(false);
  }, []);

  return (
    <div className='App'>
      <h1>Henry Food</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.healthScore}</h2>
            <h2>{recipe.diets}</h2>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
