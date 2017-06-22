const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yearSchema = new Schema({
  year: Number,
  eventNumber: Number,
  photoNumber: Number,
  albums: Array,
});

const albumSchema = new Schema({
  year: Number,
  title: String,
  date: String,
  photoNumber: Number,
  photos: [String],
});

const seminarSchema = new Schema({
  title: String,
  speaker: String,
  date: Date,
  sources: [String],
});

exports.Years = mongoose.model('Years', yearSchema);
exports.Albums = mongoose.model('Albums', albumSchema);
exports.Seminars = mongoose.model('Seminars', seminarSchema);
