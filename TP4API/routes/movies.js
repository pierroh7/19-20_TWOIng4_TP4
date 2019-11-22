var express = require('express');
var router = express.Router();

const _ = require('lodash');

//Data array
let movies = [];

/*GET*/
router.get('/', (req, res) => {
    //List 
    res.status(200).json({ movies });
});

/*GET One*/ 
router.get('/:id', (req, res) => {
    //id in params
    const { id } = req.params;  //paramètre requis
    //Find movies
    const chosenMovie = _.find(movies, ["id", id]);
    //Return movies
    res.status(200).json({
        message: 'Movies found !',
        chosenMovie
    });
});

/*POST (Add)*/
router.post('/', (req, res) => {
    //Get data
    const {movie} = req.body;
    //Create new unique id
    const id = _.uniqueId();
    //Insert in Array
    movies.push({movie:movie, id:id});
    //Return message
    res.status(200).json({
        message: '${id} has been added',
        addedMovie: movie
    });
});

/*PUT (Update)*/
router.put('/:id', (req, res)=> {
    //Get the id of the movie we want to update
    const{id} = req.params;
    //Get new data to update
    const {movie} = req.body;
    //Find in DB
    const movieToUpdate = _.find(movies, ["id", id]);
    //Update data
    movieToUpdate.movie = movie;

    //Return message
    res.status(200).json({
        message: 'Updated ${id} with ${user}'
    });
});