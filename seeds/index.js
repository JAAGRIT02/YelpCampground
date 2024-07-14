//making us of cities.js and seedHelper.js .we will run it whenever we need to seed our database (not often).
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');  //double dots because models folder is 2 folder up,imported for schema

mongoose.connect('mongodb://localhost:27017/yelp-camp', {  //mongooes connection
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;      

db.on("error", console.error.bind(console, "connection error:"));  //mongooes connection
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]; //to get random places and descriptor


const seedDB = async () => {
    await Campground.deleteMany({});           //delete everything in database ,then starting from scratch
    for (let i = 0; i < 50; i++) {             //gives us 50 new campgrounds eith location and title
        const random1000 = Math.floor(Math.random() * 1000); //generating random 50 locations out of 1000 cities(by creating random numbers form 1to 1000)
        
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,    //location is city,state
            title: `${sample(descriptors)} ${sample(places)}`                       //title is combination of descriptor and places
        })
        
        await camp.save();
    }
}

seedDB().then(() => {               //function call
    mongoose.connection.close();
})