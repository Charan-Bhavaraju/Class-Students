const express = require('express');
const mongoose = require('mongoose');
const Class = require('./models/class');
const methodOverride = require('method-override');


mongoose.connect('mongodb://localhost:27017/ClassApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch(err => {
        console.log("Error!!", err);
    })


const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


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
    const students = req.body.students.split(',')
    const name = req.body.name
    const newClass = new Class({ name, students });
    await newClass.save();
    res.redirect(`/classes/${newClass._id}`)
});

app.get('/classes/:id', async (req, res) => {
    const { id } = req.params;
    const foundclass = await Class.findById(id);
    res.render('show.ejs', { foundclass, title: foundclass.name })
})

app.get('/classes/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundclass = await Class.findById(id);
    res.render('edit.ejs', { title: 'Edit', foundclass });
})

app.put('/classes/:id', async (req, res) => {
    const { id } = req.params;
    const students = req.body.students.split(',');
    const name = req.body.name;
    const foundclass = await Class.findByIdAndUpdate(id, { name, students }, { runValidators: true, new: true });
    res.redirect(`/classes/${foundclass._id}`);
})

app.delete('/classes/:id', async (req, res) => {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);
    res.redirect('/classes');
})