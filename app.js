const express = require('express');
const { default: mongoose } = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const app = express();
const path = require('path');
const Campground = require('./models/campground');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
}

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req,res)=>{
    res.render('home');
});

app.get('/campgrounds', async (req,res) =>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});

app.get('/campgrounds/new', (req,res) =>{
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req,res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/:id', async (req,res) =>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
});

app.get('/campgrounds/:id/edit', async (req,res) =>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
});

app.put('/campgrounds/:id', async (req,res) =>{
    const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req,res) =>{
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
});

app.listen(4444, () =>{
    console.log("Running on port 4000...")
});