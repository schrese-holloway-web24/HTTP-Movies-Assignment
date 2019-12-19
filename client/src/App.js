import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';
import axios from "axios";
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  //This should pass down to the updateMovie form now
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        // console.log(res)
        setMovies(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  if(movies.length === 0) {
    return null
  } else {
  return (
    <>
      <SavedList list={savedList} />
      {/* <AddMovie addANewMovie = {setMovies} /> */}
      {/* <Route path = '/add-movie' addANewMovie = {setMovies} component = {AddMovie} /> */}
      <Route path = '/add-movie' 
        render = {props => {
          return <AddMovie {...props} movies = {movies} />
        }}
        />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} movies = {movies} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path = "/update-movie/:id" render = {props => {
        return <UpdateMovie {...props} movies = {movies} />
      }} />
    </>
  );
    }
};

export default App;
