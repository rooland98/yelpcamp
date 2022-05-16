const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.get("/", (req,res)=>{
    console.log("Request recieved!");
});


app.get('*', (req,res) =>{
    res.send("Error page not found")
});


app.listen(4444, () =>{
    console.log("Running on port 4000...")
});