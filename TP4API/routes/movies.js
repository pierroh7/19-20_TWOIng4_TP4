var express = require('express');
var router = express.Router();

//Data array
let movies = [{
    name: "Film 1",
    id: "0",
}];

/*GET*/
router.get('/', (req, res) => {
    //List 
    res.status(200).json({ movies });
});

/*GET One*/ 
router.get('/:id', (req, res) => {
    //id in params
    const { id } = req.params;
    //Find movies
    const chosenMovie = _.find(movies, ["id", id]);
    //Return movies
    res.status(200).json({
        message: 'Movies found !',
        chosenMovie
    });
});

/*PUT*/
router.put('/', (req, res) => {
    //Get data
    const {movie} = req.body;
    //Create new unique id
    const id = _.uniqueId();
    //Insert in Array
    movies.push({movie, id});
    //Return message
    res.json({
        message: '${id} has been added',
        movie: {movie, id}
    });
});