// importer le module express
const express = require('express');

// créer l'application
const app = express();

/*

 */
app.get('/', function(req, res) {
    res.send('Hello world');
});

app.listen(3000, ()=> console.log('on est sur le port 3000'));