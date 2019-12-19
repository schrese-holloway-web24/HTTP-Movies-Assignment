import React, {useState} from 'react';
import axios from 'axios';

const AddMovie = (props) => {
    console.log(props);
    // const [newMovie, setNewMovie] = useState({id: '', title: ''})

    const [newMovie, setNewMovie] = useState({id: '', title: '', director: '', metascore: '', stars: ''})

    const changeHandler = e => {
        e.preventDefault();
        let value = e.target.value;
            
        if(e.target.name === 'stars') {
            let starsArr = value.split(',')
            setNewMovie({...newMovie, [e.target.name]: starsArr})
        } else {
            setNewMovie({...newMovie, [e.target.name]: value})
        }
        
        
        // setNewMovie({
            //     ...newMovie, 
            //     [e.target.name]: e.target.value
            // })
        
    }

    if (!props.movies.length === 0) {
        return <h2>Loading Movie Data</h2>
    }

    const submitHandler = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then(res => {
                console.log(res.data)
                setNewMovie({...newMovie, title: ''})
                // props.setMovie(res.data);
                props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Add A New Movie!!!</h1>
            <form onSubmit = {submitHandler}>
                <input type = 'text' placeholder = 'Title' onChange = {changeHandler} value = {newMovie.title} name = 'title' />

                <input type = 'text' placeholder = 'Director' onChange = {changeHandler} value = {newMovie.director} name = 'director' />

                <input type = 'text' placeholder = 'Metascore' onChange = {changeHandler} value = {newMovie.metascore} name = 'metascore' />
                <p>Separate each star by a comma (and no spaces)</p>
                <input type = 'text' placeholder = 'Star' onChange = {changeHandler} value = {newMovie.stars} name = 'stars' />

                {/* <input type = 'text' placeholder = 'Star' onChange = {changeHandler} value = {newMovie.stars} name = 'stars' />

                <input type = 'text' placeholder = 'Star' onChange = {changeHandler} value = {newMovie.stars} name = 'stars' /> */}
                
                <button className = 'new-movie-button'>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;