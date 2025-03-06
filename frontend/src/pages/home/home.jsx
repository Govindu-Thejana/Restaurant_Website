import { useState } from 'react'
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/exploreMenu/exploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/appDownload/AppDownload';

const Home = () => {
  const[category,setCategory]=useState('All');
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
