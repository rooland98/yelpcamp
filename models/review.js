const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    
},
{
    strict: false
});

module.exports = mongoose.model("Review", reviewSchema);