const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;


/* MIDDLEWARE */
app.use('/public', express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false}));

/* ROUTES */
app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/movies', (req, res) => {

    const title = 'Films français des trentes dernières années';

    const frenchMovies = [
        { title: 'Le fabuleux destin d\'Amélie Poulain', year: 2001},
        { title: 'Buffet froid', year: 1979},
        { title: 'Le diner de cons', year: 1998},
        { title: 'De rouille et d\'os', year: 2012},
    ];
    res.render('movies', { movies: frenchMovies, title: title});
});

let urlEncoded = bodyParser.urlencoded({ extended: false});

app.post('/movies', urlEncoded, (req, res) => {
  console.log(req.body);
  console.log('le titre: ', req.body.movieTitle);
  console.log('année: ', req.body.movieYear);
  res.sendStatus(201);
});

app.get('/movies/add', (req, res) => {res.send('formulaire')});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    res.render('movies-details', {movieId: id});
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => { console.log(`on est sur le port : ${PORT}`) });


