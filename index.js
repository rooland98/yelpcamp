const express = require('express');
const app = express();
const path = require('path');

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