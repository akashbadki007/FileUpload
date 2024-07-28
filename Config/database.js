// connect express js and mongodb
// import mongoose
const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Database Created Successfully..."))
    .catch((error) => {
        console.log("Fetching error Database");
        console.error(error);
    })
}