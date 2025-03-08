import React, { useState, useEffect } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/foodItem';
import axios from 'axios';

const FoodDisplay = ({ category }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/products/');
      console.log(response.data.products);
      setFoods(response.data.products);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="food-display-list">
          {foods.map((item, index) => {
            if (category === 'All' || item.category === category) {
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />;
            }
          })}
        </div>
      )}
    </div> 
  );
};

export default FoodDisplay;
