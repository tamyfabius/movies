const express = require('express');
const app = express();
const PORT = 3000;


/* MIDDLEWARE */
app.use('/public', express.static('public'));


/* ROUTES */
app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/movies', (req, res) => {
    //res.send('Bientôt des films ici même');
    res.render('movies');
});

// app.get('/movies-details', (req, res) => {
//     res.render('movies-details');
// });

app.get('/movies/add', (req, res) => {res.send('formulaire')});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    // const title = 'Termnator';
    // const title = req.params.title;

    res.render('movies-details', {movieId: id});
});

app.get('/', (req, res) => {
    //res.send('Hello world');
    res.render('index');
});

app.listen(PORT, () => { console.log(`on est sur le port : ${PORT}`) });


