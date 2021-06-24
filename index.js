const express = require('express');
const mongoose = require('mongoose');
const Class = require('./models/class')

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

app.get('/classes', async (req, res) => {
    const classes = await Class.find({})
    res.render('home.ejs', { title: 'Home', classes })
});

app.get('/classes/new', (req, res) => {
    res.render('new.ejs', { title: 'New Class' })
});

app.post('/classes', async (req, res) => {
    res.send(req.body);
    // const newClass = new Class(req.body);
    // await newClass.save();
    // res.redirect(`/products/${newClass._id}`)
});


app.get('/:cid', (req, res) => {
    res.render('class.ejs', { title: 'Class', classes: { 'C1': [1, 2, 3], 'C2': [1, 2, 3], 'C3': [1, 2, 3] } })
})