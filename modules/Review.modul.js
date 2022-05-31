const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  text: String,
  name: {
    ref: "CLient",
    type: mongoose.SchemaTypes.ObjectId,
  },
  book: {
    ref: "Book",
    type: mongoose.SchemaTypes.ObjectId,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
