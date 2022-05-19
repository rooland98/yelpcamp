const { default: mongoose } = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Quis aute et deserunt do ad laborum. Dolor consectetur cupidatat labore laborum esse aute consequat dolor minim et Lorem magna quis dolore. Aute laborum Lorem fugiat enim consectetur irure duis in proident excepteur in sunt mollit. Aliquip sunt consequat amet excepteur. Veniam eu laborum tempor nulla qui cupidatat enim nulla. Ipsum nulla ex amet cupidatat incididunt dolor.',
            price: randomPrice
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})