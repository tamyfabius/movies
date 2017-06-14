const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const faker = require('faker');
const config = require('./config');
console.log(config);

const mongoose = require('mongoose');
/* schema mongoose */
const  movieSchema = mongoose.Schema({
    movieTitle: String,
    movieYear: Number
});

/* création d'un modèle et enregister en Base*/
 const Movie = mongoose.model('Movie', movieSchema);
// const title = faker.lorem.sentence(3);
// const year = Math.floor(Math.random() * 80) + 1950;
// const myMovie = new Movie({movieTitle: title, movieYear: year });
// myMovie.save((err, savedMovie) => {
//     if(err){
//         console.error(err);
//     } else {
//         console.log('savedMovie', savedMovie);
//     }
// });


// -----------------------------------------------
// connexion à la base mlab via mongoose
// -----------------------------------------------
mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds123662.mlab.com:23662/expressmovie`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: cannot connect to my DB'));
db.once('open', () => {
    console.log('connected to the DB :)');
});
// -----------------------------------------------

const PORT = 3000;
let frenchMovies = [];
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

/* -----------------  MIDDLEWARE -----------------*/
app.use('/public', express.static('public'));
app.use(expressJwt({secret: secret}).unless({path: ['', '/movies', '/movie-search', '/login']}));

/* ----------------- ROUTES ----------------- */
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/movies', (req, res) => {
    const title = 'Films français des trentes dernières années';
    // frenchMovies = [
    //     { title: 'Le fabuleux destin d\'Amélie Poulain', year: 2001},
    //     { title: 'Buffet froid', year: 1979},
    //     { title: 'Le diner de cons', year: 1998},
    //     { title: 'De rouille et d\'os', year: 2012},
    // ];
    //
    frenchMovies = [];

    Movie.find((err, movies) => {
        if(err){
            console.error('could not retrieve movies from DB');
            res.sendStatus(500);
        } else {
            frenchMovies = movies;
            res.render('movies', { movies: frenchMovies, title: title});
        }
    });

});

let urlEncoded = bodyParser.urlencoded({ extended: false});
// app.post('/movies', urlEncoded, (req, res) => {
//   console.log(req.body);
//   console.log('le titre: ', req.body.movieTitle);
//   console.log('année: ', req.body.movieYear);
//   const newMovie = {title: req.body.movieTitle, year: req.body.movieYear};
//   //frenchMovies.push(newMovie);
//   frenchMovies = [...frenchMovies, newMovie];
//   console.log(frenchMovies);
//
//   res.sendStatus(201);
// });

app.post('/movies', upload.fields([]), (req, res) => {
    if(!req.body){
        return res.sendStatus(500);
    } else {
        const formData = req.body;
        console.log('formData', formData);

        const title = req.body.movieTitle;
        const year = req.body.movieYear;
        const myMovie = new Movie({movieTitle: title, movieYear: year});

        myMovie.save((err, savedmovie) => {
            if(err){
                console.error(err);
            } else {
                console.log(savedmovie);
                res.sendStatus(201);
            }
        })
        // const newMovie = {title: req.body.movieTitle, year: req.body.movieYear};
        // frenchMovies = [...frenchMovies, newMovie];
        // res.sendStatus(201);
    }
});

app.get('/movies/add', (req, res) => {res.send('formulaire')});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    res.render('movies-details', {movieId: id});
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movie-search', (req, res) => {
    res.render('movie-search');
});

app.get('/login', (req, res) => {
    res.render('login');
});

const fakeUser = { email: 'testuser@gmail.com', password: '123456test'};

app.post('/login', urlEncoded, (req, res) => {
    console.log('login user', req.body)
    if(!req.body) {
        res.sendStatus(500);
    } else {
        if (fakeUser.email === req.body.email && fakeUser.password === req.body.password){
            const myToken = jwt.sign({iss: 'http://expressmovies.fr', user: 'Tamy', role: 'moderator'}, secret);
            res.json(myToken);

        } else {
            res.sendStatus(401);
        }
    }
});

app.get('/member-only', (req, res) => {
    console.log('req.user', req.user);
    res.send(req.user);
})
app.listen(PORT, () => { console.log(`on est sur le port : ${PORT}`) });


