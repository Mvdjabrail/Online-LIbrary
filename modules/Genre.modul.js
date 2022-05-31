const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    name: String,
    discription: String
})

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;