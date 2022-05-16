const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const Campground = require('./models/campground');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req,res)=>{
    res.render('home');
});

app.get('/make-campground', async (req,res) =>{
    const camp = new Campground({title: 'Lort peak'});
    await camp.save();
    res.send(camp);
});

app.listen(4444, () =>{
    console.log("Running on port 4000...")
});