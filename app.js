// importer le module express
const express = require('express');
// créer l'application
const app = express();

const PORT = 3000;


/* ROUTES */
app.get('/movies', (req, res) => {res.send('Bientôt des films ici même')});
app.get('/movies/add', (req, res) => {res.send('formulaire')});
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Movies numéro ${id}`);
});



app.get('/', (req, res) => { res.send('Hello world') });

app.listen(PORT, () => { console.log(`on est sur le port : ${PORT}`) });


