const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ClassApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch(err => {
        console.log("Error!!", err);
    })


const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});

app.get('/home', (req, res) => {
    res.render('home.ejs', { title: 'Home', classes: { 'C1': [1, 2, 3], 'C2': [1, 2, 3], 'C3': [1, 2, 3] } })
});

