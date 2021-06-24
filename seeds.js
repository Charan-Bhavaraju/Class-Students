const mongoose = require('mongoose');
const Class = require('./models/class');


mongoose.connect('mongodb://localhost:27017/ClassApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch(err => {
        console.log("Error!!", err);
    });

const seedClasses = [
    {
        name: 'CSE1',
        students: ['Akhil', 'Abhinav', 'Rohit']
    },
    {
        name: 'CSE2',
        students: ['Pranav', 'Anant', 'Sashank']
    },
    {
        name: 'CSE3',
        students: ['Nitin', 'Ravi', 'Karthik', 'Charan']
    }
]


Class.insertMany(seedClasses)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
