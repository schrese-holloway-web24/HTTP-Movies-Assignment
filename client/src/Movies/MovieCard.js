import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  console.log(props.history)
  const handleUpdate = e => {
    e.preventDefault();
    props.history.push(`/update-movie/${id}`)
  }

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {/* <button onClick = {handleUpdate}>Update Information</button> */}
    </div>
  );
};

export default MovieCard;
