// importer le module express
const express = require('express');
// créer l'application
const app = express();

const PORT = 3000;


app.get('/', (req, res) => { res.send('Hello world') });

app.listen(PORT, () => { console.log(`on est sur le port : ${PORT}`) });


