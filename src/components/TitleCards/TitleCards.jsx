import React, { useEffect,useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title,category}) => {
  const [apiData,setapiData]= useState([]);
  const cardsRef= useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmM5MzkyNTE0NjEwOTQ4ZTY1YzRjNmE1NWVmN2M5OCIsIm5iZiI6MTcyMzgzMzI4NS45NzM0OTUsInN1YiI6IjY2YmY5YTk3M2NmNzAxMzE2NTlhZTM1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.acWoILZldkRs-48jl3ZZK3UbA9n03a9KvnQudU2HluE'
    }
  };
  
  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft +=event.deltaY;
  }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category? category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setapiData(response.results))
    .catch(err => console.error(err));
  
    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title? title :"Popular on Getflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to ={`/player/${card.id}`}className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
