const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const Campground = require('./models/campground');
const ejs = require('ejs');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req,res)=>{
    res.render('home');
});

app.get('/campgrounds', async (req,res) =>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});

app.get('/campgrounds/:id', async (req,res) =>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
});

app.listen(4444, () =>{
    console.log("Running on port 4000...")
});