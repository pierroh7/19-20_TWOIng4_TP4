var express = require('express');
var router = express.Router();

const _ = require('lodash'); //Permet les select
const axios = require('axios')

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = '5f54c43f';

//Movie template
/*
 {
  id: String,
  movie: String,
  yearOfRelease: Number,
  duration: Number // en minutes,
  actors: [String, String],
  poster: String // lien vers une image d'affiche,
  boxOffice: Number // en USD$,
  rottenTomatoesScore: Number
 }
*/

//Data array
let movies = [{
    id: "default_movie",
    movie: "Fil Défaut",
    yearOfRelease: "2000",
    duration: "200",// en minutes
    actors: ["John", "Johnny"],
    poster: "img_default", // lien vers une image d'affiche
    BoxOffice: "300 000", // en USD$
    rottenTomatoesScore: "0"
}];

/*GET*/
router.get('/', (req, res) => {
    //List 
    res.status(200).json({ movies });
});

/*GET One*/ 
router.get('/:id', (req, res) => {
    //id in params
    const { id } = req.params;  //paramètre requis, params c'est dans Postman
    //Find movie
    const chosenMovie = _.find(movies, ["id", id]);
    //Return movie
    if(!chosenMovie){
        res.status(404).json({
            message: 'Movie not found !',
            chosenMovie
        });
    }else{
        res.status(200).json({
            message: 'Movie found !',
            chosenMovie
        });
    }

});

/*PUT (Add)*/
router.put('/:movie_name', (req, res) => {

    //Get name to add
    const { movie_name } = req.params;
    //Create new unique id
    const id = _.uniqueId();

    //https://upmostly.com/tutorials/using-axios-with-react-api-requests
    //http://www.omdbapi.com/?t=inception&apikey=VOTRECLEAPI
    axios.get('${API_URL}?t={movie_name}&apikey=${API_KEY}').then((response) => {
        //For better lisibilité
        const data = response.data;

        //Insert in Array
        movies.push({ 
            id: id,
            movie: data.Title,
            yearOfRelease : data.Year, 
            duration : data.Runtime, 
            actors : [data.Actors],
            poster : data.Poster,
            BoxOffice : data.BoxOffice,
            rottenTomatoesScore: data.Ratings[1].Value
        });

    }).catch(error => {
        console.log(error);
    
    }).finally(() =>{
        //Return message
        res.status(200).json({
            message: '${movie_name} has been added'
        });
    });

    
});

/*POST (Update)*/
router.post('/:id', (req, res)=> {
    //Get the id of the movie we want to update
    const{id} = req.body;
    //Get new data to update
    const {new_movie_name} = req.body;
    //Find in DB
    const movieToUpdate = _.find(movies, ["id", id]);

    //Update movie
    axios.get('${API_URL}?t={movie_name}&apikey=${API_KEY}')..then((response) => {
        //For better lisibilité
        const data = response.data;

        movieToUpdate.movie = new_movie_name;
        movieToUpdate.yearOfRelease = data.Year;
        movieToUpdate.duration= data.Runtime;
        movieToUpdate.actors = [data.Actors];
        movieToUpdate.poster = data.Poster;
        movieToUpdate.BoxOffice = data.BoxOffice;
        movieToUpdate.rottenTomatoesScore= data.Ratings[1].Value
    
    }).catch(error => {
        console.log(error);

    }).finally(() => {
        //Return message
        res.status(200).json({
            message: 'Updated ${id} with ${new_movie_name}',
            movieToUpdate
        });
    });

});

/*DELETE*/
router.delete('/:id', (req, res) => {
    //Get :id of the movie to delete
    const{id} = req.params;

    //Remove from DB
    _.remove(movies, ["id", id]);

    //Return message
    res.status(200).json({
        message: '${id} removed',
        movies
    });
});