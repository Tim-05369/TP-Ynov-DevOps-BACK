const dotenv = require('dotenv');
const {executeFilesCrudOperations} = require('./services/mongoService');

dotenv.config();

let files = null

executeFilesCrudOperations().then(
    fileCollection => files = fileCollection
)

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Bienvenue sur le back !')
})

/*
Renvoie tous les fichiers en base
*/
app.get('/files/', async (req, res) =>  {
    res.send(await files.find().toArray())
})

/*
Renvoie le contenu du fichier mis dans le paramètre nom.
Le fichier doit être présent dans le dossier Files
*/
app.get('/getFileContentOf', (req, res) => {
    res.download("./files/"+req.query.nom)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})