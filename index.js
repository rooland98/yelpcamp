const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("Database connected");
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req,res)=>{
    res.render('home');
});

app.get('*', (req,res) =>{
    res.send("Error page not found")
});


app.listen(4444, () =>{
    console.log("Running on port 4000...")
});