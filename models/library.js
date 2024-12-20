const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  Bookname: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true
  },
  Mobile_no: {
    type: Number,
    required: true
  },
   DateIssued: {
    type: Date,
    required: true
  },
  LastDateToSubmit: {
    type: String,
    required: true
  },
})

const Library = mongoose.model("Library" , librarySchema);
module.exports = Library;