import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '', 
    title: '', 
    director: '', 
    metascore: '', 
    stars: []
}

const UpdateMovie = props => {
    console.log('props coming in to updateMovie', props)
    const [movie, setMovie] = useState(initialMovie)
    
    useEffect(() => {
        const movieToEdit = props.movies.find(m => `${m.id}` === props.match.params.id )
        if (movieToEdit) {
            setMovie(movieToEdit)
        }
        
    }, [props.movies, props.match.params.id] )

    if (!props.movies.length || !movie) {
        return <h2>Loading Movie Data</h2>
    }

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name === 'stars') {
            let starsArr = value.split(',')
            setMovie({...movie, [e.target.name]: starsArr})
        } else {
            setMovie({...movie, [e.target.name]: value})
        }

        
    }
    

    const submitHandler = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log('res from submithandler', res)
                setMovie(res.data)
                props.history.push(`/`)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const newStars = () => {
        props.movie.stars.split(movie.stars.length)
      
    }
    console.log(newStars)
    return (
        <div>
            <h1>Can We Do It?</h1>
            <h2>YES WE CAN!!!!!</h2>
            <form onSubmit = {submitHandler}>
                <input type = 'text' name = 'title' value = {movie.title} onChange = {handleChanges}/>
                <input type = "text" name = 'director' value = {movie.director} onChange = {handleChanges} />
                <input type = 'text' name = 'metascore' value = {movie.metascore} onChange = {handleChanges} />
                <input type = 'text' name = 'stars' value = {movie.stars} onChange = {handleChanges} />
                <button>Update Movie</button>
                {/* {movie.stars.map(m => (
                    <input type = 'text' name = 'star' value = {m.id} onChange = {handleChanges} />
                ))} */}
                
            </form>
        </div>
    )
}

export default UpdateMovie;