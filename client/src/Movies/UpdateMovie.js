import React, { useEffect, useState } from 'react';

const initialMovie = {
    id: '', 
    title: '', 
    director: '', 
    metascore: '', 
    stars: []
}

const UpdateMovie = props => {
    console.log(props)
    const [movie, setMovie] = useState(initialMovie)
    
    useEffect(() => {
        const movieToEdit = props.movies.find(m => `${m.id}` === props.match.params.id )
        if (movieToEdit) {
            setMovie(movieToEdit)
        }
        
    }, [props.movies, props.match.params.id] )

    return (
        <div>
            <h1>Can We Do It?</h1>
            <h2>YES WE CAN!!!!!</h2>
            <form>
                <input type = 'text' name = 'title' placeholder = {movie.title} />
            </form>
        </div>
    )
}

export default UpdateMovie;